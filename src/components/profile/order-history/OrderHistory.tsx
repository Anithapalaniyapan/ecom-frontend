'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#10b981';
      case 'processing':
        return '#6b7280';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card sx={{ mb: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Order History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review your past purchases and their statuses.
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No orders yet. Start shopping to see your order history here!
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {order.orderId}
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(order.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(order.status),
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          sx={{
                            color: '#667eea',
                            textTransform: 'none',
                            fontWeight: 500,
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: '#d1d5db',
                  color: '#6b7280',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                View All Orders
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

