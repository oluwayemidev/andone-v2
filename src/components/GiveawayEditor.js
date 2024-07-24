import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Card,
  Row,
  Col,
  List,
  Typography,
  Modal,
  Spin,
  Popconfirm,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  db,
  addDoc,
  getDocs,
  collection,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateDoc,
  deleteDoc,
  doc,
} from "../pages/firebase";

const { Title } = Typography;

const GiveawayEditor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [giveaways, setGiveaways] = useState([]);
  const [editingGiveaway, setEditingGiveaway] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const snapshot = await getDocs(collection(db, "giveawayPopup"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGiveaways(data);
      } catch (error) {
        console.error("Error fetching giveaways: ", error);
      }
    };

    fetchGiveaways();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        // title: values.title,
        description: values.description,
        image: imageUrl,
      };
      await addDoc(collection(db, "giveawayPopup"), data);
      form.resetFields();
      setImageUrl(null);
      message.success("Saved successfully!");
      setGiveaways([...giveaways, { ...data, id: giveaways.length }]);
      form.resetFields();
    } catch (error) {
      console.error("Error saving to Firebase: ", error);
      message.error("Error saving to Firebase!", error);
    } finally {
      setLoading(false);
    }
  };

  const onEditFinish = async (values) => {
    setLoading(true);
    try {
      const giveawayRef = doc(db, "giveawayPopup", editingGiveaway.id);
      const updatedData = {
        // title: values.title,
        description: values.description,
        image: imageUrl || editingGiveaway.image,
      };
      await updateDoc(giveawayRef, updatedData);
      form.resetFields();
      setImageUrl(null);
      message.success("Updated successfully!");
      setGiveaways(
        giveaways.map((g) =>
          g.id === editingGiveaway.id ? { ...g, ...updatedData } : g
        )
      );
      setEditModalVisible(false);
      setEditingGiveaway(null);
    } catch (error) {
      console.error("Error updating in Firebase: ", error);
      message.error("Error updating in Firebase!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (giveaway) => {
    setEditingGiveaway(giveaway);
    form.setFieldsValue({
      title: giveaway.title,
      description: giveaway.description,
      image: giveaway.image,
    });
    setImageUrl(giveaway.image);
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "giveawayPopup", id));
      message.success("Deleted successfully!");
      setGiveaways(giveaways.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error deleting from Firebase: ", error);
      message.error("Error deleting from Firebase!");
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const storageRef = ref(storage, `giveaway-images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      form.setFieldsValue({ imgSrc: downloadURL });
      setImageUrl(downloadURL);
      // message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      message.error("Error uploading image!");
    } finally {
      setUploading(false);
    }
    return false; // Prevent upload action
  };

  return (
    <div style={{ padding: "40px" }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Add Giveaway" bordered={false}>
            <Form form={form} onFinish={onFinish} layout="vertical">
              {/* <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input placeholder="Enter the title" />
              </Form.Item> */}
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input placeholder="Enter the description" />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Upload
                  beforeUpload={handleImageUpload}
                  listType="picture"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                {uploading ? (
                  <Spin style={{ display: "block", marginTop: 10 }} />
                ) : (
                  imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      style={{
                        marginTop: "10px",
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    />
                  )
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Giveaways" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={giveaways}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>,
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="link"
                        danger
                      >
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: 60, height: 60, objectFit: "cover" }}
                      />
                    }
                    title={<a href="#">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Giveaway"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onEditFinish} layout="vertical">
          {/* <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter the title" />
          </Form.Item> */}
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input placeholder="Enter the description" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={handleImageUpload}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {uploading ? (
              <Spin style={{ display: "block", marginTop: 10 }} />
            ) : (
              imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{
                    marginTop: "10px",
                    maxWidth: "50px",
                    maxHeight: "50px",
                  }}
                />
              )
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GiveawayEditor;
