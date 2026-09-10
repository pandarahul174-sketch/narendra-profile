import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', service: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const { data } = await api.post('/contact', form);
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', phone: '', email: '', message: '', service: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-primary-200 text-lg">We are just one phone call away. Reach out today!</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+91 9960237972</p>
                  <p className="text-gray-600">+91 9987585819</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@contenthub.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-600">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="font-display font-bold text-2xl mb-6">Send Us a Message</h2>
                {status?.type === 'success' && (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                    <CheckCircle size={20} /> {status.message}
                  </div>
                )}
                {status?.type === 'error' && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{status.message}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Name *</label>
                      <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Phone</label>
                      <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" className="input-field" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Service Interested In</label>
                    <input className="input-field" placeholder="e.g. Blog Writing, SEO Content" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea className="input-field min-h-[120px]" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                    <Send size={18} /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
