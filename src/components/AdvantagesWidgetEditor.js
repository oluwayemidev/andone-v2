import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, List, message, Upload, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { db, storage, collection, addDoc, updateDoc, deleteDoc, getDocs, doc, uploadBytes, getDownloadURL, ref } from '../pages/firebase';
import '../styles/AdvantagesWidget.css';

const AdvantagesWidget = ({ advantages }) => (
  <Card title="Our Values" bordered={false} style={{ width: "100%" }} className="advantages-container">
    <Row gutter={[16, 16]}>
      {advantages.map((advantage, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            hoverable
            cover={<img alt={advantage.title} src={advantage.img} className="advantage-image" />}
            className="advantage-card"
          >
            <Card.Meta title={advantage.title} description={advantage.description} />
          </Card>
        </Col>
      ))}
    </Row>
  </Card>
);

const AdvantagesWidgetEditor = () => {
  const [advantages, setAdvantages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAdvantages = async () => {
      const querySnapshot = await getDocs(collection(db, 'advantages'));
      const fetchedAdvantages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAdvantages(fetchedAdvantages);
    };

    fetchAdvantages();
  }, []);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      let imgURL = '';
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `advantages/${file.name}`);
        await uploadBytes(storageRef, file);
        imgURL = await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, 'advantages'), { ...values, img: imgURL });
      setAdvantages([...advantages, { id: docRef.id, ...values, img: imgURL }]);
      setFileList([]);
      form.resetFields();
      message.success('Advantage added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
      message.error('Error adding advantage');
    }
    setLoading(false);
    setModalVisible(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      let imgURL = values.img;
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `advantages/${file.name}`);
        await uploadBytes(storageRef, file);
        imgURL = await getDownloadURL(storageRef);
      }
      const docRef = doc(db, 'advantages', editingIndex);
      await updateDoc(docRef, { ...values, img: imgURL });
      const updatedAdvantages = advantages.map(advantage =>
        advantage.id === editingIndex ? { id: editingIndex, ...values, img: imgURL } : advantage
      );
      setAdvantages(updatedAdvantages);
      setEditingIndex(null);
      setFileList([]);
      form.resetFields();
      message.success('Advantage updated successfully');
    } catch (error) {
      console.error('Error updating document: ', error);
      message.error('Error updating advantage');
    }
    setLoading(false);
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'advantages', id));
      const updatedAdvantages = advantages.filter(advantage => advantage.id !== id);
      setAdvantages(updatedAdvantages);
      message.success('Advantage deleted successfully');
    } catch (error) {
      console.error('Error deleting document: ', error);
      message.error('Error deleting advantage');
    }
  };

  const handleEditClick = (advantage) => {
    setEditingIndex(advantage.id);
    form.setFieldsValue(advantage);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFileList([]);
    form.resetFields();
    setModalVisible(false);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Card title="Advantages Management" bordered={false} style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        <PlusOutlined /> Add Advantage
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={advantages}
        renderItem={item => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEditClick(item)} />,
              <DeleteOutlined onClick={() => handleDelete(item.id)} />,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <AdvantagesWidget advantages={advantages} />
      <Modal
        visible={modalVisible}
        title={editingIndex === null ? 'Add Advantage' : 'Edit Advantage'}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={editingIndex === null ? handleAdd : handleEdit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Image"
          >
            <Upload
              name='img'
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }} // Disable automatic upload
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingIndex === null ? 'Add Advantage' : 'Update Advantage'}
            </Button>
            {editingIndex !== null && (
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AdvantagesWidgetEditor;
