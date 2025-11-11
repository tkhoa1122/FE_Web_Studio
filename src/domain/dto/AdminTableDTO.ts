// Pagination Response
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Table Query Params
export interface TableQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  startDate?: string;
  endDate?: string;
}

// Admin Booking DTO
export interface AdminBookingDTO {
  id: string;
  bookingCode: string;
  studio: {
    id: string;
    name: string;
    type: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  startTime: string;
  endTime: string;
  date: string;
  duration: number; // in hours
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  amount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Admin Studio DTO
export interface AdminStudioDTO {
  id: string;
  name: string;
  description: string;
  address: string;
  type: string;
  price: number;
  pricePerHour: number;
  capacity: number;
  area: number;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  amenities: string[];
  images: string[];
  totalBookings: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Update Booking DTO
export interface UpdateBookingDTO {
  status?: AdminBookingDTO['status'];
  paymentStatus?: AdminBookingDTO['paymentStatus'];
  notes?: string;
  startTime?: string;
  endTime?: string;
}

// Update Studio DTO
export interface UpdateStudioDTO {
  name?: string;
  description?: string;
  address?: string;
  type?: string;
  price?: number;
  pricePerHour?: number;
  capacity?: number;
  area?: number;
  status?: AdminStudioDTO['status'];
  equipment?: string[];
  amenities?: string[];
  images?: string[];
}
