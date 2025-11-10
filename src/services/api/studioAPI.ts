// src/services/api/studioAPI.ts
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { CreateStudioRequestDTO, StudioResponseDTO, StudioSearchDTO } from '@/domain/dto/StudioDTO';
import { mockApiResponses } from '../data/mockData';
import { 
  AdminStudioDTO, 
  PaginationResponse, 
  TableQueryParams,
  UpdateStudioDTO 
} from '@/domain/dto/AdminTableDTO';
import { axiosInstance } from '@/config/axios';

export const studioAPI = {
  getAllStudios: async (): Promise<ApiResponse<StudioResponseDTO[]>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.getAllStudios();
  },
  getStudioById: async (id: string): Promise<ApiResponse<StudioResponseDTO>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.getStudioById(id);
  },
  searchStudios: async (criteria: StudioSearchDTO): Promise<ApiResponse<PaginatedResponse<StudioResponseDTO>>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.searchStudios(criteria);
  },
  createStudio: async (_data: CreateStudioRequestDTO): Promise<ApiResponse<StudioResponseDTO>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: null, error: 'mock', success: false };
  },
  updateStudio: async (_id: string, _data: Partial<CreateStudioRequestDTO>): Promise<ApiResponse<StudioResponseDTO>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: null, error: 'mock', success: false };
  },
  deleteStudio: async (_id: string): Promise<ApiResponse<boolean>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: false, error: 'mock', success: false };
  },
  checkAvailability: async (_id: string, _s: string, _e: string): Promise<ApiResponse<boolean>> => {
    return { status: 'success', message: 'OK', data: true, error: null, success: true };
  },
};

// Admin Studio API
export const adminStudioAPI = {
  /**
   * Get all studios with pagination and filters (Admin)
   */
  getStudios: async (params: TableQueryParams): Promise<ApiResponse<PaginationResponse<AdminStudioDTO>>> => {
    try {
      const response = await axiosInstance.get('/admin/studios', { params });
      return {
        status: 'success',
        message: 'Studios fetched successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to fetch studios',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Get studio by ID (Admin)
   */
  getStudioById: async (id: string): Promise<ApiResponse<AdminStudioDTO>> => {
    try {
      const response = await axiosInstance.get(`/admin/studios/${id}`);
      return {
        status: 'success',
        message: 'Studio fetched successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to fetch studio',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Create new studio (Admin)
   */
  createStudio: async (data: Omit<AdminStudioDTO, 'id' | 'totalBookings' | 'rating' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<AdminStudioDTO>> => {
    try {
      const response = await axiosInstance.post('/admin/studios', data);
      return {
        status: 'success',
        message: 'Studio created successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to create studio',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Update studio (Admin)
   */
  updateStudio: async (id: string, data: UpdateStudioDTO): Promise<ApiResponse<AdminStudioDTO>> => {
    try {
      const response = await axiosInstance.patch(`/admin/studios/${id}`, data);
      return {
        status: 'success',
        message: 'Studio updated successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to update studio',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Update studio status (Admin)
   */
  updateStudioStatus: async (id: string, status: AdminStudioDTO['status']): Promise<ApiResponse<AdminStudioDTO>> => {
    try {
      const response = await axiosInstance.patch(`/admin/studios/${id}/status`, { status });
      return {
        status: 'success',
        message: 'Studio status updated successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to update studio status',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Delete studio (Admin)
   */
  deleteStudio: async (id: string): Promise<ApiResponse<boolean>> => {
    try {
      await axiosInstance.delete(`/admin/studios/${id}`);
      return {
        status: 'success',
        message: 'Studio deleted successfully',
        data: true,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to delete studio',
        data: false,
        error: error.message,
        success: false,
      };
    }
  },

  /**
   * Get studio statistics (Admin)
   */
  getStudioStats: async (): Promise<ApiResponse<{
    total: number;
    active: number;
    inactive: number;
    maintenance: number;
  }>> => {
    try {
      const response = await axiosInstance.get('/admin/studios/stats');
      return {
        status: 'success',
        message: 'Statistics fetched successfully',
        data: response.data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        status: 'fail',
        message: error.response?.data?.message || 'Failed to fetch statistics',
        data: null,
        error: error.message,
        success: false,
      };
    }
  },
};




