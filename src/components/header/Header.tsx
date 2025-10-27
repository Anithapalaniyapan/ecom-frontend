'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import LoginDialog from '../auth/LoginDialog';
import RegisterDialog from '../auth/RegisterDialog';

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  const handleSwitchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, flexWrap: 'wrap', gap: 2 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Text Logo */}
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: '#9333ea',
                  letterSpacing: '0.5px',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
              >
                shopverse
              </Typography>
            </Box>

            {/* Navigation - Hidden on mobile */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 4,
              flex: 1,
              justifyContent: 'center'
            }}>
              <Button sx={{ color: '#1f2937', textTransform: 'none', fontWeight: 600 }}>
                Home
              </Button>
              <Button sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 400 }}>
                Dresses
              </Button>
              <Button sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 400 }}>
                Perfumes
              </Button>
              <Button sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 400 }}>
                Shoes
              </Button>
            </Box>

            {/* Icons and Auth Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexWrap: 'nowrap' }}>
              <IconButton sx={{ color: '#1f2937', display: { xs: 'none', sm: 'flex' } }}>
                <SearchIcon />
              </IconButton>
              <IconButton sx={{ color: '#1f2937' }} onClick={handleLoginOpen}>
                <PersonIcon />
              </IconButton>
              <IconButton sx={{ color: '#1f2937' }}>
                <ShoppingCartIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 1 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleLoginOpen}
                  sx={{ 
                    textTransform: 'none',
                    borderColor: '#d1d5db',
                    color: '#1f2937',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb'
                    },
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    px: { xs: 1, md: 2 }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleRegisterOpen}
                  sx={{ 
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)'
                    },
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    px: { xs: 1, md: 2 }
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <LoginDialog 
        open={loginOpen} 
        onClose={handleLoginClose}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterDialog 
        open={registerOpen} 
        onClose={handleRegisterClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}

