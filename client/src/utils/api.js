import axios from 'axios';

/**
 * Axios instance pre-configured with the API base URL.
 * In development, Vite's proxy forwards /api to the Express server.
 * In production, VITE_API_URL points to the deployed backend.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
