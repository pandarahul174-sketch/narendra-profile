import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Samples from './pages/Samples';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminIndustries from './pages/admin/AdminIndustries';
import AdminBlog from './pages/admin/AdminBlog';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminSamples from './pages/admin/AdminSamples';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="samples" element={<Samples />} />
        <Route path="contact" element={<Contact />} />
        <Route path="quote" element={<Quote />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="industries" element={<AdminIndustries />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="samples" element={<AdminSamples />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="quotes" element={<AdminQuotes />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
