const express = require('express');
const checkJwt = require('../middlewares/auth');

const router = express.Router();

/**
 * GET /api/me
 * Protected route — returns the authenticated user's token claims.
 * Requires a valid Auth0 Bearer token.
 */
router.get('/', checkJwt, (req, res) => {
  res.json({
    success: true,
    user: {
      sub: req.auth.payload.sub,
      // Additional claims (email, name) come from the ID token on the frontend.
      // The access token carries only `sub` and custom claims by default.
      ...req.auth.payload,
    },
  });
});

module.exports = router;
