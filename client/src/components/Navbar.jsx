import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as="nav"
      bg={bg}
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex="sticky"
      shadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h={16} align="center" justify="space-between">
          {/* Brand */}
          <Heading
            as={RouterLink}
            to="/"
            size="md"
            bgGradient="linear(to-r, brand.400, purple.500)"
            bgClip="text"
            _hover={{ textDecoration: 'none' }}
          >
            Text-to-Learn
          </Heading>

          {/* Right side */}
          <HStack spacing={3}>
            {/* Theme toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />

            {isLoading ? null : isAuthenticated ? (
              /* User menu */
              <Menu>
                <MenuButton>
                  <HStack spacing={2} cursor="pointer">
                    <Avatar
                      size="sm"
                      name={user?.name}
                      src={user?.picture}
                    />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      display={{ base: 'none', md: 'block' }}
                    >
                      {user?.name}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/dashboard">
                    My Courses
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      logout({ logoutParams: { returnTo: window.location.origin } })
                    }
                    color="red.500"
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              /* Login button */
              <Button
                colorScheme="brand"
                size="sm"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
