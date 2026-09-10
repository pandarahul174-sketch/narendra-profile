const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY sort_order ASC');
  res.json(rows);
});

router.get('/featured', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM testimonials WHERE featured = TRUE ORDER BY sort_order ASC LIMIT 6');
  res.json(rows);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { name, role, company, content, rating, image, featured, sort_order } = req.body;
  const [result] = await pool.query(
    'INSERT INTO testimonials (name, role, company, content, rating, image, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, role, company, content, rating || 5, image, featured || false, sort_order || 0]
  );
  const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, role, company, content, rating, image, featured, sort_order } = req.body;
  await pool.query(
    'UPDATE testimonials SET name=?, role=?, company=?, content=?, rating=?, image=?, featured=?, sort_order=? WHERE id=?',
    [name, role, company, content, rating, image, featured, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
  res.json({ message: 'Testimonial deleted.' });
});

module.exports = router;
