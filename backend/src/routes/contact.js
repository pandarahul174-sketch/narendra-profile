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
    body('message').trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, phone, email, message, service } = req.body;
    const [result] = await pool.query(
      'INSERT INTO contact_inquiries (name, phone, email, message, service) VALUES (?, ?, ?, ?, ?)',
      [name, phone, email, message, service]
    );
    res.status(201).json({ id: result.insertId, message: 'Thank you! We will contact you soon.' });
  }
);

router.get('/', auth, adminOnly, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
  res.json(rows);
});

router.patch('/:id/status', auth, adminOnly, async (req, res) => {
  const { status } = req.body;
  await pool.query('UPDATE contact_inquiries SET status = ? WHERE id = ?', [status, req.params.id]);
  const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [req.params.id]);
  res.json({ message: 'Inquiry deleted.' });
});

module.exports = router;
