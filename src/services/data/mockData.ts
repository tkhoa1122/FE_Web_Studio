// src/services/data/mockData.ts
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { StudioResponseDTO } from '@/domain/dto/StudioDTO';

export const mockStudios: StudioResponseDTO[] = [
  {
    id: '1',
    name: 'Studio Premium Plus',
    description: 'Studio cao cấp với thiết bị hiện đại nhất',
    capacity: 25,
    pricePerHour: 800000,
    equipment: ['Camera RED', 'Gimbal DJI', 'Lighting Kit'],
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800'],
    location: 'Quận 1, TP.HCM',
    amenities: ['WiFi', 'Parking', 'AC'],
    availability: true,
    rating: 4.8,
    totalBookings: 145,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-09-26T00:00:00Z',
  },
  {
    id: '2',
    name: 'Creative Space Studio',
    description: 'Không gian sáng tạo lý tưởng',
    capacity: 15,
    pricePerHour: 500000,
    equipment: ['DSLR Canon', 'Studio Lights', 'Backdrop'],
    images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800'],
    location: 'Quận 3, TP.HCM',
    amenities: ['WiFi', 'AC'],
    availability: true,
    rating: 4.5,
    totalBookings: 89,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-09-25T00:00:00Z',
  },
];

export const mockApiResponses = {
  getAllStudios: (): ApiResponse<StudioResponseDTO[]> => ({
    status: 'success',
    message: 'OK',
    data: mockStudios,
    length: mockStudios.length,
    error: null,
    success: true,
  }),
  getStudioById: (id: string): ApiResponse<StudioResponseDTO> => {
    const studio = mockStudios.find((s) => s.id === id);
    return studio
      ? { status: 'success', message: 'OK', data: studio, error: null, success: true }
      : { status: 'fail', message: 'Not found', data: null, error: 'Not found', success: false };
  },
  searchStudios: (criteria: any): ApiResponse<PaginatedResponse<StudioResponseDTO>> => {
    let filtered = [...mockStudios];
    if (criteria.location) filtered = filtered.filter((s) => s.location.toLowerCase().includes(criteria.location.toLowerCase()));
    if (criteria.minCapacity) filtered = filtered.filter((s) => s.capacity >= criteria.minCapacity);
    if (criteria.maxPrice) filtered = filtered.filter((s) => s.pricePerHour <= criteria.maxPrice);
    const page = criteria.page || 1;
    const limit = criteria.limit || 10;
    const items = filtered.slice((page - 1) * limit, (page - 1) * limit + limit);
    return {
      status: 'success',
      message: 'OK',
      data: {
        items,
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
        currentPage: page,
        pageSize: limit,
      },
      error: null,
      success: true,
    };
  },
};


