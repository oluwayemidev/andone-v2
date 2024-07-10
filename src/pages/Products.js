import React, { useState, useEffect } from "react";
import { Layout, Input, Select, Typography, Row, Col, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import "../styles/Products.css";
import translateText from "../translationService"; // Import your translation service

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ProductPage = ({ language }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [translatedCategories, setTranslatedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [translatedTexts, setTranslatedTexts] = useState({
    header: "Our Products",
    searchPlaceholder: "Search products",
    allCategory: "All",
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length) {
      translateProductDetails(products, language);
    }
    translateStaticTexts(language);
  }, [language, products]);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
      translateCategories(categoriesData, language);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error fetching products!", error);
    }
    setLoading(false);
  };

  const translateProductDetails = async (products, language) => {
    const translatedProducts = await Promise.all(
      products.map(async (product) => {
        const translatedName = await translateText(product.name, language);
        const translatedCategory = await translateText(product.category, language);
        return {
          ...product,
          name: translatedName,
          category: translatedCategory,
        };
      })
    );
    setFilteredProducts(translatedProducts);
  };

  const translateCategories = async (categories, language) => {
    const translatedCategoriesData = await Promise.all(
      categories.map(async (category) => {
        const translatedName = await translateText(category.name, language);
        return {
          id: category.id,
          name: translatedName,
        };
      })
    );
    setTranslatedCategories(translatedCategoriesData.map(cat => cat.name));
  };

  const translateStaticTexts = async (language) => {
    const translatedHeader = await translateText("Our Products", language);
    const translatedSearchPlaceholder = await translateText("Search products", language);
    const translatedAllCategory = await translateText("All", language);

    setTranslatedTexts({
      header: translatedHeader,
      searchPlaceholder: translatedSearchPlaceholder,
      allCategory: translatedAllCategory,
    });
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
    <Layout style={{ minHeight: "100vh", backgroundColor: 'white' }}>
      <Header className="header">
        <Title
          level={2}
          style={{
            color: "white",
            lineHeight: "64px",
            textAlign: "center",
          }}
        >
          {translatedTexts.header}
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
            categories={[translatedTexts.allCategory, ...translatedCategories]}
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
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder={translatedTexts.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{  }}
                    size="large"
                  />
                {/* <Col xs={24} sm={12} md={12}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="All">{translatedTexts.allCategory}</Option>
                    {translatedCategories.map((category, index) => (
                      <Option key={index} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </Col> */}
            </div>
            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <ProductList products={filteredProducts} language={language} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
