const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, company, service, word_count, message } = req.body;
    const [result] = await pool.query(
      'INSERT INTO quote_requests (name, email, phone, company, service, word_count, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, company, service, word_count, message]
    );
    res.status(201).json({ id: result.insertId, message: 'Quote request submitted successfully!' });
  }
);

router.get('/', auth, adminOnly, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM quote_requests ORDER BY created_at DESC');
  res.json(rows);
});

router.patch('/:id/status', auth, adminOnly, async (req, res) => {
  const { status } = req.body;
  await pool.query('UPDATE quote_requests SET status = ? WHERE id = ?', [status, req.params.id]);
  const [rows] = await pool.query('SELECT * FROM quote_requests WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM quote_requests WHERE id = ?', [req.params.id]);
  res.json({ message: 'Quote request deleted.' });
});

module.exports = router;
