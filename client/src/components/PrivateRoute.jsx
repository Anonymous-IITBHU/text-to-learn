import { useAuth0 } from '@auth0/auth0-react';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

/**
 * PrivateRoute — wraps protected page content.
 * Redirects unauthenticated users to Auth0 login.
 * Shows a loading spinner while authentication state is being determined.
 */
function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Center minH="60vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text color="gray.500">Checking authentication...</Text>
        </VStack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    return (
      <Center minH="60vh">
        <Text color="gray.500">Redirecting to login...</Text>
      </Center>
    );
  }

  return children;
}

export default PrivateRoute;
