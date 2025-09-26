'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Box, Typography, Button, Card, CardContent, CardMedia, Chip,
  CircularProgress, Alert, Container, AppBar, Toolbar, IconButton,
  Divider, List, ListItem, ListItemIcon, ListItemText, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Rating
} from '@mui/material';
import { ArrowBack, LocationOn, People, AttachMoney, Star, CheckCircle, Schedule, Phone, Email } from '@mui/icons-material';
import { useStudio } from '@/application/hooks/useStudio';
import Link from 'next/link';

export default function StudioDetailPage() {
  const params = useParams();
  const studioId = params.id as string;
  const { currentStudio, loading, error, getStudioById, clearStudioError } = useStudio();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState('1');
  
  const [minDate, setMinDate] = useState('');
  
  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (studioId) {
      getStudioById(studioId);
    }
  }, [studioId, getStudioById]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => clearStudioError()}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!currentStudio) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          Không tìm thấy studio này. <Link href="/">Quay lại trang chủ</Link>
        </Alert>
      </Container>
    );
  }

  const handleBooking = () => {
    console.log('Booking:', { studioId, bookingDate, bookingTime, bookingDuration });
    setOpenBookingDialog(false);
    alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)' }}>
        <Toolbar>
          <Link href="/" passHref>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🎬 S Studio Booking
          </Typography>
          <Button color="inherit">Đăng nhập</Button>
          <Button color="inherit">Đăng ký</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {currentStudio.name}
        </Typography>
        
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentStudio.pricePerHour)}/giờ
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {currentStudio.description}
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap" sx={{ mt: 2 }}>
            <Chip icon={<People />} label={`${currentStudio.capacity} người`} />
            <Chip icon={<LocationOn />} label={currentStudio.location} />
            <Chip icon={<Star />} label={`${currentStudio.rating || 4.5}/5`} />
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenBookingDialog(true)}
            sx={{ mt: 3 }}
          >
            Đặt lịch ngay
          </Button>
        </Card>

        <Dialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Đặt lịch: {currentStudio.name}</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} pt={1}>
              <TextField 
                fullWidth 
                label="Ngày thuê" 
                type="date" 
                value={bookingDate} 
                onChange={(e) => setBookingDate(e.target.value)} 
                InputLabelProps={{ shrink: true }} 
                inputProps={{ min: minDate }} 
              />
              <TextField 
                fullWidth 
                label="Giờ bắt đầu" 
                type="time" 
                value={bookingTime} 
                onChange={(e) => setBookingTime(e.target.value)} 
                InputLabelProps={{ shrink: true }} 
              />
              <TextField 
                fullWidth 
                label="Số giờ thuê" 
                type="number" 
                value={bookingDuration} 
                onChange={(e) => setBookingDuration(e.target.value)} 
                inputProps={{ min: 1, max: 12 }} 
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBookingDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleBooking} disabled={!bookingDate || !bookingTime}>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}