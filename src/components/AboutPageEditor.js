import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message, Skeleton, Alert, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { db, doc, getDoc, setDoc, storage, ref, uploadBytes, getDownloadURL } from '../pages/firebase';

const { Title, Paragraph } = Typography;

const AboutPageEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          form.setFieldsValue(docSnap.data());
        } else {
          setError('No such document!');
        }
      } catch (error) {
        setError('Error getting document: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const team = await Promise.all(
        values.team.map(async (member) => {
          if (member.photo && member.photo.originFileObj) {
            const photoURL = await handleUpload(member.photo.originFileObj);
            return { ...member, photo: photoURL };
          }
          return member;
        })
      );

      await setDoc(doc(db, 'pages', 'about'), { ...values, team });
      message.success('About page updated successfully');
    } catch (error) {
      message.error('Error updating about page: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    const storageRef = ref(storage, `team/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  if (loading) {
    return (
      <Card title="Loading About Page Editor" bordered={false} style={{ width: '100%' }}>
        <Skeleton active paragraph={{ rows: 1 }} />
        <Skeleton active title={false} paragraph={{ rows: 4 }} />
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Skeleton active title={false} paragraph={{ rows: 4 }} />
          </Col>
          <Col xs={24} md={12}>
            <Skeleton active title={false} paragraph={{ rows: 4 }} />
          </Col>
        </Row>
        <Skeleton active title={false} paragraph={{ rows: 2 }} />
        <Skeleton active title={false} paragraph={{ rows: 1 }} />
        <Skeleton.Button active />
      </Card>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Card title="Edit About Page" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label="Who We Are" name="whoWeAre" rules={[{ required: true, message: 'Please input the text for Who We Are!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Our Mission" name="mission" rules={[{ required: true, message: 'Please input the text for Our Mission!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Our Vision" name="vision" rules={[{ required: true, message: 'Please input the text for Our Vision!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Form.List name="team">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row gutter={16} key={key}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: 'Please input the team member name!' }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'role']}
                      fieldKey={[fieldKey, 'role']}
                      rules={[{ required: true, message: 'Please input the team member role!' }]}
                    >
                      <Input placeholder="Role" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'Please input the team member description!' }]}
                    >
                      <Input placeholder="Description" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={4}>
                    <Form.Item
                      name={[name, 'photo']}
                      fieldKey={[fieldKey, 'photo']}
                      valuePropName="file"
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e && e.fileList[0];
                      }}
                      rules={[{ required: true, message: 'Please upload the team member photo!' }]}
                    >
                      <Upload
                        name="photo"
                        listType="picture"
                        beforeUpload={() => false}
                        accept="image/*"
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                    <Button type="danger" onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add Team Member
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AboutPageEditor;
