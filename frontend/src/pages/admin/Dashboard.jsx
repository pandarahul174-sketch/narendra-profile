import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Quote, FileText, BookOpen, ArrowRight } from 'lucide-react';
import api from '../../api/axios';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/settings/dashboard').then(({ data: d }) => setData(d)).catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const cards = [
    { label: 'New Inquiries', value: data.counts.inquiries, icon: Mail, color: 'bg-blue-500', to: '/admin/inquiries' },
    { label: 'Quote Requests', value: data.counts.quotes, icon: Quote, color: 'bg-amber-500', to: '/admin/quotes' },
    { label: 'Published Posts', value: data.counts.posts, icon: BookOpen, color: 'bg-green-500', to: '/admin/blog' },
    { label: 'Services', value: data.counts.services, icon: FileText, color: 'bg-purple-500', to: '/admin/services' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color, to }) => (
          <Link key={label} to={to} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
              </div>
              <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-primary-600 text-sm flex items-center gap-1">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {data.recentInquiries.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.status}
                </span>
              </div>
            ))}
            {data.recentInquiries.length === 0 && <p className="text-gray-500 text-sm">No inquiries yet.</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Quote Requests</h2>
            <Link to="/admin/quotes" className="text-primary-600 text-sm flex items-center gap-1">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {data.recentQuotes.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.service || 'General'}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'new' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.status}
                </span>
              </div>
            ))}
            {data.recentQuotes.length === 0 && <p className="text-gray-500 text-sm">No quote requests yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
