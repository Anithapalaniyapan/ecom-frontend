'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginDialog from '../auth/LoginDialog';
import RegisterDialog from '../auth/RegisterDialog';

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  
  // Check authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{firstName: string; lastName: string; email: string; profilePicture?: string} | null>(null);

  // Check auth state on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        // Profile picture is already in user data from backend
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    }
  }, []);

  // Listen for storage changes (logout from another tab)
  React.useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for profile picture updates
  React.useEffect(() => {
    const handleProfilePictureUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const profilePicture = customEvent.detail;
      if (currentUser) {
        setCurrentUser({ 
          ...currentUser, 
          profilePicture: profilePicture 
        } as typeof currentUser & { profilePicture?: string });
      }
      // Also update localStorage user data
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          userData.profilePicture = profilePicture;
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    };

    window.addEventListener('profilePictureUpdated', handleProfilePictureUpdate);
    return () => window.removeEventListener('profilePictureUpdated', handleProfilePictureUpdate);
  }, [currentUser]);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);
  
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      setLoginOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToProfile = () => {
    router.push('/profile');
    handleMenuClose();
  };

  const handleLogout = () => {
    // Clear auth tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    handleMenuClose();
    // Redirect to landing page
    router.push('/');
  };

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
              <IconButton sx={{ color: '#1f2937' }}>
                <ShoppingCartIcon />
              </IconButton>
              
              {isAuthenticated && currentUser ? (
                <>
                  <IconButton 
                    onClick={handleProfileClick}
                    sx={{ 
                      p: 0,
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                  >
                    <Avatar
                      src={
                        (currentUser as any)?.profilePicture 
                          ? (currentUser as any).profilePicture.startsWith('http') || (currentUser as any).profilePicture.startsWith('data:')
                            ? (currentUser as any).profilePicture
                            : `http://localhost:3000/uploads/${(currentUser as any).profilePicture}`
                          : undefined
                      }
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#9333ea',
                        cursor: 'pointer',
                        border: '2px solid #e5e7eb',
                        '&:hover': {
                          border: '2px solid #9333ea'
                        }
                      }}
                    >
                      {currentUser.firstName?.[0]?.toUpperCase()}{currentUser.lastName?.[0]?.toUpperCase()}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        mt: 1,
                        minWidth: 200,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {currentUser?.firstName} {currentUser?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {currentUser?.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleNavigateToProfile} sx={{ py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: '#9333ea', fontSize: '0.875rem' }}>
                          {currentUser?.firstName?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography>My Profile</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                      <LogoutIcon sx={{ mr: 1, fontSize: 20, color: '#ef4444' }} />
                      <Typography sx={{ color: '#ef4444' }}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
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
              )}
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

