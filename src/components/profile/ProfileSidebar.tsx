'use client';

import React, { useRef } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ProfileSection, UserProfile } from './types';

interface ProfileSidebarProps {
  user: UserProfile;
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
  onLogout?: () => void;
}

const menuItems = [
  { id: ProfileSection.PERSONAL_INFO, label: 'Personal Information', icon: PersonIcon },
  { id: ProfileSection.ORDER_HISTORY, label: 'Order History', icon: HistoryIcon },
  { id: ProfileSection.ACCOUNT_SETTINGS, label: 'Account Settings', icon: SettingsIcon },
];

export default function ProfileSidebar({ user, activeSection, onSectionChange, onLogout }: ProfileSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Helper function to construct full URL from backend path
  const getProfilePictureUrl = (path: string | null | undefined): string | undefined => {
    if (!path) return undefined;
    // If it's already a full URL or data URL, return as is
    if (path.startsWith('http') || path.startsWith('data:')) {
      return path;
    }
    // Construct full URL from backend path
    return `http://localhost:3000/uploads/${path}`;
  };

  const [profilePicture, setProfilePicture] = React.useState<string | null | undefined>(
    user.profilePicture || null
  );

  React.useEffect(() => {
    // Update profile picture from user prop when it changes
    setProfilePicture(user.profilePicture);
  }, [user.profilePicture]);

  React.useEffect(() => {
    // Update profile picture when custom event is triggered
    const handleProfilePictureUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setProfilePicture(customEvent.detail);
    };

    window.addEventListener('profilePictureUpdated', handleProfilePictureUpdate);
    return () => window.removeEventListener('profilePictureUpdated', handleProfilePictureUpdate);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log('Logging out...');
      // TODO: Implement actual logout logic
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only JPEG, JPG, and PNG images are allowed.');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You must be logged in to upload a profile picture');
          return;
        }

        // Create FormData for multipart/form-data upload
        const formData = new FormData();
        formData.append('file', file);

        // Upload to backend using the new endpoint
        const response = await fetch('http://localhost:3000/api/users/upload-profile-picture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const updatedUser = await response.json();
          const profilePicturePath = updatedUser.profilePicture;
          
          // Update local state with the new profile picture path
          setProfilePicture(profilePicturePath);

          // Update localStorage user data with the new profile picture path
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const userData = JSON.parse(userStr);
            userData.profilePicture = profilePicturePath;
            localStorage.setItem('user', JSON.stringify(userData));
          }

          // Dispatch event with the profile picture path
          window.dispatchEvent(new CustomEvent('profilePictureUpdated', { detail: profilePicturePath }));
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to upload profile picture. Please try again.');
        }
      } catch (error) {
        console.error('Failed to save profile picture:', error);
        alert('Failed to save profile picture. Please try again.');
      }
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: 'fit-content',
      }}
    >
      {/* User Info */}
      <Box sx={{ mb: 3, position: 'relative' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mx: 'auto', mb: 2, width: 96, height: 96 }}>
          <Avatar
            src={getProfilePictureUrl(profilePicture || user.profilePicture)}
            sx={{
              width: 96,
              height: 96,
              backgroundColor: '#9333ea',
              fontSize: '2rem',
              fontWeight: 600,
            }}
          >
            {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
          </Avatar>
          <Tooltip title="Change Photo">
            <IconButton
              onClick={handleImageClick}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#9333ea',
                color: 'white',
                width: 32,
                height: 32,
                border: '2px solid white',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
              }}
            >
              <CameraAltIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 0.5 }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {user.email}
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onSectionChange(item.id)}
                sx={{
                  backgroundColor: 'transparent',
                  color: isActive ? '#9333ea' : '#1f2937',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  py: 1.5,
                }}
              >
                <Icon sx={{ mr: 2, fontSize: 22, color: isActive ? '#9333ea' : '#6b7280' }} />
                <Typography
                  sx={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '1rem',
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Divider sx={{ my: 2 }} />
      <Button
        fullWidth
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{
          textTransform: 'none',
          color: '#ef4444',
          borderColor: '#ef4444',
          '&:hover': {
            borderColor: '#dc2626',
            backgroundColor: '#fef2f2',
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}

