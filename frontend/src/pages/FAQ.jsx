import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/faqs').then(({ data }) => setFaqs(data)).catch(console.error);
  }, []);

  const categories = ['All', ...new Set(faqs.map((f) => f.category))];
  const filtered = filter === 'All' ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">FAQ</h1>
          <p className="text-primary-200 text-lg">Frequently asked questions about our content writing services.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  {faq.question}
                  <span className="text-primary-600 text-xl shrink-0 ml-4">{openId === faq.id ? '−' : '+'}</span>
                </button>
                {openId === faq.id && (
                  <div className="px-6 pb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
