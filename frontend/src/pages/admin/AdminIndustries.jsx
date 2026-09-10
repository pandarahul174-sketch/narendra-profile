import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Modal, { ConfirmDelete } from '../../components/admin/Modal';

const emptyForm = { title: '', slug: '', short_description: '', description: '', sort_order: 0 };

export default function AdminIndustries() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/industries').then(({ data }) => setItems(data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setModal('form'); };
  const openEdit = (item) => { setForm({ ...item }); setModal('form'); };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) await api.put(`/industries/${form.id}`, form);
      else await api.post('/industries', form);
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
      await api.delete(`/industries/${deleteId}`);
      setDeleteId(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Industries</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm py-2"><Plus size={18} /> Add Industry</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Title</th>
              <th className="text-left p-4 font-medium hidden md:table-cell">Slug</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4 text-gray-500 hidden md:table-cell">{item.slug}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(item)} className="p-2 hover:bg-gray-100 rounded"><Pencil size={16} /></button>
                  <button onClick={() => setDeleteId(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal === 'form'} onClose={() => setModal(null)} title={form.id ? 'Edit Industry' : 'Add Industry'}>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} />
          </div>
          <div>
            <label className="label">Slug</label>
            <input className="input-field" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <div>
            <label className="label">Short Description</label>
            <textarea className="input-field" rows={2} value={form.short_description || ''} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
          </div>
          <div>
            <label className="label">Full Description (HTML)</label>
            <textarea className="input-field" rows={4} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <p className="text-gray-600 mb-4">Delete this industry?</p>
        <ConfirmDelete onConfirm={handleDelete} loading={loading} />
      </Modal>
    </div>
  );
}
