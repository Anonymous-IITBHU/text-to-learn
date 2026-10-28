import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Code,
  useColorModeValue,
} from '@chakra-ui/react';
import api from '../utils/api';

/**
 * Dashboard — authenticated landing page.
 * Shows the user's profile info and verifies the backend /api/me route.
 * This will become the "My Courses" page in Phase 4.
 */
function Dashboard() {
  const { user } = useAuth0();
  const [backendUser, setBackendUser] = useState(null);
  const bgCard = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    api
      .get('/api/me')
      .then((res) => setBackendUser(res.data.user))
      .catch((err) => console.error('Backend /api/me error:', err));
  }, []);

  return (
    <Box py={10}>
      <Container maxW="container.md">
        <VStack spacing={6} align="stretch">
          <Heading size="lg">Welcome, {user?.name || 'learner'}!</Heading>
          <Text color="gray.500">
            Your courses will appear here. Try generating one!
          </Text>

          {/* Auth verification card */}
          <Box bg={bgCard} p={6} rounded="xl" shadow="md">
            <Heading size="sm" mb={3}>
              Auth Verification
            </Heading>
            <VStack align="start" spacing={2}>
              <Text>
                <strong>Auth0 ID:</strong> <Code>{user?.sub}</Code>
              </Text>
              <Text>
                <strong>Email:</strong> {user?.email || 'not provided'}
              </Text>
              {backendUser && (
                <Text color="green.500" fontWeight="medium">
                  ✅ Backend token validation working
                </Text>
              )}
              {!backendUser && (
                <Text color="yellow.500" fontSize="sm">
                  ⏳ Backend /api/me not yet responding (ensure Auth0 env vars
                  are set on the server)
                </Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Dashboard;
