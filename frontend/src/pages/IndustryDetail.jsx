import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';

export default function IndustryDetail() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/industries/${slug}`)
      .then(({ data }) => setIndustry(data))
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

  if (!industry) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Industry Not Found</h1>
        <Link to="/industries" className="text-primary-600 hover:underline">Back to Industries</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/industries" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-4">
            <ArrowLeft size={18} /> Back to Industries
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{industry.title}</h1>
          <p className="text-primary-200 text-lg max-w-2xl">{industry.short_description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{
              __html: industry.description || `<p>We provide specialized ${industry.title.toLowerCase()} content writing services tailored to your industry needs. Our expert writers understand the nuances of your sector and deliver content that resonates with your target audience.</p>`,
            }}
          />
          <div className="flex gap-4">
            <Link to="/quote" className="btn-primary">Get A Quote</Link>
            <Link to="/samples" className="btn-secondary">View Samples</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
