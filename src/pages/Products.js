import React, { useState, useEffect } from "react";
import { Layout, Input, Select, Typography, Row, Col, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import "../styles/Products.css";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error fetching products!", error);
    }
    setLoading(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    filterProducts(searchQuery, value);
  };

  const filterProducts = (query, category) => {
    let filtered = products;
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <Title
          level={2}
          style={{
            color: "white",
            lineHeight: "64px",
            textAlign: "center",
          }}
        >
          Our Products
        </Title>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          breakpoint="lg"
          collapsedWidth="0"
          style={{ marginTop: 50 }}
        >
          <Filters
            categories={[
              "All",
              ...(categories
                ? categories.map((category) => category.name)
                : []),
            ]}
            onCategoryChange={handleCategoryChange}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="search-container">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="All">All</Option>
                    {categories.map((category) => (
                      <Option key={category.id} value={category.name}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
