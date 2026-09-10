const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const { all } = req.query;
  const query = all === 'true'
    ? 'SELECT * FROM blog_posts ORDER BY created_at DESC'
    : 'SELECT * FROM blog_posts WHERE published = TRUE ORDER BY published_at DESC';
  const [rows] = await pool.query(query);
  res.json(rows);
});

router.get('/:slug', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ message: 'Post not found.' });
  res.json(rows[0]);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { title, slug, excerpt, content, category, author, image, published } = req.body;
  const publishedAt = published ? new Date() : null;
  const [result] = await pool.query(
    'INSERT INTO blog_posts (title, slug, excerpt, content, category, author, image, published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, slug, excerpt, content, category, author, image, published || false, publishedAt]
  );
  const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { title, slug, excerpt, content, category, author, image, published } = req.body;
  const [existing] = await pool.query('SELECT published_at FROM blog_posts WHERE id = ?', [req.params.id]);
  let publishedAt = existing[0]?.published_at;
  if (published && !publishedAt) publishedAt = new Date();

  await pool.query(
    'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, category=?, author=?, image=?, published=?, published_at=? WHERE id=?',
    [title, slug, excerpt, content, category, author, image, published, publishedAt, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
  res.json({ message: 'Post deleted.' });
});

module.exports = router;
