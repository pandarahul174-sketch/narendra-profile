import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, FileText, Search, Newspaper, PenTool, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const iconMap = { Globe, BookOpen, FileText, Search, Newspaper, PenTool };

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then(({ data }) => setServices(data)).catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Comprehensive content writing solutions tailored to your business needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <Link key={service.id} to={`/services/${service.slug}`} className="card group">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition">
                    <Icon className="text-primary-600 group-hover:text-white transition" size={28} />
                  </div>
                  <h2 className="font-display font-bold text-xl mb-2 group-hover:text-primary-600">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.short_description}</p>
                  <span className="text-primary-600 font-medium flex items-center gap-1">
                    Learn More <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-4">Need a Custom Content Solution?</h2>
          <Link to="/quote" className="btn-accent">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
}
