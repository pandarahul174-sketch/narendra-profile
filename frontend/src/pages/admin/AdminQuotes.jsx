import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Modal, { ConfirmDelete } from '../../components/admin/Modal';

const statuses = ['new', 'quoted', 'accepted', 'rejected', 'closed'];

export default function AdminQuotes() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/quotes').then(({ data }) => setItems(data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/quotes/${id}/status`, { status });
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/quotes/${deleteId}`);
      setDeleteId(null);
      setSelected(null);
      load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Quote Requests</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4 hidden md:table-cell">Service</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} onClick={() => setSelected(item)} className={`border-b cursor-pointer hover:bg-gray-50 ${selected?.id === item.id ? 'bg-primary-50' : ''}`}>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-500 hidden md:table-cell">{item.service || '-'}</td>
                  <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="p-8 text-center text-gray-500">No quote requests yet.</p>}
        </div>

        {selected && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-lg">{selected.name}</h2>
              <button onClick={() => setDeleteId(selected.id)} className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="text-gray-500">Email:</span> {selected.email}</p>
              {selected.phone && <p><span className="text-gray-500">Phone:</span> {selected.phone}</p>}
              {selected.company && <p><span className="text-gray-500">Company:</span> {selected.company}</p>}
              {selected.service && <p><span className="text-gray-500">Service:</span> {selected.service}</p>}
              {selected.word_count && <p><span className="text-gray-500">Word Count:</span> {selected.word_count}</p>}
              <p><span className="text-gray-500">Date:</span> {new Date(selected.created_at).toLocaleString()}</p>
            </div>
            {selected.message && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">{selected.message}</p>
              </div>
            )}
            <div>
              <label className="label">Update Status</label>
              <select className="input-field" value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)}>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <ConfirmDelete onConfirm={handleDelete} loading={loading} />
      </Modal>
    </div>
  );
}
