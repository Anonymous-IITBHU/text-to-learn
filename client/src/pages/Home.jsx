import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  IconButton,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import api from '../utils/api';

function Home() {
  const [health, setHealth] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgCard = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    api
      .get('/api/health')
      .then((res) => setHealth(res.data))
      .catch(() => setHealth({ status: 'unreachable', database: 'unknown' }));
  }, []);

  return (
    <Box minH="100vh" py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          {/* Theme toggle */}
          <HStack w="full" justify="flex-end">
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
            />
          </HStack>

          {/* Hero */}
          <Heading as="h1" size="2xl" bgGradient="linear(to-r, brand.400, purple.500)" bgClip="text">
            Text-to-Learn
          </Heading>
          <Text fontSize="xl" color="gray.500">
            AI-Powered Course Generator — enter a topic, get a complete structured course.
          </Text>

          {/* Backend health indicator */}
          <Box bg={bgCard} p={6} rounded="xl" shadow="md" w="full">
            <Heading size="md" mb={3}>
              System Status
            </Heading>
            {health ? (
              <VStack spacing={2}>
                <HStack>
                  <Text fontWeight="medium">Server:</Text>
                  <Badge colorScheme={health.status === 'ok' ? 'green' : 'red'}>
                    {health.status}
                  </Badge>
                </HStack>
                <HStack>
                  <Text fontWeight="medium">Database:</Text>
                  <Badge colorScheme={health.database === 'connected' ? 'green' : 'yellow'}>
                    {health.database}
                  </Badge>
                </HStack>
              </VStack>
            ) : (
              <Text color="gray.400">Checking backend...</Text>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;
