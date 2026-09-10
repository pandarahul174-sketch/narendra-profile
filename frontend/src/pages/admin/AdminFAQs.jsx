import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Modal, { ConfirmDelete } from '../../components/admin/Modal';

const emptyForm = { question: '', answer: '', category: 'General', sort_order: 0 };

export default function AdminFAQs() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/faqs').then(({ data }) => setItems(data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) await api.put(`/faqs/${form.id}`, form);
      else await api.post('/faqs', form);
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
      await api.delete(`/faqs/${deleteId}`);
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
        <h1 className="text-2xl font-display font-bold">FAQs</h1>
        <button onClick={() => { setForm(emptyForm); setModal('form'); }} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={18} /> Add FAQ</button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium">{item.question}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.answer.replace(/<[^>]*>/g, '')}</p>
              <span className="text-xs text-primary-600 mt-1 inline-block">{item.category}</span>
            </div>
            <div className="flex gap-1 ml-4">
              <button onClick={() => { setForm({ ...item }); setModal('form'); }} className="p-2 hover:bg-gray-100 rounded"><Pencil size={16} /></button>
              <button onClick={() => setDeleteId(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === 'form'} onClose={() => setModal(null)} title={form.id ? 'Edit FAQ' : 'Add FAQ'}>
        <form onSubmit={handleSave} className="space-y-3">
          <div><label className="label">Question</label><input className="input-field" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></div>
          <div><label className="label">Answer (HTML)</label><textarea className="input-field" rows={4} required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Category</label><input className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><label className="label">Sort Order</label><input type="number" className="input-field" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} /></div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <ConfirmDelete onConfirm={handleDelete} loading={loading} />
      </Modal>
    </div>
  );
}
