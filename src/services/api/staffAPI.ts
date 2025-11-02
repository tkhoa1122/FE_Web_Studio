// src/services/api/staffAPI.ts

import { axiosInstance } from '@/config/axios';
import { ApiResponse } from '@/domain/dto/common/ApiResponse';
import { 
  StaffResponseDTO,
  CreateStaffDTO,
  UpdateStaffDTO,
  StaffListParams,
  StaffListResponse,
  StaffApiResponse,
  StaffListApiResponse
} from '@/domain/dto/StaffDTO';

export const staffAPI = {
  // Get staff list with pagination and filters
  getStaffList: async (params: StaffListParams): Promise<StaffListApiResponse> => {
    try {
      const { page = 1, limit = 10, search, role } = params;
      const response = await axiosInstance.get('/admin/staff', { 
        params: { page, limit, search, role } 
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách nhân viên',
        data: null,
        error: error.message
      };
    }
  },

  // Get staff by ID
  getStaffById: async (id: number): Promise<StaffApiResponse> => {
    try {
      const response = await axiosInstance.get(`/admin/staff/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thông tin nhân viên',
        data: null,
        error: error.message
      };
    }
  },

  // Create new staff
  createStaff: async (data: CreateStaffDTO): Promise<StaffApiResponse> => {
    try {
      const response = await axiosInstance.post('/admin/staff', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tạo nhân viên',
        data: null,
        error: error.message
      };
    }
  },

  // Update staff
  updateStaff: async (id: number, data: UpdateStaffDTO): Promise<StaffApiResponse> => {
    try {
      const response = await axiosInstance.patch(`/admin/staff/${id}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể cập nhật nhân viên',
        data: null,
        error: error.message
      };
    }
  },

  // Delete staff
  deleteStaff: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await axiosInstance.delete(`/admin/staff/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể xóa nhân viên',
        data: null,
        error: error.message
      };
    }
  }
};
