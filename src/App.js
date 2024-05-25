import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Grid,
  Image,
  Dropdown,
  Row,
  Col,
  Divider,
  Space,
} from "antd";
import {
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  MenuOutlined,
  AppstoreOutlined,
  ToolOutlined,
  PhoneOutlined,
  FileSearchOutlined,
  GlobalOutlined,
  SunOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import translateText from "./translationService"; // Import the translation service
import Home from "./pages/Home";
import FeaturedProductInfo from "./components/FeaturedProductInfo";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FloatingButton from "./components/FloatingButton";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import UserChat from "./components/Chat/UserChat";
import AdminChat from "./components/Chat/AdminChat";
import ProtectRoute from "./components/ProtectRoutes";
import AdminRoute from "./components/AdminRoutes";
import { jwtDecode } from "jwt-decode";
import AdminOverview from "./components/AdminOverview";
import AdminDashboard from "./components/AdminDashboard";
import ProductsPage from "./pages/ProductsPage";
import MessagesPage from "./pages/MessagesPage";
import ContactsPage from "./pages/ContactsPage";
import QuotationForm from "./pages/QuotationForm";
import QuotationsPage from "./pages/QuotationsPage";
import CategoryPage from "./pages/CategoryPage";
import SolarCalculations from "./pages/SolarCalculations";
import SolarResult from "./pages/SolarResultsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import logo from "./images/logo.png";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translatedTexts, setTranslatedTexts] = useState({});
  const screens = useBreakpoint();

  const textsToTranslate = {
    home: "Home",
    about: "About",
    products: "Products",
    services: "Services",
    contact: "Contact",
    getQuote: "Get Quote",
    getSolarCalculation: "Solar Calculator",
  };

  useEffect(() => {
    const translateAllTexts = async () => {
      const translations = {};

      for (const key in textsToTranslate) {
        translations[key] = await translateText(
          textsToTranslate[key],
          language
        );
      }

      setTranslatedTexts(translations);
    };

    translateAllTexts();
  }, [language]);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const menu = (
    <Menu theme="light" mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">{translatedTexts.home || textsToTranslate.home}</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<InfoCircleOutlined />}>
        <Link to="/about">
          {translatedTexts.about || textsToTranslate.about}
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<AppstoreOutlined />}>
        <Link to="/products">
          {translatedTexts.products || textsToTranslate.products}
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<ToolOutlined />}>
        <Link to="/services">
          {translatedTexts.services || textsToTranslate.services}
        </Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<PhoneOutlined />}>
        <Link to="/contact">
          {translatedTexts.contact || textsToTranslate.contact}
        </Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<FileSearchOutlined />}>
        <Link to="/quotation">
          {translatedTexts.getQuote || textsToTranslate.getQuote}
        </Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<SunOutlined />}>
        <Link to="/solar-calculation">
          {translatedTexts.getSolarCalculation ||
            textsToTranslate.getSolarCalculation}
        </Link>
      </Menu.Item>
    </Menu>
  );

  const languageMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setLanguage("en")}>
        English
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setLanguage("es")}>
        Español
      </Menu.Item>
    </Menu>
  );

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            className="site-layout-background"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0 0 0 16px",
            }}
          >
            <div
              className="logo"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "auto",
                paddingRight: 20,
              }}
            >
              <Image
                width={100}
                src={logo} // Replace with your logo path
                alt="Logo"
              />
            </div>
            {screens.md ? (
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ flex: 1 }}
              >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/">
                    {translatedTexts.home || textsToTranslate.home}
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                  <Link to="/about">
                    {translatedTexts.about || textsToTranslate.about}
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<AppstoreOutlined />}>
                  <Link to="/products">
                    {translatedTexts.products || textsToTranslate.products}
                  </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<ToolOutlined />}>
                  <Link to="/services">
                    {translatedTexts.services || textsToTranslate.services}
                  </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<PhoneOutlined />}>
                  <Link to="/contact">
                    {translatedTexts.contact || textsToTranslate.contact}
                  </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<FileSearchOutlined />}>
                  <Link to="/quotation">
                    {translatedTexts.getQuote || textsToTranslate.getQuote}
                  </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<SunOutlined />}>
                  <Link to="/solar-calculation">
                    {translatedTexts.getSolarCalculation ||
                      textsToTranslate.getSolarCalculation}
                  </Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    background: "transparent",
                    flexGrow: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Dropdown overlay={languageMenu} placement="bottomRight">
                    <Button icon={<GlobalOutlined />} />
                  </Dropdown>
                </Menu.Item>
              </Menu>
            ) : (
              <Button
                style={{ right: "16px" }}
                icon={<MenuOutlined />}
                onClick={showDrawer}
                className="nav-icon"
              />
            )}
          </Header>
          <Drawer
            title="Menu"
            placement="left"
            onClose={closeDrawer}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            {menu}
          </Drawer>
          <Content style={{ margin: "0", padding: 0, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/featured-product/:productId"
                element={<FeaturedProductInfo />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quotation" element={<QuotationForm />} />
              <Route
                path="/solar-calculation"
                element={<SolarCalculations />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<ProtectRoute />}>
                <Route path="" element={<UserChat />} />
              </Route>
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="" element={<AdminDashboard />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="messages" element={<MessagesPage />} />
                  <Route path="contacts" element={<ContactsPage />} />
                  <Route path="quotations" element={<QuotationsPage />} />
                  <Route path="categories" element={<CategoryPage />} />
                  <Route path="solar-results" element={<SolarResult />} />
                  <Route path="chat" element={<AdminChat />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Route>
            </Routes>
          </Content>
          <Footer
            style={{
              backgroundColor: "#f0f2f5",
              textAlign: "center",
              padding: "0",
            }}
          >
            <Row justify="center">
              <Col span={24}>
                <Divider />
                <h2>Connect with Us</h2>
                <Space size="large">
                  <a
                    href="https://www.facebook.com/andonesolar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookOutlined
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    />
                  </a>
                  <a
                    href="https://twitter.com/andonesolar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterOutlined
                      style={{ fontSize: "24px", color: "#00acee" }}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/andonesolar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramOutlined
                      style={{ fontSize: "24px", color: "#c32aa3" }}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/andonesolar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinOutlined
                      style={{ fontSize: "24px", color: "#0077b5" }}
                    />
                  </a>
                </Space>
                <Divider />
              </Col>
            </Row>
            <Row justify="center">
              <Col span={24}>
                <p style={{ padding: "1rem 2rem" }}>
                  ©{new Date().getFullYear()}. www.andonesolar.com - All rights
                  reserved.
                </p>
              </Col>
            </Row>
          </Footer>
        </Layout>
        <FloatingButton />
      </Router>
    </AuthProvider>
  );
};

export default App;
