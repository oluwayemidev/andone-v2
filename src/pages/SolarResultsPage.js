import React, { useState, useEffect } from 'react';
import { Layout, Table, Typography, Spin, Alert, Modal } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import moment from 'moment';

const { Header, Content } = Layout;
const { Title } = Typography;

const SolarResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      // Map over each document to get the data and id, and format timestamps
      const resultsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          name: data.data.name,
          email: data.data.email,
          createdAt: data.createdAt ? data.createdAt.toDate() : null,
          updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
        };
      });

      // Sort the results by createdAt in descending order
      resultsData.sort((a, b) => b.createdAt - a.createdAt);

      setResults(resultsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm') : 'N/A',
    },
  ];

  const dataSourceColumns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Watts',
      dataIndex: 'watts',
      key: 'watts',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Watt Hour',
      dataIndex: 'wattHour',
      key: 'wattHour',
      render: (_, record) => record.quantity * record.watts * record.hours,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px' }}>Solar Calculation Results</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Title level={3}>All Results</Title>
        {error ? (
          <Alert message={error} type="error" />
        ) : (
          <Table
            dataSource={results}
            columns={columns}
            rowKey="id"
            loading={loading}
            expandable={{
              expandedRowRender: (record) => (
                <div>
                  <p><b>Message: </b> {record.data.message}</p>
                  <Table
                    dataSource={record.data.dataSource}
                    columns={dataSourceColumns}
                    pagination={false}
                    rowKey="item"
                  />
                  <p>Total Watt Hours: {record.data.dataSource.reduce((total, item) => total + (item.quantity * item.watts * item.hours), 0)}</p>
                </div>
              ),
            }}
            onRow={(record) => ({
              onClick: () => handleResultClick(record),
            })}
          />
        )}
        <Modal
          title="Result Details"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {selectedResult && (
            <>
              <Table
                dataSource={selectedResult.data.dataSource}
                columns={dataSourceColumns}
                pagination={false}
                rowKey="item"
              />
              <p>Total Watt Hours: {selectedResult.data.dataSource.reduce((total, item) => total + (item.quantity * item.watts * item.hours), 0)}</p>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default SolarResultsPage;
