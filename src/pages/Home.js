// src/pages/Home.js
import React from "react";
import { Row, Col } from "antd";
import CustomerReviewsWidget from "../components/CustomerReviewsWidget";
import BlogPostsWidget from "../components/BlogPostsWidget";
import FAQsWidget from "../components/FAQsWidget";
import InteractiveMapWidget from "../components/InteractiveMapWidget";
import VideoGalleryWidget from "../components/VideoGalleryWidget";
import SocialMediaFeedWidget from "../components/SocialMediaFeedWidget";
import LiveChatWidget from "../components/LiveChatWidget";
import NewsletterSignupWidget from "../components/NewsletterSignupWidget";
import FeaturedProductsWidget from "../components/FeaturedProductsWidget";
import SliderCarousel from "../components/SliderCarousel";
import WeatherWidget from "../components/WeatherWidget";
import SolarNewsWidget from "../components/SolarNewsWidget";
import CompanyInfo from "../components/CompanyInfo";
import SolarEfficiencyWidget from "../components/SolarEfficiencyWidget";
import TestimonialsWidget from "../components/TestimonialsWidget";
import RecentProjectsWidget from "../components/RecentProjectsWidget";
import MottoWidget from "../components/MottoWidget";
import "../styles/Home.css";
import AdvantagesWidget from "../components/AdvantagesWidget";

const Home = () => (
  <div className="home-container">
    <Row gutter={[0, 0]} style={{ marginBottom: 16 }}>
      <Col span={24}>
        <SliderCarousel className="glass-widget" />
      </Col>
    </Row>
    <Row style={{ marginBottom: 16 }}>
      <Col span={24}>
        <FeaturedProductsWidget className="glass-widget" />
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} md={6}>
        <SolarEfficiencyWidget className="glass-widget" />
      </Col>
      <Col xs={24} md={10}>
        <CompanyInfo className="glass-widget" />
      </Col>
      <Col xs={24} md={8}>
        <MottoWidget className="glass-widget" />
        <WeatherWidget className="glass-widget" />
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} lg={16}>
        <AdvantagesWidget />
      </Col>
      <Col xs={24} lg={8}>
        <SolarNewsWidget className="glass-widget" />
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} lg={6}>
        <TestimonialsWidget className="glass-widget" />
      </Col>
      <Col xs={24} lg={18}>
        <RecentProjectsWidget className="glass-widget" />
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={8}>
        <FAQsWidget className="glass-widget" />
      </Col>
      <Col xs={24} sm={12} md={16}>
        <VideoGalleryWidget className="glass-widget" />
      </Col>
    </Row>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={8}>
        <InteractiveMapWidget className="glass-widget" />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <SocialMediaFeedWidget className="glass-widget" />
      </Col>
      {/* <Col xs={24} sm={12} md={8}>
        <LiveChatWidget className="glass-widget" />
      </Col> */}
      <Col xs={24} sm={12} md={8}>
        <NewsletterSignupWidget className="glass-widget" />
      </Col>
    </Row>
  </div>
);

export default Home;
