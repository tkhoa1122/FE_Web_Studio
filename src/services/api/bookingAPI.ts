// src/services/api/bookingAPI.ts

import { axiosInstance } from '@/config/axios';
import { 
  BookingResponseDTO, 
  BookingCreateDTO, 
  BookingSearchDTO,
  InvoiceResponseDTO,
  InvoiceCreateDTO,
  InvoiceSearchDTO
} from '@/domain/dto/BookingDTO';
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';

export const bookingAPI = {
  // Booking endpoints
  createBooking: async (booking: BookingCreateDTO): Promise<ApiResponse<BookingResponseDTO>> => {
    try {
      // Normalize payload to match BE contract: only room items in details
      const normalized = {
        userid: (booking as any).userid,
        starttime: booking.starttime,
        endtime: booking.endtime,
        details: (booking.details || []).filter((d: any) => d.roomid && d.quantity).map((d: any) => ({
          roomid: d.roomid,
          quantity: d.quantity,
        })),
      } as any;

      console.log('bookingAPI: Creating booking (normalized):', normalized);
      const response = await axiosInstance.post('booking', normalized);
      console.log('bookingAPI: Booking created:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('bookingAPI: Error creating booking:', error);
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tạo booking',
        data: null,
        error: error.message
      };
    }
  },

  getBookingById: async (id: number): Promise<ApiResponse<BookingResponseDTO>> => {
    try {
      const response = await axiosInstance.get(`bookings/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thông tin booking',
        data: null,
        error: error.message
      };
    }
  },

  getUserBookings: async (userId: number, criteria?: BookingSearchDTO): Promise<ApiResponse<PaginatedResponse<BookingResponseDTO>>> => {
    try {
      const params = { userid: userId, ...criteria };
      const response = await axiosInstance.get('booking', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách booking',
        data: null,
        error: error.message
      };
    }
  },

  updateBookingStatus: async (id: number, status: string): Promise<ApiResponse<BookingResponseDTO>> => {
    try {
      const response = await axiosInstance.patch(`bookings/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể cập nhật trạng thái booking',
        data: null,
        error: error.message
      };
    }
  },

  // Invoice endpoints
  createInvoice: async (invoice: InvoiceCreateDTO): Promise<ApiResponse<InvoiceResponseDTO>> => {
    try {
      console.log('bookingAPI: Creating invoice:', invoice);
      const response = await axiosInstance.post('invoice', invoice);
      console.log('bookingAPI: Invoice created:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('bookingAPI: Error creating invoice:', error);
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tạo hóa đơn',
        data: null,
        error: error.message
      };
    }
  },

  getInvoiceById: async (id: number): Promise<ApiResponse<InvoiceResponseDTO>> => {
    try {
      const response = await axiosInstance.get(`invoice/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thông tin hóa đơn',
        data: null,
        error: error.message
      };
    }
  },

  getUserInvoices: async (userId: number, criteria?: InvoiceSearchDTO): Promise<ApiResponse<PaginatedResponse<InvoiceResponseDTO>>> => {
    try {
      // BE không hỗ trợ lọc theo userid ở invoice → chỉ truyền các tiêu chí hợp lệ
      const params = { ...(criteria || {}) } as any;
      const response = await axiosInstance.get('invoice', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách hóa đơn',
        data: null,
        error: error.message
      };
    }
  },

  getInvoiceByBookingId: async (bookingId: number): Promise<ApiResponse<InvoiceResponseDTO>> => {
    try {
      // BE không hỗ trợ invoice/{id} → dùng invoice?bookingid=
      const response = await axiosInstance.get('invoice', {
        params: { bookingid: bookingId, page: 1, limit: 1 }
      });
      const raw = response.data;
      const firstItem = Array.isArray(raw?.data)
        ? raw.data[0]
        : raw?.data?.items?.[0] || null;

      return {
        success: raw?.success ?? !!firstItem,
        status: raw?.status ?? (firstItem ? 'success' : 'fail'),
        message: raw?.message ?? (firstItem ? 'OK' : 'Không tìm thấy hóa đơn'),
        data: firstItem,
        error: firstItem ? null : raw?.error ?? null
      } as ApiResponse<InvoiceResponseDTO>;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải hóa đơn theo booking',
        data: null,
        error: error.message
      };
    }
  }
};
