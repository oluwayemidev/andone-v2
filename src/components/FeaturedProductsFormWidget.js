// src/components/FeaturedProductsFormWidget.js
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Rate,
  Upload,
  message,
  Typography,
  Space,
  List,
  Card,
  Modal,
  Popconfirm,
} from "antd";
import {
  UploadOutlined,
  DollarOutlined,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  db,
  storage,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../pages/firebase";

const { Title } = Typography;

const FeaturedProductsFormWidget = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "featuredProducts"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setImageUrl(product.imgSrc);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "featuredProducts", id));
      message.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    form.resetFields();
    setImageUrl("");
    setIsModalVisible(true);
  };

  const uploadProps = {
    beforeUpload: async (file) => {
      setLoading(true);
      try {
        const storageRef = ref(storage, `product-images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        form.setFieldsValue({ imgSrc: downloadURL });
        setImageUrl(downloadURL);
      } catch (error) {
        message.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
      return false;
    },
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (selectedProduct) {
        // Update product
        await updateDoc(
          doc(db, "featuredProducts", selectedProduct.id),
          values
        );
        message.success("Product updated successfully");
      } else {
        // Add new product
        await addDoc(collection(db, "featuredProducts"), values);
        message.success("Product added successfully");
      }
      form.resetFields();
      setImageUrl("");
      setSelectedProduct(null);
      fetchProducts();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="featured-products-form-widget" style={{ padding: "20px" }}>
      <Title level={2} style={{ color: "#1890ff" }}>
        <Space>
          <EditOutlined />
          Featured Products
        </Space>
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddProduct}
        style={{ marginBottom: "20px" }}
      >
        Add Product
      </Button>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleSelectProduct(item)}
                />,
                <Popconfirm
                  title="Are you sure you want to delete this product?"
                  onConfirm={() => handleDeleteProduct(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" icon={<DeleteOutlined />} danger />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={item.title}
                description={
                  <>
                    <p>{item.description.slice(0, 100) + "..."}</p>
                    <p>Price: ${item.price}</p>
                    <p>
                      Rating: <Rate disabled defaultValue={item.rating} />
                    </p>
                    {item.imgSrc && (
                      <img
                        src={item.imgSrc}
                        alt={item.title}
                        style={{
                          maxWidth: "100%",
                          aspectRatio: "1 / 1",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={selectedProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedProduct}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Product Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the product title" },
            ]}
          >
            <Input
              placeholder="Enter product title"
              prefix={<EditOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="imgSrc"
            rules={[
              { required: true, message: "Please upload a product image" },
            ]}
          >
            <Upload {...uploadProps} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && (
              <div className="image-preview">
                <img
                  src={imageUrl}
                  alt="Product Preview"
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input
              prefix={<DollarOutlined />}
              placeholder="Enter product price"
              type="number"
              min="0"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate character={<StarOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
            >
              {selectedProduct ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeaturedProductsFormWidget;
