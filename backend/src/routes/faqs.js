const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM faqs ORDER BY sort_order ASC');
  res.json(rows);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { question, answer, category, sort_order } = req.body;
  const [result] = await pool.query(
    'INSERT INTO faqs (question, answer, category, sort_order) VALUES (?, ?, ?, ?)',
    [question, answer, category || 'General', sort_order || 0]
  );
  const [rows] = await pool.query('SELECT * FROM faqs WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { question, answer, category, sort_order } = req.body;
  await pool.query(
    'UPDATE faqs SET question=?, answer=?, category=?, sort_order=? WHERE id=?',
    [question, answer, category, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM faqs WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
  res.json({ message: 'FAQ deleted.' });
});

module.exports = router;
