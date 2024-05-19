import React, { useState, useEffect } from 'react';
import { Layout, Table, Typography, Spin, Alert, Modal } from 'antd';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:5000/api/solarCalculations');
      setResults(response.data);
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
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
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
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px' }}>Solar Calculation Results</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Title level={3}>All Results</Title>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <Table dataSource={results} columns={columns} onRow={(record) => ({
            onClick: () => handleResultClick(record),
          })} />
        )}
        <Modal
          title="Result Details"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {selectedResult && (
            <>
              <Table dataSource={selectedResult.dataSource} columns={dataSourceColumns} />
              <p>Total Watt Hours: {selectedResult.totalWattHours}</p>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default SolarResultsPage;
