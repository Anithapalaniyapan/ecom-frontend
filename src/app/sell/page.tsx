'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Chip,
  Paper,
} from '@mui/material';

type Category = {
  id: string;
  name: string;
  type: string;
};

export default function SellPage() {
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    stockQuantity: '',
    sku: '',
    sizes: '',
    colors: '',
    tags: '',
    brand: '',
    weight: '',
    categoryId: '',
  });
  const [images, setImages] = React.useState<File[]>([]);

  React.useEffect(() => {
    // Guard: only sellers can access
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'seller') {
        router.push('/');
        return;
      }
    } catch {
      router.push('/');
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/categories');
        const data = await res.json();
        setCategories(data || []);
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files.slice(0, 6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert('Please choose a category first');
      return;
    }
    if (!form.name || !form.price || !form.stockQuantity) {
      alert('Please fill required fields: name, price, stockQuantity');
      return;
    }
    if (images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in as a seller');
        return;
      }

      const fd = new FormData();
      fd.append('name', form.name);
      if (form.description) fd.append('description', form.description);
      fd.append('price', form.price);
      if (form.originalPrice) fd.append('originalPrice', form.originalPrice);
      fd.append('stockQuantity', form.stockQuantity);
      if (form.sku) fd.append('sku', form.sku);
      if (form.sizes) {
        form.sizes.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => fd.append('sizes[]', s));
      }
      if (form.colors) {
        form.colors.split(',').map((c) => c.trim()).filter(Boolean).forEach((c) => fd.append('colors[]', c));
      }
      if (form.tags) {
        form.tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => fd.append('tags[]', t));
      }
      if (form.brand) fd.append('brand', form.brand);
      if (form.weight) fd.append('weight', form.weight);
      fd.append('categoryId', form.categoryId);

      images.forEach((file) => fd.append('images', file));

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to create product');
      }

      setForm({
        name: '', description: '', price: '', originalPrice: '', stockQuantity: '', sku: '', sizes: '', colors: '', tags: '', brand: '', weight: '', categoryId: '',
      });
      setImages([]);
      alert('Product created successfully');
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Create Product</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* 1) Category first */}
              <Grid size={{ xs: 12 }}>
                <TextField select label="Category" name="categoryId" value={form.categoryId} onChange={(e: any) => {
                  handleChange(e as any);
                  const cat = categories.find(c => c.id === (e.target as HTMLInputElement).value) || null;
                  setSelectedCategory(cat);
                }} fullWidth required disabled={loading}>
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.name} ({c.type})</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* 2) Details shown after category selection */}
              {!selectedCategory ? (
                <Grid size={{ xs: 12 }}>
                  <Typography color="text.secondary">Choose a category to continue.</Typography>
                </Grid>
              ) : (
                <>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Original Price" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Stock Quantity" name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="SKU" name="sku" value={form.sku} onChange={handleChange} fullWidth />
                  </Grid>

                  {/* Category-specific fields */}
                  {selectedCategory?.type !== 'perfume' && (
                    <>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Sizes (comma separated)" name="sizes" value={form.sizes} onChange={handleChange} fullWidth />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Colors (comma separated)" name="colors" value={form.colors} onChange={handleChange} fullWidth />
                      </Grid>
                    </>
                  )}

                  {selectedCategory?.type === 'perfume' && (
                    <>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Volume (e.g., 100ml)" name="weight" value={form.weight} onChange={handleChange} fullWidth />
                      </Grid>
                    </>
                  )}

                  <Grid size={{ xs: 12 }}>
                    <TextField label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Brand" name="brand" value={form.brand} onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button variant="outlined" component="label">
                      Select Images (max 6)
                      <input hidden multiple accept="image/*" type="file" onChange={handleImages} />
                    </Button>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {images.map((f, idx) => (
                        <Chip key={idx} label={f.name} />
                      ))}
                    </Box>
                  </Grid>
                </>
              )}
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" disabled={submitting} sx={{ backgroundColor: '#9333ea' }}>
                  {submitting ? 'Submitting...' : 'Create Product'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}


