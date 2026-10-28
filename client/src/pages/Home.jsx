import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Home() {
  const [health, setHealth] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const bgCard = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    api
      .get('/api/health')
      .then((res) => setHealth(res.data))
      .catch(() => setHealth({ status: 'unreachable', database: 'unknown' }));
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginWithRedirect({ appState: { returnTo: '/dashboard' } });
    }
  };

  return (
    <Box minH="calc(100vh - 64px)" py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          {/* Hero */}
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brand.400, purple.500)"
            bgClip="text"
          >
            Text-to-Learn
          </Heading>
          <Text fontSize="xl" color="gray.500" maxW="lg">
            AI-Powered Course Generator — enter a topic, get a complete
            structured course with lessons, quizzes, videos, and more.
          </Text>

          {/* CTA */}
          <Button
            colorScheme="brand"
            size="lg"
            px={10}
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>

          {/* Backend health indicator */}
          <Box bg={bgCard} p={6} rounded="xl" shadow="md" w="full" maxW="sm">
            <Heading size="sm" mb={3}>
              System Status
            </Heading>
            {health ? (
              <VStack spacing={2}>
                <HStack>
                  <Text fontWeight="medium" fontSize="sm">
                    Server:
                  </Text>
                  <Badge
                    colorScheme={health.status === 'ok' ? 'green' : 'red'}
                  >
                    {health.status}
                  </Badge>
                </HStack>
                <HStack>
                  <Text fontWeight="medium" fontSize="sm">
                    Database:
                  </Text>
                  <Badge
                    colorScheme={
                      health.database === 'connected' ? 'green' : 'yellow'
                    }
                  >
                    {health.database}
                  </Badge>
                </HStack>
              </VStack>
            ) : (
              <Text color="gray.400" fontSize="sm">
                Checking backend...
              </Text>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;
