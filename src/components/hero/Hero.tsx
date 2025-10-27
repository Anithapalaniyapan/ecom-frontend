'use client';

import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import Image from 'next/image';

export default function Hero() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center" sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        {/* Left Side - Text Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{ 
                fontWeight: 800,
                color: '#1f2937',
                mb: 3,
                fontSize: { xs: '1.875rem', sm: '2.5rem', md: '3.5rem' }
              }}
            >
              Discover Your Signature Style
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#6b7280',
                mb: 4,
                lineHeight: 1.7,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
              }}
            >
              Explore our curated collections of elegant dresses, captivating perfumes, and trendy shoes. Your perfect look awaits.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                px: { xs: 3, md: 4 },
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', md: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #653585 100%)',
                }
              }}
            >
              Shop All Products
            </Button>
          </Box>
        </Grid>

        {/* Right Side - Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              height: { xs: '300px', sm: '400px', md: '500px' },
              borderRadius: { xs: 2, md: 4 },
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
            }}
          >
            <Image 
              src="/landing page img/lan img 1.png" 
              alt="Woman in elegant dress with perfume"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

