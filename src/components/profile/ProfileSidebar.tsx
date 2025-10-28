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
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    localStorage.getItem('profilePicture') || user.profilePicture || null
  );

  React.useEffect(() => {
    // Update profile picture from localStorage when it changes
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
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        setProfilePicture(imageUrl);
        
        try {
          localStorage.setItem('profilePicture', imageUrl);
          
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
              const userStr = localStorage.getItem('user');
              if (userStr) {
                const userData = JSON.parse(userStr);
                userData.profilePicture = imageUrl;
                localStorage.setItem('user', JSON.stringify(userData));
              }
              
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
            src={profilePicture || user.profilePicture || undefined}
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

