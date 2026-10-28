const { auth } = require('express-oauth2-jwt-bearer');

/**
 * Auth0 JWT validation middleware.
 *
 * Validates the Bearer token in the Authorization header against the
 * configured Auth0 tenant. Attaches decoded token payload to `req.auth`.
 *
 * Required env vars: AUTH0_ISSUER, AUTH0_AUDIENCE
 */
const checkJwt = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: 'RS256',
});

module.exports = checkJwt;
