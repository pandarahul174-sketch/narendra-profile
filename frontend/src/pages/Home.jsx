import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, BookOpen, FileText, Search, Newspaper, PenTool,
  CheckCircle, Star, ArrowRight, Phone, Users, Award, Target
} from 'lucide-react';
import api from '../api/axios';

const iconMap = {
  Globe, BookOpen, FileText, Search, Newspaper, PenTool,
};

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={i < rating ? 'fill-accent text-accent' : 'text-gray-300'} />
      ))}
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [settings, setSettings] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/settings'),
      api.get('/services/featured'),
      api.get('/testimonials/featured'),
      api.get('/blog'),
      api.get('/faqs'),
    ]).then(([settingsRes, servicesRes, testimonialsRes, blogRes, faqsRes]) => {
      setStats(settingsRes.data.stats || []);
      setSettings(settingsRes.data.settings || {});
      setServices(servicesRes.data);
      setTestimonials(testimonialsRes.data);
      setBlogPosts(blogRes.data.slice(0, 3));
      setFaqs(faqsRes.data.slice(0, 6));
    }).catch(console.error);
  }, []);

  const features = [
    { icon: Users, title: 'Holistic', desc: 'End-to-end professional content writing from editing to niche technology write-ups.' },
    { icon: Target, title: 'Versatile', desc: 'Coverage spans multiple industry verticals for both B2C and B2B audiences.' },
    { icon: Award, title: 'Experienced', desc: 'Experience across 20+ writing services with strong exposure across industries.' },
    { icon: CheckCircle, title: 'Cost Effective', desc: 'Wide range of content at affordable rates with maximum ROI for your business.' },
  ];

  const process = [
    { step: '1', title: 'Research & Analysis', desc: 'Study your business, competitors, and target audience with keyword research.' },
    { step: '2', title: 'Drafting Content', desc: 'Write compelling introductions, detailed body content, and strong conclusions.' },
    { step: '3', title: 'Editing & Proofreading', desc: 'Multiple rounds of grammar, clarity, originality, and AI detection checks.' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="text-primary-200 font-medium mb-4">Content Writing Services in India</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              {settings.tagline || 'Professional Content Writing Services That Communicate & Convert'}
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/quote" className="btn-accent">Get A Quote</Link>
              <a href={`tel:${settings.phone1}`} className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2">
                <Phone size={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="card text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-600">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Content Writing Services Geared to Deliver Business Outcomes</h2>
          <p className="section-subtitle mx-auto mb-12">
            Content is the language your brand uses to speak to your customers. Fresh, engaging content improves engagement and boosts Google rankings.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card text-left">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary-600" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Types of Content Writing Services We Offer</h2>
            <p className="section-subtitle mx-auto">Comprehensive content solutions tailored to your marketing needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <Link key={service.id} to={`/services/${service.slug}`} className="card group hover:border-primary-200 border border-transparent">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 transition">
                    <Icon className="text-primary-600 group-hover:text-white transition" size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary-600 transition">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.short_description}</p>
                  <span className="text-primary-600 font-medium text-sm flex items-center gap-1">
                    Learn More <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Content Writing Process</h2>
            <p className="text-primary-200 max-w-2xl mx-auto">Our workflow designed to elicit wow from readers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                <p className="text-primary-200">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto">Trusted by brands worldwide for quality content.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card">
                <StarRating rating={t.rating} />
                <p className="text-gray-600 text-sm my-4 italic">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Latest From Our Blog</h2>
            <p className="section-subtitle mx-auto">Insights on content strategy, SEO, and digital marketing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card group">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">{post.category}</span>
                <h3 className="font-display font-bold text-lg mt-3 mb-2 group-hover:text-primary-600 transition">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="btn-secondary">Read All Posts</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  {faq.question}
                  <span className="text-primary-600 text-xl">{openFaq === faq.id ? '−' : '+'}</span>
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-primary-600 font-medium hover:underline">View All FAQs</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Elevate Your Content?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Get in touch today for a free consultation and custom quote for your content needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote" className="btn-accent">Get A Quote</Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
