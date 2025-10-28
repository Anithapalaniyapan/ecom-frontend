'use client';

import React, { useState } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

type Step = 1 | 2 | 3;

export default function RegisterDialog({ open, onClose, onSwitchToLogin }: RegisterDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'customer',
    businessName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError('');
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('Please enter both first and last name');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      setError('');
    }
  };

  const handleRegister = async () => {
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Validate business name for sellers
    if (formData.role === 'seller' && !formData.businessName.trim()) {
      setError('Business name is required for sellers');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          ...(formData.role === 'seller' && { businessName: formData.businessName })
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Trigger storage event to update header
        window.dispatchEvent(new Event('storage'));
        
        onClose();
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          role: 'customer',
          businessName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        });
        setCurrentStep(1);
        setError('');
        
        // Redirect to profile page
        window.location.href = '/profile';
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1f2937' }}>
              Enter Your Full Name
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
              Please provide your full name to personalize your experience.
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <TextField
                label="First Name"
                fullWidth
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <PersonIcon sx={{ color: '#6b7280' }} />
                    </Box>
                  ),
                }}
              />
              <TextField
                label="Last Name"
                fullWidth
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    }
                  }
                }}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1f2937' }}>
              What Brings You Here?
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
              Select how you want to use shopverse
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: formData.role === 'customer' ? '#9333ea' : '#e5e7eb',
                  backgroundColor: formData.role === 'customer' ? 'rgba(147, 51, 234, 0.05)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    borderColor: '#9333ea',
                  }
                }}
              >
                <Radio 
                  checked={formData.role === 'customer'}
                  sx={{ 
                    color: '#9333ea',
                    '&.Mui-checked': {
                      color: '#9333ea'
                    }
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: '#1f2937', fontSize: '1.1rem' }}>
                    🛍️ I want to Shop
                  </Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: '0.9rem', mt: 0.5 }}>
                    Browse and purchase products
                  </Typography>
                </Box>
              </Box>
              
              <Box
                onClick={() => setFormData({ ...formData, role: 'seller' })}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: formData.role === 'seller' ? '#9333ea' : '#e5e7eb',
                  backgroundColor: formData.role === 'seller' ? 'rgba(147, 51, 234, 0.05)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    borderColor: '#9333ea',
                  }
                }}
              >
                <Radio 
                  checked={formData.role === 'seller'}
                  sx={{ 
                    color: '#9333ea',
                    '&.Mui-checked': {
                      color: '#9333ea'
                    }
                  }} 
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: '#1f2937', fontSize: '1.1rem' }}>
                    💼 I want to Sell
                  </Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: '0.9rem', mt: 0.5 }}>
                    List and sell your products
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1f2937' }}>
              Complete Your Profile
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
              Add your contact details and create a password
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {formData.role === 'seller' && (
                <TextField
                  label="Business Name"
                  fullWidth
                  value={formData.businessName}
                  onChange={handleChange('businessName')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1 }}>
                        <BusinessIcon sx={{ color: '#6b7280' }} />
                      </Box>
                    ),
                  }}
                />
              )}
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              />
              <TextField
                label="Phone"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={formData.password}
                onChange={handleChange('password')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: '#6b7280' }}
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        );

      default:
        return null;
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
          background: 'white',
          borderRadius: 3,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }
      }}
    >
      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        {renderStep()}
        
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          {currentStep > 1 && (
            <Button 
              onClick={handleBack} 
              sx={{ 
                textTransform: 'none',
                flex: 1,
                py: 1.5,
                border: '1px solid #e5e7eb',
                color: '#6b7280',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  borderColor: '#d1d5db'
                }
              }}
            >
              ← Back
            </Button>
          )}
          <Button
            onClick={currentStep === 3 ? handleRegister : handleNext}
            variant="contained"
            sx={{
              textTransform: 'none',
              flex: 1,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
              ml: currentStep === 1 ? 'auto' : 0,
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)',
                boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            {currentStep === 3 ? 'Create Account' : 'Next →'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
