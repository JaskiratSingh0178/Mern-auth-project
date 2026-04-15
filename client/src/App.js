import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* Navigation Bar - Provides consistent UI across all 3 experiments */}
      <AppBar position="static" sx={{ mb: 4, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            MERN Auth System
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Routes>
          {/* Experiment 1: Secure Login Form */}
          <Route path="/" element={<Login />} />
          
          {/* Experiment 3: Registration with Role Selection */}
          <Route path="/register" element={<Register />} />
          
          {/* Experiment 2 & 3: Protected Route with Role-Based Access Control */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;