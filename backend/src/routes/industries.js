const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM industries ORDER BY sort_order ASC');
  res.json(rows);
});

router.get('/:slug', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM industries WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ message: 'Industry not found.' });
  res.json(rows[0]);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { title, slug, short_description, description, image, sort_order } = req.body;
  const [result] = await pool.query(
    'INSERT INTO industries (title, slug, short_description, description, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    [title, slug, short_description, description, image, sort_order || 0]
  );
  const [rows] = await pool.query('SELECT * FROM industries WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { title, slug, short_description, description, image, sort_order } = req.body;
  await pool.query(
    'UPDATE industries SET title=?, slug=?, short_description=?, description=?, image=?, sort_order=? WHERE id=?',
    [title, slug, short_description, description, image, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM industries WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM industries WHERE id = ?', [req.params.id]);
  res.json({ message: 'Industry deleted.' });
});

module.exports = router;
