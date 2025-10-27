'use client';

import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Link } from '@mui/material';
// @ts-ignore - Grid component type definitions issue in MUI v7
import Image from 'next/image';

const categories = [
  {
    title: 'Elegant Dresses',
    image: '/landing page img/lan img 2.jpeg',
    link: '/products/dresses'
  },
  {
    title: 'Captivating Perfumes',
    image: '/landing page img/lan img 3.jpeg',
    link: '/products/perfumes'
  },
  {
    title: 'Trendy Shoes',
    image: '/landing page img/lan img 4.jpeg',
    link: '/products/shoes'
  }
];

export default function FeaturedCategories() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h3" 
        component="h2"
        sx={{ 
          fontWeight: 700,
          color: '#1f2937',
          mb: { xs: 4, md: 6 },
          textAlign: 'center',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
        }}
      >
        Featured Categories
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((category, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: { xs: 2, md: 3 },
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                }
              }}
            >
              <Box sx={{ position: 'relative', height: { xs: 250, sm: 280, md: 300 }, flexShrink: 0 }}>
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#1f2937',
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                  }}
                >
                  {category.title}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Link 
                    href={category.link}
                    sx={{ 
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      '&:hover': {
                        color: '#5568d3'
                      }
                    }}
                  >
                    Shop Now →
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

