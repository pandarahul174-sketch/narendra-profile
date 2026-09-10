const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC');
  res.json(rows);
});

router.get('/featured', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE featured = TRUE ORDER BY sort_order ASC');
  res.json(rows);
});

router.get('/:slug', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ message: 'Service not found.' });
  res.json(rows[0]);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { title, slug, short_description, description, icon, image, featured, sort_order } = req.body;
  const [result] = await pool.query(
    'INSERT INTO services (title, slug, short_description, description, icon, image, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, slug, short_description, description, icon || 'FileText', image, featured || false, sort_order || 0]
  );
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { title, slug, short_description, description, icon, image, featured, sort_order } = req.body;
  await pool.query(
    'UPDATE services SET title=?, slug=?, short_description=?, description=?, icon=?, image=?, featured=?, sort_order=? WHERE id=?',
    [title, slug, short_description, description, icon, image, featured, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Service deleted.' });
});

module.exports = router;
