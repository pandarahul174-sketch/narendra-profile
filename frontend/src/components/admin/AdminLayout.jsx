import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Building2, BookOpen, MessageSquare,
  HelpCircle, FolderOpen, Mail, Quote, Settings, LogOut, Menu, X, Home
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/services', icon: FileText, label: 'Services' },
  { to: '/admin/industries', icon: Building2, label: 'Industries' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog Posts' },
  { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { to: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
  { to: '/admin/samples', icon: FolderOpen, label: 'Samples' },
  { to: '/admin/inquiries', icon: Mail, label: 'Inquiries' },
  { to: '/admin/quotes', icon: Quote, label: 'Quote Requests' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path, end) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">C</div>
            <span className="font-display font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map(({ to, icon: Icon, label, end }) => (
            <Link
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(to, end) ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white mb-2">
            <Home size={20} /> View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white w-full">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 hidden lg:block">ContentHub Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
