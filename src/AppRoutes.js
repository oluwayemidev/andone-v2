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
import AdminChat from './components/AdminChat';
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
import { MessagesProvider } from './context/MessagesContext';
import Chat from './components/Chat';
import { auth } from './pages/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from './components/Auth';

const AppRoutes = ({ language }) => {
  const [user] = useAuthState(auth);

  return(
  <MessagesProvider>
    <Routes>
      <Route path="/" element={<Home language={language} />} />
      <Route path="/featured-product/:productId" element={<FeaturedProductInfo language={language} />} />
      <Route path="/about" element={<About language={language} />} />
      <Route path="/chat-system" element={user ? <Chat /> : <Auth />} />
      <Route path="/products" element={<Products language={language} />} />
      <Route path="/products/:id" element={<ProductDetailsPage language={language} />} />
      <Route path="/services" element={<Services language={language} />} />
      <Route path="/contact" element={<Contact language={language} />} />
      <Route path="/quotation" element={<QuotationForm language={language} />} />
      <Route path="/solar-calculation" element={<SolarCalculations language={language} />} />
      <Route path="/xyz/admin" element={<AdminLogin language={language} />} />
      <Route path="/xyz/admin/signup" element={<AdminSignup language={language} />} />
      <Route path="/chat" element={<ProtectRoute />}>
        <Route path="" element={<UserChat language={language} />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="" element={<AdminDashboard language={language} />}>
          <Route index element={<AdminOverview language={language} />} />
          <Route path="products" element={<ProductsPage language={language} />} />
          <Route path="messages" element={<MessagesPage language={language} />} />
          <Route path="contacts" element={<ContactsPage language={language} />} />
          <Route path="chat" element={user ? <AdminChat /> : <Auth />} />
          <Route path="quotations" element={<QuotationsPage language={language} />} />
          <Route path="categories" element={<CategoryPage language={language} />} />
          <Route path="solar-results" element={<SolarResult language={language} />} />
          <Route path="pages" element={<PagesList language={language} />} />
          <Route path="pages/about" element={<AboutPageEditor language={language} />} />
          <Route path="pages/services" element={<ServicePageEditor language={language} />} />
          <Route path="pages/contact" element={<EditContactDetailsPage language={language} />} />
          <Route path="appearance" element={<AppearanceCustomizer language={language} />} />
          <Route path="widgets" element={<WidgetsList language={language} />} />
          <Route path="widgets/slider-carousel" element={<SliderCarouselEditor language={language} />} />
          <Route path="widgets/featured-products" element={<FeaturedProductsFormWidget language={language} />} />
          <Route path="widgets/company-info" element={<CompanyInfoEditor language={language} />} />
          <Route path="widgets/advantages" element={<AdvantagesWidgetEditor language={language} />} />
          <Route path="widgets/testimonials" element={<TestimonialsWidgetEditor language={language} />} />
          <Route path="widgets/recent-projects" element={<RecentProjectsWidgetEditor language={language} />} />
          <Route path="widgets/faqs" element={<FAQsWidgetEditor language={language} />} />
          <Route path="widgets/video-gallery" element={<VideoGalleryWidgetEditor language={language} />} />
          <Route path="settings" element={<SettingsWidget language={language} />} />
          <Route path="chat" element={<AdminChat language={language} />} />
        </Route>
      </Route>
      <Route path="/pagenotfound" element={<NotFoundPage language={language} />} />
      <Route path="*" element={<NotFoundPage language={language} />} />
    </Routes>
  </MessagesProvider>
  )
}

export default AppRoutes;
