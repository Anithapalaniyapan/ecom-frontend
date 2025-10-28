'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CardContent,
  Chip,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import VerifiedIcon from '@mui/icons-material/Verified';
import { UserProfile } from '../types';

interface SellerPersonalInfoProps {
  user: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export default function SellerPersonalInfo({ user, onUpdate }: SellerPersonalInfoProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    businessName: user.businessName || '',
    businessDescription: user.businessDescription || '',
    businessLicense: user.businessLicense || '',
    taxId: user.taxId || '',
    address: user.address || '',
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(
    localStorage.getItem('profilePicture') || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        setProfilePicture(imageUrl);
        
        try {
          // Store in localStorage immediately for UI
          localStorage.setItem('profilePicture', imageUrl);
          
          // Update on backend
          const token = localStorage.getItem('token');
          if (token) {
            const response = await fetch('http://localhost:3000/api/users/profile', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ profilePicture: imageUrl }),
            });

            if (response.ok) {
              // Update localStorage user data
              const userStr = localStorage.getItem('user');
              if (userStr) {
                const userData = JSON.parse(userStr);
                userData.profilePicture = imageUrl;
                localStorage.setItem('user', JSON.stringify(userData));
              }
              
              // Trigger a custom event to update the header
              window.dispatchEvent(new CustomEvent('profilePictureUpdated', { detail: imageUrl }));
            }
          }
        } catch (error) {
          console.error('Failed to save profile picture:', error);
          alert('Failed to save profile picture. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box 
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        p: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              mb: 0.5,
            }}
          >
            Seller Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your personal and business details.
          </Typography>
        </Box>
        {user.isVerifiedSeller && (
          <Chip
            icon={<VerifiedIcon />}
            label="Verified Seller"
            sx={{
              backgroundColor: '#fef3c7',
              color: '#92400e',
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>

          {/* Business Information */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Business Description"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Business License"
              name="businessLicense"
              value={formData.businessLicense}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Tax ID"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#9333ea',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#7c3aed',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

