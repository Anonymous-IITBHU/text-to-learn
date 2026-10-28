require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const healthRoute = require('./routes/health');
const meRoute = require('./routes/me');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/health', healthRoute);
app.use('/api/me', meRoute);

// Catch-all for undefined routes
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler (must be last middleware)
app.use(errorHandler);

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `[server] Text-to-Learn API running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`
    );
  });
};

startServer();

module.exports = app; // exported for future testing
