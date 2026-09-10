const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM samples ORDER BY sort_order ASC');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM samples WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Sample not found.' });
  res.json(rows[0]);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { title, description, category, industry, content, image, sort_order } = req.body;
  const [result] = await pool.query(
    'INSERT INTO samples (title, description, category, industry, content, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description, category, industry, content, image, sort_order || 0]
  );
  const [rows] = await pool.query('SELECT * FROM samples WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { title, description, category, industry, content, image, sort_order } = req.body;
  await pool.query(
    'UPDATE samples SET title=?, description=?, category=?, industry=?, content=?, image=?, sort_order=? WHERE id=?',
    [title, description, category, industry, content, image, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM samples WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM samples WHERE id = ?', [req.params.id]);
  res.json({ message: 'Sample deleted.' });
});

module.exports = router;
