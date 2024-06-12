import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FeaturedProductInfo from './components/FeaturedProductInfo';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Contact from './pages/Contact';
import QuotationForm from './pages/QuotationForm';
import SolarCalculations from './pages/SolarCalculations';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './components/Auth/AdminLogin';
import AdminSignup from './components/Auth/AdminSignup';
import UserChat from './components/Chat/UserChat';
import AdminChat from './components/Chat/AdminChat';
import ProtectRoute from './components/ProtectRoutes';
import AdminRoute from './components/AdminRoutes';
import AdminOverview from './components/AdminOverview';
import AdminDashboard from './components/AdminDashboard';
import CompanyInfoEditor from './components/CompanyInfoEditor';
import ProductsPage from './pages/ProductsPage';
import MessagesPage from './pages/MessagesPage';
import ContactsPage from './pages/ContactsPage';
import QuotationsPage from './pages/QuotationsPage';
import CategoryPage from './pages/CategoryPage';
import SolarResult from './pages/SolarResultsPage';
import PagesList from './components/PagesList';
import PageEditor from './components/PageEditor';
import AppearanceCustomizer from './components/AppearanceCustomizer';
import WidgetsList from './components/WidgetsList';
import SliderCarouselEditor from './components/SliderCarouselEditor';
import FeaturedProductsFormWidget from './components/FeaturedProductsFormWidget';
import AdvantagesWidgetEditor from './components/AdvantagesWidgetEditor';
import TestimonialsWidgetEditor from './components/TestimonialsWidgetEditor';
import RecentProjectsWidgetEditor from './components/RecentProjectsWidgetEditor';
import FAQsWidgetEditor from './components/FAQsWidgetEditor';
import VideoGalleryWidgetEditor from './components/VideoGalleryWidgetEditor';
import AboutPageEditor from './components/AboutPageEditor';
import ServicePageEditor from './components/ServicePageEditor';
import EditContactDetailsPage from './components/EditContactDetailsPage';
import SettingsWidget from './components/SettingsWidget';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/featured-product/:productId" element={<FeaturedProductInfo />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetailsPage />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/quotation" element={<QuotationForm />} />
    <Route path="/solar-calculation" element={<SolarCalculations />} />
    <Route path="/xyz/admin" element={<AdminLogin />} />
    <Route path="/xyz/admin/signup" element={<AdminSignup />} />
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
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/about" element={<AboutPageEditor />} />
        <Route path="pages/services" element={<ServicePageEditor />} />
        <Route path="pages/contact" element={<EditContactDetailsPage />} />
        <Route path="appearance" element={<AppearanceCustomizer />} />
        <Route path="widgets" element={<WidgetsList />} />
        <Route path="widgets/slider-carousel" element={<SliderCarouselEditor />} />
        <Route path="widgets/featured-products" element={<FeaturedProductsFormWidget />} />
        <Route path="widgets/company-info" element={<CompanyInfoEditor />} />
        <Route path="widgets/advantages" element={<AdvantagesWidgetEditor />} />
        <Route path="widgets/testimonials" element={<TestimonialsWidgetEditor />} />
        <Route path="widgets/recent-projects" element={<RecentProjectsWidgetEditor />} />
        <Route path="widgets/faqs" element={<FAQsWidgetEditor />} />
        <Route path="widgets/video-gallery" element={<VideoGalleryWidgetEditor />} />
        <Route path="settings" element={<SettingsWidget />} />
        <Route path="chat" element={<AdminChat />} />
      </Route>
    </Route>
    <Route path="/pagenotfound" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
