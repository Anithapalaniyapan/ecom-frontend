'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginDialog({ open, onClose, onSwitchToRegister }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Trigger storage event to update header
        window.dispatchEvent(new Event('storage'));
        
        onClose();
        // Reset form
        setEmail('');
        setPassword('');
        setError('');
        // Redirect to profile page
        window.location.href = '/profile';
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }
      }}
    >
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        borderRadius: '16px 16px 0 0',
        p: 0
      }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 800, color: '#1f2937', mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '1rem' }}>
            Sign in to your account
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#6b7280' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              sx={{ fontWeight: 600, color: '#9333ea', fontSize: '0.9rem' }}
            >
              Register here
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button 
            onClick={onClose} 
            sx={{ 
              textTransform: 'none',
              flex: 1,
              py: 1.5,
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderColor: '#d1d5db'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
              textTransform: 'none',
              flex: 1,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)',
                boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

