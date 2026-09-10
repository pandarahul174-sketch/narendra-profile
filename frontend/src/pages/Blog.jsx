import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import api from '../api/axios';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/blog').then(({ data }) => setPosts(data)).catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Blog</h1>
          <p className="text-primary-200 text-lg">Insights on content strategy, SEO, and digital marketing.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card group">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{post.category}</span>
                <h2 className="font-display font-bold text-xl mt-4 mb-3 group-hover:text-primary-600 transition">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-center text-gray-500 py-12">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}
