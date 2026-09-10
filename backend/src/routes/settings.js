const express = require('express');
const pool = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const [stats] = await pool.query('SELECT * FROM site_stats ORDER BY sort_order ASC');
  const [settingsRows] = await pool.query('SELECT * FROM site_settings');
  const settings = {};
  settingsRows.forEach((row) => {
    settings[row.setting_key] = row.setting_value;
  });
  res.json({ stats, settings });
});

router.get('/stats', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM site_stats ORDER BY sort_order ASC');
  res.json(rows);
});

router.put('/stats/:id', auth, adminOnly, async (req, res) => {
  const { label, value, suffix, sort_order } = req.body;
  await pool.query(
    'UPDATE site_stats SET label=?, value=?, suffix=?, sort_order=? WHERE id=?',
    [label, value, suffix, sort_order, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM site_stats WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.put('/settings', auth, adminOnly, async (req, res) => {
  const settings = req.body;
  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [key, value, value]
    );
  }
  const [settingsRows] = await pool.query('SELECT * FROM site_settings');
  const result = {};
  settingsRows.forEach((row) => {
    result[row.setting_key] = row.setting_value;
  });
  res.json(result);
});

router.get('/dashboard', auth, adminOnly, async (req, res) => {
  const [[{ inquiries }]] = await pool.query("SELECT COUNT(*) as inquiries FROM contact_inquiries WHERE status = 'new'");
  const [[{ quotes }]] = await pool.query("SELECT COUNT(*) as quotes FROM quote_requests WHERE status = 'new'");
  const [[{ posts }]] = await pool.query('SELECT COUNT(*) as posts FROM blog_posts WHERE published = TRUE');
  const [[{ services }]] = await pool.query('SELECT COUNT(*) as services FROM services');
  const [recentInquiries] = await pool.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 5');
  const [recentQuotes] = await pool.query('SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 5');

  res.json({
    counts: { inquiries, quotes, posts, services },
    recentInquiries,
    recentQuotes,
  });
});

module.exports = router;
