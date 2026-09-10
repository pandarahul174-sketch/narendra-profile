import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import api from '../api/axios';

export default function Industries() {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    api.get('/industries').then(({ data }) => setIndustries(data)).catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Industries We Serve</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Specialized content writing expertise across diverse industry verticals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link key={industry.id} to={`/industries/${industry.slug}`} className="card group">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition">
                  <Building2 className="text-primary-600 group-hover:text-white transition" size={28} />
                </div>
                <h2 className="font-display font-bold text-xl mb-2 group-hover:text-primary-600">{industry.title}</h2>
                <p className="text-gray-600 mb-4">{industry.short_description}</p>
                <span className="text-primary-600 font-medium flex items-center gap-1">
                  Explore <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
