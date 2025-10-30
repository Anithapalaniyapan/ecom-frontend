'use client';

import React from 'react';
import { Container, Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

type Category = { id: string; name: string };
type Product = { id: string; name: string; price: number; images?: string[] };

export default function PerfumePage() {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const resCat = await fetch('http://localhost:3000/api/categories/type/perfume');
        const cats: Category[] = await resCat.json();
        const all: Product[] = [];
        for (const c of cats) {
          const res = await fetch(`http://localhost:3000/api/products/category/${c.id}`);
          const prods: Product[] = await res.json();
          all.push(...prods);
        }
        setProducts(all);
      } catch (e) {
        console.error('Failed to load perfume products', e);
      }
    })();
  }, []);

  const toImageUrl = (p: Product) => (p.images && p.images[0]) ? `http://localhost:3000/uploads/${p.images[0]}` : undefined;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Perfumes</Typography>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                {toImageUrl(p) && (
                  <CardMedia component="img" src={toImageUrl(p)} alt={p.name} sx={{ height: 220, objectFit: 'cover' }} />
                )}
                <CardContent>
                  <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                  <Typography color="text.secondary">${Number(p.price).toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}


