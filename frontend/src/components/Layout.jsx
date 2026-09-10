import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import api from '../api/axios';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  {
    label: 'Services',
    children: [
      { to: '/services', label: 'All Services' },
      { to: '/services/web-content-writing', label: 'Web Content Writing' },
      { to: '/services/blog-writing', label: 'Blog Writing' },
      { to: '/services/seo-content-writing', label: 'SEO Content Writing' },
    ],
  },
  {
    label: 'Industries',
    children: [
      { to: '/industries', label: 'All Industries' },
      { to: '/industries/healthcare-fitness', label: 'Healthcare' },
      { to: '/industries/technology', label: 'Technology' },
      { to: '/industries/finance', label: 'Finance' },
    ],
  },
  { to: '/blog', label: 'Blog' },
  { to: '/samples', label: 'Samples' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [settings, setSettings] = useState({});
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
  }, [location]);

  useEffect(() => {
    api.get('/settings').then(({ data }) => setSettings(data.settings || {})).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary-800 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href={`mailto:${settings.email || 'info@contenthub.com'}`} className="flex items-center gap-1 hover:text-primary-200">
              <Mail size={14} /> {settings.email || 'info@contenthub.com'}
            </a>
            <a href={`tel:${settings.phone1 || '+919960237972'}`} className="flex items-center gap-1 hover:text-primary-200">
              <Phone size={14} /> {settings.phone1 || '+91 9960237972'}
            </a>
          </div>
          <Link to="/quote" className="bg-accent hover:bg-accent-dark px-4 py-1 rounded font-medium transition">
            Get A Quote
          </Link>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">C</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                {settings.site_name || 'ContentHub'}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-600 font-medium">
                      {link.label} <ChevronDown size={16} />
                    </button>
                    {dropdown === link.label && (
                      <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[220px] border">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 font-medium transition ${
                      location.pathname === link.to ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-4 py-4 space-y-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="font-semibold text-gray-900 py-2">{link.label}</p>
                  {link.children.map((child) => (
                    <Link key={child.to} to={child.to} className="block pl-4 py-2 text-gray-600 hover:text-primary-600">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={link.to} to={link.to} className="block py-2 text-gray-700 hover:text-primary-600 font-medium">
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-display font-bold text-lg mb-4">
                {settings.site_name || 'ContentHub'}
              </h3>
              <p className="text-sm leading-relaxed">
                {settings.about_short || 'Professional content writing services that communicate and convert.'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/services" className="hover:text-white">Services</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/samples" className="hover:text-white">Samples</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services/web-content-writing" className="hover:text-white">Web Content</Link></li>
                <li><Link to="/services/blog-writing" className="hover:text-white">Blog Writing</Link></li>
                <li><Link to="/services/seo-content-writing" className="hover:text-white">SEO Content</Link></li>
                <li><Link to="/services/copywriting" className="hover:text-white">Copywriting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li>{settings.phone1 || '+91 9960237972'}</li>
                <li>{settings.phone2 || '+91 9987585819'}</li>
                <li>{settings.email || 'info@contenthub.com'}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} {settings.site_name || 'ContentHub'}. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
