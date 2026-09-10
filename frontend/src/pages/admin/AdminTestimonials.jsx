import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Modal, { ConfirmDelete } from '../../components/admin/Modal';

const emptyForm = { name: '', role: '', company: '', content: '', rating: 5, featured: false, sort_order: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/testimonials').then(({ data }) => setItems(data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) await api.put(`/testimonials/${form.id}`, form);
      else await api.post('/testimonials', form);
      setModal(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/testimonials/${deleteId}`);
      setDeleteId(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Testimonials</h1>
        <button onClick={() => { setForm(emptyForm); setModal('form'); }} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={18} /> Add</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.role}{item.company ? `, ${item.company}` : ''}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setForm({ ...item, featured: !!item.featured }); setModal('form'); }} className="p-1 hover:bg-gray-100 rounded"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">&ldquo;{item.content}&rdquo;</p>
            <div className="mt-2 text-xs text-gray-400">Rating: {item.rating}/5 {item.featured && '• Featured'}</div>
          </div>
        ))}
      </div>

      <Modal open={modal === 'form'} onClose={() => setModal(null)} title={form.id ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Name</label><input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="label">Role</label><input className="input-field" value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          </div>
          <div><label className="label">Company</label><input className="input-field" value={form.company || ''} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          <div><label className="label">Content</label><textarea className="input-field" rows={3} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Rating (1-5)</label><input type="number" min="1" max="5" className="input-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} /></div>
            <div><label className="label">Sort Order</label><input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} /></div>
          </div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <ConfirmDelete onConfirm={handleDelete} loading={loading} />
      </Modal>
    </div>
  );
}
