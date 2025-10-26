// src/services/data/mockData.ts
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { StudioResponseDTO, AccessoryResponseDTO, StudioPackageDTO } from '@/domain/dto/StudioDTO';

export const mockStudios: StudioResponseDTO[] = [
  {
    id: '1',
    name: 'Studio A - Phòng Cơ Bản',
    description: 'Phòng studio chuyên nghiệp với đèn chiếu sáng và background trắng, phù hợp cho chụp ảnh sản phẩm và quảng cáo',
    capacity: 10,
    area: 50,
    pricePerHour: 300000,
    pricePerDay: 2000000,
    equipment: ['Đèn chiếu sáng', 'Background trắng', 'Chân máy ảnh'],
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0c0b4b8a8a9?w=800',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800'
    ],
    location: 'Quận 1, TP.HCM',
    amenities: ['WiFi', 'Điều hòa', 'Chỗ đậu xe', 'Phòng thay đồ'],
    status: 'available',
    background: 'Background trắng',
    lighting: 'Đèn LED chuyên nghiệp',
    rating: 4.5,
    totalBookings: 120,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Studio B - Phòng Premium',
    description: 'Studio cao cấp với thiết bị đầy đủ, phù hợp cho quay phim và chụp ảnh nhóm lớn',
    capacity: 20,
    area: 80,
    pricePerHour: 500000,
    pricePerDay: 3500000,
    equipment: ['Đèn chiếu sáng', 'Green screen', 'Máy quay', 'Hệ thống âm thanh'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
    ],
    location: 'Quận 2, TP.HCM',
    amenities: ['WiFi', 'Điều hòa', 'Chỗ đậu xe', 'Phòng thay đồ', 'Phòng nghỉ'],
    status: 'available',
    background: 'Green screen + Background đen',
    lighting: 'Đèn LED + Đèn flash chuyên nghiệp',
    rating: 4.8,
    totalBookings: 95,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Studio C - Phòng VIP',
    description: 'Studio VIP với không gian rộng rãi và thiết bị cao cấp nhất, phù hợp cho sự kiện lớn',
    capacity: 30,
    area: 120,
    pricePerHour: 800000,
    pricePerDay: 5000000,
    equipment: ['Đèn chiếu sáng cao cấp', 'Nhiều background', 'Máy quay 4K', 'Hệ thống âm thanh', 'Trợ lý chụp ảnh'],
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      'https://images.unsplash.com/photo-1594736797933-d0c0b4b8a8a9?w=800'
    ],
    location: 'Quận 3, TP.HCM',
    amenities: ['WiFi', 'Điều hòa', 'Chỗ đậu xe', 'Phòng thay đồ', 'Phòng nghỉ', 'Quầy bar', 'Trợ lý chụp ảnh'],
    status: 'available',
    background: 'Đa dạng background',
    lighting: 'Hệ thống đèn chuyên nghiệp',
    rating: 4.9,
    totalBookings: 67,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockAccessories: AccessoryResponseDTO[] = [
  {
    id: '1',
    name: 'Standee quảng cáo',
    description: 'Standee in ảnh quảng cáo cao cấp, kích thước 80x200cm',
    type: 'standee',
    quantity: 20,
    availableQuantity: 18,
    pricePerHour: 50000,
    pricePerDay: 300000,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bàn ghế cao cấp',
    description: 'Bộ bàn ghế gỗ cao cấp cho phỏng vấn và meeting',
    type: 'table_chair',
    quantity: 10,
    availableQuantity: 8,
    pricePerHour: 30000,
    pricePerDay: 200000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Phông phụ trang trí',
    description: 'Các loại phông nền trang trí đa dạng màu sắc',
    type: 'backdrop',
    quantity: 15,
    availableQuantity: 12,
    pricePerHour: 40000,
    pricePerDay: 250000,
    images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400'],
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Vật trang trí',
    description: 'Các vật trang trí đa dạng: cây cảnh, đồ nội thất, props chụp ảnh',
    type: 'decoration',
    quantity: 50,
    availableQuantity: 45,
    pricePerHour: 20000,
    pricePerDay: 150000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockStudioPackages: StudioPackageDTO[] = [
  {
    id: '1',
    name: 'Studio Basic',
    description: 'Gói cơ bản phù hợp cho chụp ảnh sản phẩm đơn giản',
    pricePerHour: 300000,
    features: [
      'Không gian chụp ảnh',
      'Đèn chiếu sáng cơ bản',
      'Background trắng',
      'Chân máy ảnh',
      'WiFi miễn phí'
    ],
    studioIds: ['1'],
    accessoryIds: [],
    isPopular: false
  },
  {
    id: '2',
    name: 'Studio Premium',
    description: 'Gói cao cấp với thiết bị đầy đủ cho quay phim và chụp ảnh chuyên nghiệp',
    pricePerHour: 500000,
    features: [
      'Không gian chụp ảnh rộng rãi',
      'Đèn chiếu sáng chuyên nghiệp',
      'Green screen + Background đa dạng',
      'Máy quay HD',
      'Hệ thống âm thanh',
      'Phụ kiện cơ bản',
      'Hỗ trợ kỹ thuật'
    ],
    studioIds: ['2'],
    accessoryIds: ['1', '2'],
    isPopular: true
  },
  {
    id: '3',
    name: 'Studio VIP',
    description: 'Gói VIP với không gian và thiết bị cao cấp nhất',
    pricePerHour: 800000,
    features: [
      'Không gian studio rộng rãi',
      'Đèn chiếu sáng cao cấp',
      'Nhiều loại background',
      'Máy quay 4K',
      'Hệ thống âm thanh cao cấp',
      'Phụ kiện cao cấp',
      'Trợ lý chụp ảnh chuyên nghiệp',
      'Phòng nghỉ riêng'
    ],
    studioIds: ['3'],
    accessoryIds: ['1', '2', '3', '4'],
    isPopular: false
  }
];

export const mockApiResponses = {
  getAllStudios: (): ApiResponse<StudioResponseDTO[]> => ({
    status: 'success',
    message: 'Lấy danh sách studio thành công',
    data: mockStudios,
    length: mockStudios.length,
    success: true,
    timestamp: new Date().toISOString(),
    metadata: {
      totalCount: mockStudios.length
    }
  }),
  
  getStudioById: (id: string): ApiResponse<StudioResponseDTO> => {
    const studio = mockStudios.find((s) => s.id === id);
    return studio
      ? { 
          status: 'success', 
          message: 'Lấy thông tin studio thành công', 
          data: studio, 
          success: true,
          timestamp: new Date().toISOString()
        }
      : { 
          status: 'fail', 
          message: 'Không tìm thấy studio', 
          data: null, 
          error: 'Studio not found',
          success: false,
          timestamp: new Date().toISOString()
        };
  },
  
  searchStudios: (criteria: any): ApiResponse<PaginatedResponse<StudioResponseDTO>> => {
    let filtered = [...mockStudios];
    
    // Apply filters
    if (criteria.location) {
      filtered = filtered.filter((s) => 
        s.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    if (criteria.minCapacity) {
      filtered = filtered.filter((s) => s.capacity >= criteria.minCapacity);
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter((s) => s.pricePerHour <= criteria.maxPrice);
    }
    if (criteria.status) {
      filtered = filtered.filter((s) => s.status === criteria.status);
    }
    
    // Pagination
    const page = criteria.page || 1;
    const limit = criteria.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = filtered.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(filtered.length / limit);
    
    return {
      status: 'success',
      message: `Tìm thấy ${filtered.length} studio`,
      data: {
        items,
        totalItems: filtered.length,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      success: true,
      timestamp: new Date().toISOString(),
      metadata: {
        totalCount: filtered.length,
        page,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  },

  // Additional mock responses for accessories and packages
  getAllAccessories: (): ApiResponse<AccessoryResponseDTO[]> => ({
    status: 'success',
    message: 'Lấy danh sách phụ kiện thành công',
    data: mockAccessories,
    length: mockAccessories.length,
    success: true,
    timestamp: new Date().toISOString(),
    metadata: {
      totalCount: mockAccessories.length
    }
  }),

  getAllPackages: (): ApiResponse<StudioPackageDTO[]> => ({
    status: 'success',
    message: 'Lấy danh sách gói thuê thành công',
    data: mockStudioPackages,
    length: mockStudioPackages.length,
    success: true,
    timestamp: new Date().toISOString(),
    metadata: {
      totalCount: mockStudioPackages.length
    }
  })
};