// src/components/RecentProjectsWidgetEditor.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, List, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { db, collection, addDoc, updateDoc, deleteDoc, getDocs, doc, storage, ref, uploadBytes, getDownloadURL } from '../pages/firebase';
import RecentProjectsWidget from './RecentProjectsWidget';

const RecentProjectsWidgetEditor = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      let imgURL = '';
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `projects/${file.name}`);
        await uploadBytes(storageRef, file);
        imgURL = await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, 'projects'), { ...values, imgSrc: imgURL });
      setProjects([...projects, { id: docRef.id, ...values, imgSrc: imgURL }]);
      setFileList([]);
      form.resetFields();
      message.success('Project added successfully');
    } catch (error) {
      console.error('Error adding project: ', error);
      message.error('Error adding project');
    }
    setLoading(false);
    setVisible(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      let imgURL = values.imgSrc;
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `projects/${file.name}`);
        await uploadBytes(storageRef, file);
        imgURL = await getDownloadURL(storageRef);
      }
      const docRef = doc(db, 'projects', editingProject.id);
      await updateDoc(docRef, { ...values, imgSrc: imgURL });
      const updatedProjects = projects.map(project =>
        project.id === editingProject.id ? { id: editingProject.id, ...values, imgSrc: imgURL } : project
      );
      setProjects(updatedProjects);
      setEditingProject(null);
      setFileList([]);
      form.resetFields();
      message.success('Project updated successfully');
    } catch (error) {
      console.error('Error updating project: ', error);
      message.error('Error updating project');
    }
    setLoading(false);
    setVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      message.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project: ', error);
      message.error('Error deleting project');
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setVisible(true);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setFileList([]);
    form.resetFields();
    setVisible(false);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: '16px' }}>
        Add Project
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={projects}
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
      <Modal
        title={editingProject ? 'Edit Project' : 'Add Project'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={editingProject ? handleEdit : handleAdd}>
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
            name="imgSrc"
            label="Image"
          >
            <Upload
              name="img"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
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
              {editingProject ? 'Update Project' : 'Add Project'}
            </Button>
            {editingProject && (
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <RecentProjectsWidget />
    </>
  );
};

export default RecentProjectsWidgetEditor;
