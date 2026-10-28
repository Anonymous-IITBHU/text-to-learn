import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import useAuthAxios from './hooks/useAuthAxios';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  // Attach Auth0 token to all outgoing API requests
  useAuthAxios();

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
