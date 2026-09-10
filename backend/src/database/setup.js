const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await connection.query(schema);
  console.log('Database schema created.');

  await connection.changeUser({ database: process.env.DB_NAME || 'contenthub' });

  const [users] = await connection.query('SELECT id FROM users LIMIT 1');
  if (users.length === 0) {
    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('user123', 10);

    await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
      ['Admin User', 'admin@contenthub.com', adminHash, 'admin', 'Demo User', 'user@contenthub.com', userHash, 'user']
    );
    console.log('Default users created: admin@contenthub.com / admin123, user@contenthub.com / user123');
  }

  const [services] = await connection.query('SELECT id FROM services LIMIT 1');
  if (services.length === 0) {
    await connection.query(`
      INSERT INTO services (title, slug, short_description, description, icon, featured, sort_order) VALUES
      ('Web Content Writing', 'web-content-writing', 'Engaging web content that converts browsers into buyers.', 'Your webpage content is integral to forming a strong bond with your likely customers. We create riveting web content that fuses brand information with a slight sales angle.', 'Globe', TRUE, 1),
      ('Blog Writing', 'blog-writing', 'SEO-optimized blogs that establish industry authority.', 'Our blog writers infuse the essence of industry leadership in your content with well-researched blogs that address reader queries.', 'BookOpen', TRUE, 2),
      ('Article Writing', 'article-writing', 'Well-articulated articles packed with rich insights.', 'Our article writers steer clear of waffle content and do deep research to present topics packed with rich insights.', 'FileText', TRUE, 3),
      ('Press Release Writing', 'press-release-writing', 'High-impact press releases that capture media attention.', 'From product launches to company milestones, we distil your news into powerful, newsworthy content.', 'Newspaper', TRUE, 4),
      ('SEO Content Writing', 'seo-content-writing', 'Keyword-optimized content that boosts organic traffic.', 'From meticulously researched articles to optimized product pages, our content writers boost your online visibility.', 'Search', TRUE, 5),
      ('Copywriting', 'copywriting', 'Persuasive copy that drives conversions.', 'Compelling copy for ads, landing pages, and marketing campaigns that speak directly to your audience.', 'PenTool', FALSE, 6),
      ('Case Study Writing', 'case-study-writing', 'Compelling case studies that showcase your success.', 'Transform client success stories into powerful marketing assets.', 'Briefcase', FALSE, 7),
      ('Whitepapers Writing', 'whitepapers-writing', 'In-depth whitepapers that establish thought leadership.', 'Authoritative long-form content for B2B lead generation.', 'FileStack', FALSE, 8),
      ('Ebook Writing', 'ebook-writing', 'Professional ebooks for lead magnets and authority building.', 'Engaging ebook content that educates and converts.', 'BookMarked', FALSE, 9)
    `);
  }

  const [industries] = await connection.query('SELECT id FROM industries LIMIT 1');
  if (industries.length === 0) {
    await connection.query(`
      INSERT INTO industries (title, slug, short_description, sort_order) VALUES
      ('Healthcare & Fitness', 'healthcare-fitness', 'Medical, wellness, and fitness content by industry experts.', 1),
      ('Real Estate', 'real-estate', 'Property listings, market reports, and real estate marketing copy.', 2),
      ('Finance & BFSI', 'finance', 'Financial services content that builds trust and compliance.', 3),
      ('Technology & SaaS', 'technology', 'Tech blogs, product docs, and SaaS marketing content.', 4),
      ('Travel & Hospitality', 'travel', 'Destination guides, hotel descriptions, and travel blogs.', 5),
      ('Fashion & Lifestyle', 'fashion', 'Trend-forward content for fashion and lifestyle brands.', 6),
      ('Education & EdTech', 'education', 'Educational content and EdTech platform copy.', 7)
    `);
  }

  const [stats] = await connection.query('SELECT id FROM site_stats LIMIT 1');
  if (stats.length === 0) {
    await connection.query(`
      INSERT INTO site_stats (label, value, suffix, sort_order) VALUES
      ('Projects Executed', '500', '+', 1),
      ('Years Experience', '15', '+', 2),
      ('Websites Optimized', '200', '+', 3),
      ('Team Members', '20', '+', 4)
    `);
  }

  const [testimonials] = await connection.query('SELECT id FROM testimonials LIMIT 1');
  if (testimonials.length === 0) {
    await connection.query(`
      INSERT INTO testimonials (name, role, company, content, rating, featured, sort_order) VALUES
      ('Mohit M', 'Manager', 'Digital Agency', 'They have fresh and unique content ready for all industries. I have utilized them for SEO articles, blogs, press releases, and website content.', 5, TRUE, 1),
      ('Vishwas M', 'CEO', 'Tech Startup', 'ContentHub is diligent with its focus on high-quality content. They can add a formal tone or make it witty depending on the target audience.', 5, TRUE, 2),
      ('Arnab M', 'Manager', 'Healthcare Co', 'They understand the requirement well and spend time on client briefing. There is hardly any iteration on their works.', 5, TRUE, 3),
      ('Aniket C', 'CTO', 'SEO Agency', 'Their writing charges are pretty nominal, and they also offer bulk volume discounts. Quality benchmarks remain high.', 5, TRUE, 4)
    `);
  }

  const [faqs] = await connection.query('SELECT id FROM faqs LIMIT 1');
  if (faqs.length === 0) {
    await connection.query(`
      INSERT INTO faqs (question, answer, category, sort_order) VALUES
      ('Why should I invest in professional content writing services?', 'Content brings 3x more leads than traditional marketing. Professional writers create high-quality, SEO-optimized content that engages your audience while you focus on core business.', 'General', 1),
      ('What types of content do you specialize in?', 'We specialize in website content, blog posts, SEO articles, press releases, case studies, whitepapers, ebooks, and social media content.', 'Services', 2),
      ('How do you ensure content quality?', 'Our three-tier process includes skilled writers, thorough research, editing/proofreading, plagiarism checks, and AI detection to ensure 100% original human-written content.', 'Quality', 3),
      ('What are your pricing options?', 'Pricing starts from $2 per 100 words depending on complexity. Bulk orders receive attractive discounts. Contact us for a custom quote.', 'Pricing', 4),
      ('What is the typical turnaround time?', 'We can deliver 1-2 articles (2000-2500 words) in 1-2 working days. Large projects up to 20,000 words within 48 hours.', 'Delivery', 5),
      ('Do you use AI to write content?', 'No. We have a strict policy against AI-generated content. Every piece is human-written and checked with AI detection tools.', 'Quality', 6)
    `);
  }

  const [posts] = await connection.query('SELECT id FROM blog_posts LIMIT 1');
  if (posts.length === 0) {
    await connection.query(`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, author, published, published_at) VALUES
      ('In-House Writers vs Content Agency: What Works Better?', 'in-house-writers-vs-content-agency', 'Growing brands often struggle with execution speed and consistency. Here is what works better for marketing traction.', '<p>Growing brands often struggle more with execution speed and consistency than ideas alone. An agency brings scalability, expertise, and faster turnaround.</p><p>Content agencies offer specialized writers across industries, built-in QA processes, and the flexibility to scale up or down based on your needs.</p>', 'Content Strategy', 'ContentHub Team', TRUE, NOW()),
      ('How Much Do Content Writing Services Cost in 2026?', 'content-writing-services-cost-2026', 'A comprehensive pricing guide for content writing services in India and globally.', '<p>Content writing services follow a wide pricing range based on complexity, research depth, and word count. Standard rates start from $2 per 100 words.</p>', 'Content Writing', 'ContentHub Team', TRUE, NOW()),
      ('Why Human Written Content Ranks Higher than AI Content', 'human-written-content-ranks-higher', 'AI enables mass content creation, but human content still wins in search rankings.', '<p>Human-written content provides depth, nuance, and E-E-A-T signals that search engines and AI answer engines prioritize.</p>', 'Content Writing', 'ContentHub Team', TRUE, NOW()),
      ('Blog Post Formatting: A Simple Checklist Before You Publish', 'blog-post-formatting-checklist', 'A quick formatting review can make or break your blog success.', '<p>Before hitting publish, check headings, meta descriptions, internal links, image alt text, and readability scores.</p>', 'Blog Writing', 'ContentHub Team', TRUE, NOW())
    `);
  }

  const [samples] = await connection.query('SELECT id FROM samples LIMIT 1');
  if (samples.length === 0) {
    await connection.query(`
      INSERT INTO samples (title, description, category, industry, content, sort_order) VALUES
      ('Healthcare Blog Sample', 'Medical tourism blog post sample', 'Blog', 'Healthcare', 'Sample healthcare blog content demonstrating expertise in medical writing...', 1),
      ('SaaS Product Page', 'SaaS landing page copy sample', 'Web Content', 'Technology', 'Sample SaaS product page with compelling value propositions...', 2),
      ('Finance Whitepaper Excerpt', 'BFSI whitepaper introduction', 'Whitepaper', 'Finance', 'Sample whitepaper introduction on digital banking trends...', 3),
      ('Travel Destination Guide', 'Travel blog sample for destination marketing', 'Blog', 'Travel', 'Sample travel guide showcasing engaging destination content...', 4)
    `);
  }

  const [settings] = await connection.query('SELECT id FROM site_settings LIMIT 1');
  if (settings.length === 0) {
    await connection.query(`
      INSERT INTO site_settings (setting_key, setting_value) VALUES
      ('site_name', 'ContentHub'),
      ('tagline', 'Professional Content Writing Services That Communicate & Convert'),
      ('email', 'info@contenthub.com'),
      ('phone1', '+91 9960237972'),
      ('phone2', '+91 9987585819'),
      ('address', 'Mumbai, India'),
      ('about_short', 'ContentHub is a leading content writing company delivering SEO-focused, human-written content for brands worldwide.'),
      ('about_full', 'We have built significant capabilities as a leading content writing company. With seasoned wordsmiths combining creativity with strategic thinking, we produce content that engages and converts. Our deep understanding of diverse industries allows us to create stories that resonate with your target market.')
    `);
  }

  await connection.end();
  console.log('Database setup complete!');
}

setup().catch((err) => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
