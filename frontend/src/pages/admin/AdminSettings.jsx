import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      setSettings(data.settings || {});
      setStats(data.stats || []);
    }).catch(console.error);
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      await api.put('/settings/settings', settings);
      setSaved(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStat = async (stat) => {
    try {
      await api.put(`/settings/stats/${stat.id}`, stat);
      setSaved(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Site Settings</h1>
      {saved && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">Settings saved successfully!</div>}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">General Settings</h2>
          <form onSubmit={handleSaveSettings} className="space-y-3">
            <div><label className="label">Site Name</label><input className="input-field" value={settings.site_name || ''} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} /></div>
            <div><label className="label">Tagline</label><input className="input-field" value={settings.tagline || ''} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} /></div>
            <div><label className="label">Email</label><input className="input-field" value={settings.email || ''} onChange={(e) => setSettings({ ...settings, email: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Phone 1</label><input className="input-field" value={settings.phone1 || ''} onChange={(e) => setSettings({ ...settings, phone1: e.target.value })} /></div>
              <div><label className="label">Phone 2</label><input className="input-field" value={settings.phone2 || ''} onChange={(e) => setSettings({ ...settings, phone2: e.target.value })} /></div>
            </div>
            <div><label className="label">Address</label><input className="input-field" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} /></div>
            <div><label className="label">About (Short)</label><textarea className="input-field" rows={2} value={settings.about_short || ''} onChange={(e) => setSettings({ ...settings, about_short: e.target.value })} /></div>
            <div><label className="label">About (Full HTML)</label><textarea className="input-field" rows={4} value={settings.about_full || ''} onChange={(e) => setSettings({ ...settings, about_full: e.target.value })} /></div>
            <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Settings'}</button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Homepage Stats</h2>
          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div key={stat.id} className="border rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="label">Label</label>
                    <input className="input-field text-sm" value={stat.label} onChange={(e) => {
                      const updated = [...stats];
                      updated[idx] = { ...stat, label: e.target.value };
                      setStats(updated);
                    }} />
                  </div>
                  <div>
                    <label className="label">Value</label>
                    <input className="input-field text-sm" value={stat.value} onChange={(e) => {
                      const updated = [...stats];
                      updated[idx] = { ...stat, value: e.target.value };
                      setStats(updated);
                    }} />
                  </div>
                  <div>
                    <label className="label">Suffix</label>
                    <input className="input-field text-sm" value={stat.suffix} onChange={(e) => {
                      const updated = [...stats];
                      updated[idx] = { ...stat, suffix: e.target.value };
                      setStats(updated);
                    }} />
                  </div>
                </div>
                <button onClick={() => handleSaveStat(stats[idx])} className="text-sm text-primary-600 hover:underline">Save stat</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
