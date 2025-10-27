'use client';

import React from 'react';
import { Container, Box, Typography, Grid, Link, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#f9fafb', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Divider sx={{ mb: 6 }} />
        
        <Grid container spacing={4}>
          {/* Column 1 - Brand Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                <Image 
                  src="/logo/shopverse_logo.png" 
                  alt="ChicCart Logo" 
                  fill
                  style={{ objectFit: 'contain', borderRadius: '8px' }}
                />
              </Box>
              <Typography 
                variant="h5" 
                sx={{ fontWeight: 700, color: '#9333ea', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                  shopverse
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ color: '#6b7280', mb: 2, lineHeight: 1.7 }}
            >
              Your premier destination for elegant dresses, captivating perfumes, and trendy shoes.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="#" sx={{ color: '#6b7280', '&:hover': { color: '#1f2937' } }}>
                <FacebookIcon />
              </Link>
              <Link href="#" sx={{ color: '#6b7280', '&:hover': { color: '#1f2937' } }}>
                <TwitterIcon />
              </Link>
              <Link href="#" sx={{ color: '#6b7280', '&:hover': { color: '#1f2937' } }}>
                <InstagramIcon />
              </Link>
              <Link href="#" sx={{ color: '#6b7280', '&:hover': { color: '#1f2937' } }}>
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>

          {/* Column 2 - Product */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}
            >
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/products/dresses" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                Dresses
              </Link>
              <Link href="/products/perfumes" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                Perfumes
              </Link>
              <Link href="/products/shoes" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                Shoes
              </Link>
            </Box>
          </Grid>

          {/* Column 3 - Company */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                About Us
              </Link>
              <Link href="/contact" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Column 4 - Resources */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}
            >
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/blog" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                Blog
              </Link>
              <Link href="/faq" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#1f2937' } }}>
                FAQ
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

