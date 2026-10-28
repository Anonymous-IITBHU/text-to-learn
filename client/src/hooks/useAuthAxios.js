import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../utils/api';

/**
 * useAuthAxios — sets up an Axios request interceptor that attaches
 * the Auth0 access token as a Bearer header on every API call.
 *
 * Call this once at the app root (e.g. in App.jsx).
 */
function useAuthAxios() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          config.headers.Authorization = `Bearer ${token}`;
        } catch {
          // Silently continue — the request proceeds unauthenticated.
          // Protected backend routes will return 401.
        }
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getAccessTokenSilently, isAuthenticated]);
}

export default useAuthAxios;
