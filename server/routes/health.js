const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/**
 * GET /api/health
 * Returns server status and MongoDB connection state.
 */
router.get('/', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus[dbState] || 'unknown',
  });
});

module.exports = router;
