'use client';

import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function LimitedTimeOffer() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          height: { xs: 300, md: 400 },
          background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
        }}
      >
        {/* Background Image with Overlay */}
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Image 
            src="/landing page img/lan img 5.png" 
            alt="Limited time offer"
            fill
            style={{ objectFit: 'cover', opacity: 0.3 }}
          />
        </Box>

        {/* Content */}
        <Box 
          sx={{ 
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: { xs: 3, md: 4 },
            zIndex: 1
          }}
        >
          <Typography 
            variant="h3" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              color: '#1f2937',
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.5rem' },
              lineHeight: { xs: 1.2, md: 1.3 }
            }}
          >
            Limited Time Offer: Up to 30% Off
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6b7280',
              mb: { xs: 3, md: 4 },
              maxWidth: { xs: '90%', sm: 500, md: 600 },
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              px: { xs: 2, md: 0 }
            }}
          >
            Refresh your wardrobe with our exclusive spring collection sale. Don't miss out!
          </Typography>
          <Button 
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', md: '1rem' },
              width: { xs: 'auto', md: 'auto' },
              '&:hover': {
                backgroundColor: '#f9fafb',
                borderColor: '#d1d5db'
              }
            }}
          >
            Explore Deals
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

