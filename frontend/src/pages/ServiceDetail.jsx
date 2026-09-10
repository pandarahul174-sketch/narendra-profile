import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../api/axios';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${slug}`)
      .then(({ data }) => setService(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services" className="text-primary-600 hover:underline">Back to Services</Link>
      </div>
    );
  }

  const benefits = [
    'SEO-optimized content',
    '100% human-written',
    'Plagiarism-free guarantee',
    'Two free revisions',
    'Fast turnaround',
    'Industry experts',
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-4">
            <ArrowLeft size={18} /> Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{service.title}</h1>
          <p className="text-primary-200 text-lg max-w-2xl">{service.short_description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.description || `<p>${service.short_description}</p>` }}
              />
            </div>
            <div>
              <div className="card sticky top-24">
                <h3 className="font-display font-bold text-lg mb-4">What You Get</h3>
                <ul className="space-y-3 mb-6">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-primary-600 shrink-0" size={18} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to="/quote" className="btn-primary w-full text-center">Get A Quote</Link>
                <Link to="/contact" className="btn-secondary w-full text-center mt-3">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
