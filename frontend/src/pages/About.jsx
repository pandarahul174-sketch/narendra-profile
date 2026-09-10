import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import api from '../api/axios';

export default function About() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get('/settings').then(({ data }) => setSettings(data.settings || {})).catch(console.error);
  }, []);

  const values = [
    '100% Human-Written Content',
    'Plagiarism-Free Guarantee',
    'SEO-Optimized Copy',
    'Industry-Specific Expertise',
    'Timely Delivery',
    'Two Free Revisions',
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Us</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            {settings.about_short || 'Leading content writing company delivering excellence worldwide.'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Your Trusted Content Writing Partner</h2>
              <div
                className="text-gray-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: settings.about_full || '<p>We combine creativity with strategic thinking to produce content that engages and converts.</p>',
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="text-primary-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">15+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="card">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">500+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="card">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">20+</div>
              <p className="text-gray-600">Expert Writers</p>
            </div>
          </div>
          <Link to="/contact" className="btn-primary mt-8 inline-flex items-center gap-2">
            Work With Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
