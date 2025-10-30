'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  createdAt: string;
};

export default function MyProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const toImageUrl = (p: Product) => (p.images && p.images[0]) ? `http://localhost:3000/uploads/${p.images[0]}` : undefined;

  const load = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('http://localhost:3000/api/products/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data || []);
    } catch (e) {
      console.error('Failed to load my products', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/products/${id}` , {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to delete');
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Delete ALL your products?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/products/my', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to delete all');
      }
      setProducts([]);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>My Products</Typography>
        {products.length > 0 && (
          <Button color="error" variant="outlined" onClick={handleDeleteAll}>Delete All</Button>
        )}
      </Box>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              {toImageUrl(p) && (
                <CardMedia component="img" src={toImageUrl(p)} alt={p.name} sx={{ height: 180, objectFit: 'cover' }} />
              )}
              <CardContent>
                <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                <Typography color="text.secondary">${Number(p.price).toFixed(2)}</Typography>
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => handleDelete(p.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {products.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>No products yet.</Typography>
      )}
    </Box>
  );
}


