import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import api from '../api/axios';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then(({ data }) => setPost(data))
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

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-4">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-primary-200 text-sm">
            <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
}
