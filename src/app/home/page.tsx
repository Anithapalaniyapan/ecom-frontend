'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 8, px: 2 }}>
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              color: '#1f2937', 
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Welcome to shopverse!
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#9333ea', 
              mb: 2,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Hello, {mounted && user ? (user.firstName || user.name || 'User') : 'User'}! 👋
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6b7280', 
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Your premium destination for fashion, style, and elegance.
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#f9fafb', 
              borderRadius: 3,
              textAlign: 'center',
              border: '2px solid #e5e7eb'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#9333ea', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Orders
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#f9fafb', 
              borderRadius: 3,
              textAlign: 'center',
              border: '2px solid #e5e7eb'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#9333ea', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Cart Items
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#f9fafb', 
              borderRadius: 3,
              textAlign: 'center',
              border: '2px solid #e5e7eb'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#9333ea', mb: 1 }}>
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Wishlist
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              p: 3, 
              backgroundColor: '#f9fafb', 
              borderRadius: 3,
              textAlign: 'center',
              border: '2px solid #e5e7eb'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#9333ea', mb: 1 }}>
                {mounted && user && user.role === 'seller' ? 'Vendor' : 'Customer'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Your Role
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Action Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 3,
              border: '1px solid rgba(147, 51, 234, 0.2)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
                🛍️ Start Shopping
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, flexGrow: 1 }}>
                Explore our curated collection of elegant dresses, captivating perfumes, and trendy shoes.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)',
                  }
                }}
              >
                Browse Products
              </Button>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
              borderRadius: 3,
              border: '1px solid rgba(147, 51, 234, 0.2)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
                {mounted && user && user.role === 'seller' ? '📦 Manage Your Store' : '💝 Your Wishlist'}
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 3, flexGrow: 1 }}>
                {mounted && user && user.role === 'seller'
                  ? 'List products, manage inventory, and grow your business with shopverse.'
                  : 'Save your favorite items for later and never miss out on deals.'
                }
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  py: 1.5,
                  borderColor: '#9333ea',
                  color: '#9333ea',
                  '&:hover': {
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(147, 51, 234, 0.05)'
                  }
                }}
              >
                {mounted && user && user.role === 'seller' ? 'Seller Dashboard' : 'View Wishlist'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mb: 3 }}>
            Recent Activity
          </Typography>
          <Box sx={{
            p: 4,
            backgroundColor: '#f9fafb',
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <Typography variant="body1" sx={{ color: '#6b7280' }}>
              You haven't made any purchases yet. Start exploring our amazing products!
            </Typography>
          </Box>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

