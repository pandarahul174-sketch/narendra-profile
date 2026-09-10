import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Modal, { ConfirmDelete } from '../../components/admin/Modal';

const emptyForm = { title: '', description: '', category: '', industry: '', content: '', sort_order: 0 };

export default function AdminSamples() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/samples').then(({ data }) => setItems(data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) await api.put(`/samples/${form.id}`, form);
      else await api.post('/samples', form);
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
      await api.delete(`/samples/${deleteId}`);
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
        <h1 className="text-2xl font-display font-bold">Content Samples</h1>
        <button onClick={() => { setForm(emptyForm); setModal('form'); }} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={18} /> Add Sample</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{item.title}</h3>
              <div className="flex gap-1">
                <button onClick={() => { setForm({ ...item }); setModal('form'); }} className="p-1 hover:bg-gray-100 rounded"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-1 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-500">{item.description}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
              <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded">{item.industry}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === 'form'} onClose={() => setModal(null)} title={form.id ? 'Edit Sample' : 'Add Sample'}>
        <form onSubmit={handleSave} className="space-y-3">
          <div><label className="label">Title</label><input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="label">Description</label><input className="input-field" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Category</label><input className="input-field" value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><label className="label">Industry</label><input className="input-field" value={form.industry || ''} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></div>
          </div>
          <div><label className="label">Content</label><textarea className="input-field" rows={5} value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <ConfirmDelete onConfirm={handleDelete} loading={loading} />
      </Modal>
    </div>
  );
}
