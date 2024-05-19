// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Row, Col, Card, Select, Button, Typography } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import '../styles/Products.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

// const categories = ['All', 'Solar Panels', 'Accessories', 'Inverters', 'Batteries'];

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data); // Assuming response.data is an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    // Fetch products from an API or use static data
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

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
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }
    if (query) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Title level={2} style={{ color: 'white', lineHeight: '64px', textAlign: 'center' }}>Our Products</Title>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Filters categories={categories && categories.map(category => category.name)} onCategoryChange={handleCategoryChange} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="search-container">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 300, marginRight: 16 }}
              />
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ width: 200 }}
              >
                {categories.map(category => (
                  <Option key={category.id} value={category.name}>{category.name}</Option>
                ))}
              </Select>
            </div>
            <ProductList products={filteredProducts} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
