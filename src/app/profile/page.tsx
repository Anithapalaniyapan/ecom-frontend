'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ProfileSidebar,
  PersonalInfo,
  SellerPersonalInfo,
  OrderHistory,
  AccountSettings,
  ProfileSection,
  UserProfile,
  Order,
} from '@/components/profile';
import MyProducts from '@/components/profile/seller/MyProducts';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mockOrders: Order[] = [
  {
    id: '1',
    orderId: 'FH78901',
    date: '2024-07-20',
    total: 120.00,
    status: 'delivered',
    items: [],
  },
  {
    id: '2',
    orderId: 'FH67890',
    date: '2024-07-15',
    total: 85.50,
    status: 'processing',
    items: [],
  },
  {
    id: '3',
    orderId: 'FH56789',
    date: '2024-07-10',
    total: 250.00,
    status: 'delivered',
    items: [],
  },
  {
    id: '4',
    orderId: 'FH45678',
    date: '2024-07-05',
    total: 45.00,
    status: 'cancelled',
    items: [],
  },
  {
    id: '5',
    orderId: 'FH34567',
    date: '2024-06-28',
    total: 199.99,
    status: 'delivered',
    items: [],
  },
];

export default function ProfilePage() {
  const router = useRouter();
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ProfileSection>(
    ProfileSection.PERSONAL_INFO
  );

  // Load user data from backend API
  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Not authenticated, redirect to landing page
        router.push('/');
        return;
      }

      try {
        // Fetch fresh user data from backend
        const response = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Convert backend user format to UserProfile format
        const userProfile: UserProfile = {
          id: userData.id || '',
          email: userData.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          role: userData.role || 'customer',
          isActive: userData.isActive ?? true,
          emailVerified: userData.emailVerified ?? false,
          profilePicture: userData.profilePicture || undefined,
          businessName: userData.businessName,
          businessDescription: userData.businessDescription,
          businessLicense: userData.businessLicense,
          taxId: userData.taxId,
          isVerifiedSeller: userData.isVerifiedSeller,
        };
        
        setUser(userProfile);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to localStorage if API fails
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            const userProfile: UserProfile = {
              id: userData.id || '',
              email: userData.email || '',
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              phoneNumber: userData.phoneNumber || '',
              address: userData.address || '',
              role: userData.role || 'customer',
              isActive: userData.isActive ?? true,
              emailVerified: userData.emailVerified ?? false,
              profilePicture: userData.profilePicture || undefined,
              businessName: userData.businessName,
              businessDescription: userData.businessDescription,
              businessLicense: userData.businessLicense,
              taxId: userData.taxId,
              isVerifiedSeller: userData.isVerifiedSeller,
            };
            setUser(userProfile);
          } catch (e) {
            router.push('/');
          }
        } else {
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    // Listen for profile picture updates
    const handleProfilePictureUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (user) {
        const newProfilePicture = customEvent.detail;
        setUser({ ...user, profilePicture: newProfilePicture });
        
        // Also update localStorage user data
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userData = JSON.parse(userStr);
          userData.profilePicture = newProfilePicture;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    };

    window.addEventListener('profilePictureUpdated', handleProfilePictureUpdate);
    return () => window.removeEventListener('profilePictureUpdated', handleProfilePictureUpdate);
  }, [router]);

  const handleUserUpdate = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    // TODO: Implement actual API call to update user data
    console.log('Updating user:', data);
    
    // Remove profilePicture from data to avoid quota issues
    const { profilePicture, ...userDataWithoutImage } = data;
    
    // Update local state
    const updatedUser = { ...user, ...userDataWithoutImage };
    setUser(updatedUser);
    
    // Update localStorage (without profile picture)
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        const updatedUserData = { ...userData, ...userDataWithoutImage };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
  };

  const handleSectionChange = (section: ProfileSection) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log('Logging out...');
    // Clear auth tokens, localStorage, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to home/landing page
    router.push('/');
  };

  const handleBackToHome = () => {
    router.push('/home');
  };

  const renderActiveSection = () => {
    if (!user) return null;

    switch (activeSection) {
      case ProfileSection.PERSONAL_INFO:
        // Render different components based on user role
        if (user.role === 'seller') {
          return <SellerPersonalInfo user={user} onUpdate={handleUserUpdate} />;
        }
        return <PersonalInfo user={user} onUpdate={handleUserUpdate} />;

      case ProfileSection.ORDER_HISTORY:
        return <OrderHistory orders={mockOrders} />;

      case ProfileSection.ACCOUNT_SETTINGS:
        return <AccountSettings />;

      case ProfileSection.MY_PRODUCTS:
        return user.role === 'seller' ? <MyProducts /> : null;

      default:
        return <PersonalInfo user={user} onUpdate={handleUserUpdate} />;
    }
  };

  // Show loading state or redirect if not authenticated
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </Box>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Back Button */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Back to Home">
              <IconButton
                onClick={handleBackToHome}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                    borderColor: '#9333ea',
                  },
                }}
              >
                <ArrowBackIcon sx={{ color: '#1f2937' }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Sidebar */}
            <Box sx={{ width: { xs: '100%', lg: 300 }, flexShrink: 0 }}>
              <ProfileSidebar
                user={user}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                onLogout={handleLogout}
              />
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, width: { xs: '100%', lg: 'auto' } }}>
              {renderActiveSection()}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

