'use client';

import React from 'react';
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Divider,
  Stack,
  Badge
} from '@mui/material';
import { Grid } from '@mui/material';

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
  isFeatured?: boolean;
  sizes?: string[];
  colors?: string[];
  createdAt?: string;
};

const formatImage = (p: Product) => (p.images && p.images[0]) ? `http://localhost:3000/uploads/${p.images[0]}` : undefined;

const PAGE_SIZE = 9;

export default function DressPage() {
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [filtered, setFiltered] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<'featured' | 'priceAsc' | 'priceDesc' | 'newest'>('featured');
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);

  React.useEffect(() => {
    (async () => {
      try {
        const resCat = await fetch('http://localhost:3000/api/categories/type/dress');
        const cats: Category[] = await resCat.json();
        const all: Product[] = [];
        for (const c of cats) {
          const res = await fetch(`http://localhost:3000/api/products/category/${c.id}`);
          const prods: Product[] = await res.json();
          all.push(...prods);
        }
        setAllProducts(all);
      } catch (e) {
        console.error('Failed to load dress products', e);
      }
    })();
  }, []);

  React.useEffect(() => {
    let items = [...allProducts];
    // price
    items = items.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]);
    // sizes
    if (sizes.length) {
      items = items.filter(p => {
        const ps = (p.sizes || []) as string[];
        return sizes.some(s => ps.map(x => x.toLowerCase()).includes(s.toLowerCase()));
      });
    }
    // colors
    if (colors.length) {
      items = items.filter(p => {
        const pc = (p.colors || []) as string[];
        return colors.some(c => pc.map(x => x.toLowerCase()).includes(c.toLowerCase()));
      });
    }
    // sort
    if (sortBy === 'featured') {
      items.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    } else if (sortBy === 'priceAsc') {
      items.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'priceDesc') {
      items.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'newest') {
      items.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
    setFiltered(items);
    setPage(1);
  }, [allProducts, sizes, colors, priceRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    if (arr.includes(value)) setArr(arr.filter(v => v !== value));
    else setArr([...arr, value]);
  };

  const ColorDot = ({ value, hex }: { value: string; hex: string }) => (
    <Box
      onClick={() => toggleArr(colors, setColors, value)}
      sx={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        backgroundColor: hex,
        border: colors.includes(value) ? '2px solid #111827' : '2px solid #e5e7eb',
        cursor: 'pointer'
      }}
    />
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container columnSpacing={{ xs: 2, md: 3 }} rowSpacing={{ xs: 2, md: 0 }}>
          {/* Filters */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Box sx={{
              p: 2,
              width: { xs: '100%', md: 260 },
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 2,
              position: { md: 'sticky' },
              top: { md: 88 },
            }}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>Filters</Typography>

              {/* Size */}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Size</Typography>
              <FormGroup>
                {['XS','S','M','L','XL'].map(s => (
                  <FormControlLabel key={s} control={<Checkbox size="small" checked={sizes.includes(s)} onChange={() => toggleArr(sizes, setSizes, s)} />} label={s} />
                ))}
              </FormGroup>

              <Divider sx={{ my: 2 }} />

              {/* Color */}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Color</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <ColorDot value="black" hex="#111827" />
                <ColorDot value="red" hex="#ef4444" />
                <ColorDot value="blue" hex="#3b82f6" />
                <ColorDot value="green" hex="#10b981" />
                <ColorDot value="yellow" hex="#f59e0b" />
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Price */}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Price Range</Typography>
              <Slider
                value={priceRange}
                min={0}
                max={1000}
                onChange={(_, v) => setPriceRange(v as number[])}
                valueLabelDisplay="auto"
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption">${priceRange[0]}</Typography>
                <Typography variant="caption">${priceRange[1]}</Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Products */}
          <Grid size={{ xs: 12, md: 9, lg: 9 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Dresses Collection</Typography>
              <FormControl size="small">
                <InputLabel id="sort-by">Sort by</InputLabel>
                <Select labelId="sort-by" label="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {pageItems.map((p) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Badge color="secondary" badgeContent={p.isFeatured ? 'New' : undefined} sx={{ width: '100%' }}>
                      {formatImage(p) && (
                        <CardMedia
                          component="img"
                          src={formatImage(p)}
                          alt={p.name}
                          sx={{
                            width: '100%',
                            aspectRatio: '4 / 3',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      )}
                    </Badge>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600, mb: 0.5 }} noWrap>{p.name}</Typography>
                      <Typography color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>${Number(p.price).toFixed(2)}</Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Button fullWidth size="small" variant="contained" sx={{ backgroundColor: '#6366f1', textTransform: 'none' }}>Add to Cart</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center" sx={{ mt: { xs: 2, md: 3 } }}>
              <Button size="small" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button key={i} size="small" variant={page === i + 1 ? 'contained' : 'outlined'} onClick={() => setPage(i + 1)}>{i + 1}</Button>
              ))}
              <Button size="small" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


