import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Tag } from 'lucide-react';
import api from '../api/axios';

export default function Samples() {
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/samples').then(({ data }) => setSamples(data)).catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Content Samples</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Explore our portfolio of content writing samples across industries and formats.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample) => (
              <button
                key={sample.id}
                onClick={() => setSelected(sample)}
                className="card text-left hover:border-primary-200 border border-transparent transition"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <FolderOpen className="text-primary-600" size={24} />
                </div>
                <h2 className="font-display font-bold text-lg mb-2">{sample.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{sample.description}</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                    <Tag size={12} /> {sample.category}
                  </span>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded">{sample.industry}</span>
                </div>
              </button>
            ))}
          </div>
          {samples.length === 0 && (
            <p className="text-center text-gray-500 py-12">No samples available yet.</p>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display font-bold text-2xl mb-2">{selected.title}</h2>
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{selected.category}</span>
              <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded">{selected.industry}</span>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.content}</div>
            <div className="mt-6 flex gap-3">
              <Link to="/quote" className="btn-primary" onClick={() => setSelected(null)}>Get Similar Content</Link>
              <button onClick={() => setSelected(null)} className="btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
