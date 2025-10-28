'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

export default function AccountSettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    promotionalEmails: true,
    smsNotifications: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [name]: e.target.checked,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update
    console.log('Password update:', passwordData);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  return (
    <>
      {/* Change Password */}
      <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Account Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your password, notifications, and privacy.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)',
                    },
                  }}
                >
                  Update Password
                </Button>
              </Box>
            </form>
          </Box>

          {/* Notification Preferences */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.promotionalEmails}
                  onChange={handlePreferenceChange('promotionalEmails')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#9333ea',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#9333ea',
                    },
                  }}
                />
              }
              label="Receive promotional emails"
              sx={{ display: 'block', mb: 1 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.smsNotifications}
                  onChange={handlePreferenceChange('smsNotifications')}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#9333ea',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#9333ea',
                    },
                  }}
                />
              }
              label="SMS Notifications"
              sx={{ display: 'block' }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Delete Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Permanently delete your account and all associated data.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleDeleteAccount}
              sx={{
                backgroundColor: '#ef4444',
                textTransform: 'none',
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#dc2626',
                },
              }}
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

