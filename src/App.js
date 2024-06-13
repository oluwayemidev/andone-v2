import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Drawer, Spin } from "antd";
import translateText from "./translationService"; // Import the translation service
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import FloatingButton from "./components/FloatingButton";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import LanguageMenu from "./components/LanguageMenu";
import DrawerMenu from "./components/DrawerMenu";
import StyledBackground from './components/StyledBackground';
import AppRoutes from "./AppRoutes";
import "./App.css";

const { Content } = Layout;

const App = () => {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [loading, setLoading] = useState(false); // Loader state

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
      setLoading(true); // Start loader
      const translations = {};

      for (const key in textsToTranslate) {
        translations[key] = await translateText(
          textsToTranslate[key],
          language
        );
      }

      setTranslatedTexts(translations);
      setLoading(false); // Stop loader
    };

    translateAllTexts();
  }, [language]);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <AuthProvider>
      <StyledBackground />
      <Router>
        <ScrollToTop />
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderComponent
            translatedTexts={translatedTexts}
            textsToTranslate={textsToTranslate}
            showDrawer={showDrawer}
            setLanguage={setLanguage}
            languageMenu={<LanguageMenu setLanguage={setLanguage} />}
          />
          <DrawerMenu
            visible={visible}
            closeDrawer={closeDrawer}
            translatedTexts={translatedTexts}
            textsToTranslate={textsToTranslate}
          />
          <Content style={{ margin: "0", padding: 0, minHeight: 280 }}>
            {loading ? (
              <Spin tip="Loading translations...">
                <div style={{ minHeight: "80vh" }}></div>
              </Spin>
            ) : (
              <AppRoutes />
            )}
          </Content>
          <FooterComponent translatedTexts={translatedTexts} />
        </Layout>
        <FloatingButton />
      </Router>
    </AuthProvider>
  );
};

export default App;
