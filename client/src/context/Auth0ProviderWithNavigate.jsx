import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

/**
 * Wraps the Auth0Provider with React Router's navigate so that
 * the redirect callback after login uses client-side routing.
 */
function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.warn('[Auth0] VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID must be set');
    return <>{children}</>;
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(audience && { audience }),
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
