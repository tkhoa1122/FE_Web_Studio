'use client';
import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, AppBar, Toolbar, Button, Card, CardContent, CardMedia, TextField, InputAdornment,
  Rating, Chip, Pagination, Alert, CircularProgress
} from '@mui/material';
import { LocationOn, Search, AttachMoney, Groups } from '@mui/icons-material';
import { useStudio } from '@/application/hooks/useStudio';
import { StudioSearchDTO } from '@/domain/dto/StudioDTO';
import Link from 'next/link';

export default function HomePage() {
  const { studios, searchResults, loading, error, getAllStudios, searchStudiosByCriteria, clearStudioError } = useStudio();
  const [searchCriteria, setSearchCriteria] = useState<StudioSearchDTO>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllStudios();
  }, [getAllStudios]);

  const handleSearch = () => {
    searchStudiosByCriteria({ ...searchCriteria, page: 1, limit: 9 });
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    searchStudiosByCriteria({ ...searchCriteria, page: value, limit: 9 });
  };

  const displayStudios = searchResults?.items || studios;
  const totalPages = searchResults?.totalPages || Math.ceil(studios.length / 9);

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🎬 S Studio Booking
          </Typography>
          <Button color="inherit">Đăng nhập</Button>
          <Button color="inherit">Đăng ký</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Thuê Studio Chuyên Nghiệp
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Khám phá và đặt lịch studio tốt nhất cho chụp ảnh, quay phim và sự kiện
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        {/* Search Section */}
        <Card elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
            <Box flex="1" minWidth="200px">
              <TextField
                fullWidth
                label="Địa điểm"
                placeholder="Nhập địa điểm..."
                value={searchCriteria.location || ''}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><LocationOn color="action" /></InputAdornment>,
                  }
                }}
              />
            </Box>
            <Box flex="1" minWidth="150px">
              <TextField
                fullWidth
                type="number"
                label="Sức chứa tối thiểu"
                placeholder="Số người..."
                value={searchCriteria.minCapacity || ''}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, minCapacity: parseInt(e.target.value) || undefined })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><Groups color="action" /></InputAdornment>,
                  }
                }}
              />
            </Box>
            <Box flex="1" minWidth="150px">
              <TextField
                fullWidth
                type="number"
                label="Giá tối đa (VNĐ)"
                placeholder="500,000..."
                value={searchCriteria.maxPrice || ''}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, maxPrice: parseInt(e.target.value) || undefined })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><AttachMoney color="action" /></InputAdornment>,
                  }
                }}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleSearch}
                startIcon={<Search />}
                sx={{ py: 1.8, px: 3, borderRadius: 2 }}
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => clearStudioError()}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress size={50} />
          </Box>
        )}

        {/* Results Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {searchResults ? 'Kết quả tìm kiếm' : 'Tất cả Studio'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchResults ? `${searchResults.totalItems} studio` : `${studios.length} studio`}
          </Typography>
        </Box>

        {/* Studio Grid */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4}>
          {displayStudios.map((studio: any) => (
            <Card
              key={studio.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={studio.images?.[0] || 'https://picsum.photos/400/200'}
                alt={studio.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h6" component="h3" fontWeight="bold">
                  {studio.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {studio.description}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Rating value={studio.rating || 4.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({studio.totalBookings || 0} lượt thuê)
                  </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                  <Chip icon={<LocationOn />} label={studio.location} size="small" variant="outlined" />
                  <Chip icon={<Groups />} label={`${studio.capacity} người`} size="small" variant="outlined" />
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(studio.pricePerHour)}
                    <Typography component="span" variant="body2" color="text.secondary">/giờ</Typography>
                  </Typography>
                    <Link href={`/views/StudioDetailDemo/${studio.id}`} passHref>
                    <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
                      Xem chi tiết
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* No Results */}
        {!loading && displayStudios.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Không tìm thấy studio nào
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thử thay đổi tiêu chí tìm kiếm hoặc xóa bộ lọc
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={6}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}