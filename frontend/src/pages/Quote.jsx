import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import api from '../api/axios';

export default function Quote() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', word_count: '', message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const { data } = await api.post('/quotes', {
        ...form,
        word_count: form.word_count ? parseInt(form.word_count) : null,
      });
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', phone: '', company: '', service: '', word_count: '', message: '' });
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get A Quote</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Tell us about your content needs and we will provide a custom quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card">
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
                  <label className="label">Full Name *</label>
                  <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input type="email" className="input-field" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Phone</label>
                  <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input className="input-field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Service Type</label>
                  <select className="input-field" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service</option>
                    <option>Web Content Writing</option>
                    <option>Blog Writing</option>
                    <option>Article Writing</option>
                    <option>SEO Content Writing</option>
                    <option>Press Release</option>
                    <option>Copywriting</option>
                    <option>Case Study</option>
                    <option>Whitepaper</option>
                    <option>Ebook</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Estimated Word Count</label>
                  <input type="number" className="input-field" placeholder="e.g. 2000" value={form.word_count} onChange={(e) => setForm({ ...form, word_count: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">Project Details</label>
                <textarea className="input-field min-h-[120px]" placeholder="Describe your content requirements, target audience, keywords, etc." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" disabled={loading} className="btn-accent w-full">
                {loading ? 'Submitting...' : 'Request Quote'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
