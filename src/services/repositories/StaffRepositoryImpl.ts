// src/services/repositories/StaffRepositoryImpl.ts

import { StaffRepository } from '@/domain/repositories/StaffRepository';
import { ApiResponse } from '@/domain/dto/common/ApiResponse';
import { 
  StaffResponseDTO,
  CreateStaffDTO,
  UpdateStaffDTO,
  StaffListParams,
  StaffListResponse
} from '@/domain/dto/StaffDTO';
import { staffAPI } from '../api/staffAPI';

export const staffRepositoryImpl: StaffRepository = {
  // Get staff list
  getStaffList(params: StaffListParams): Promise<ApiResponse<StaffListResponse>> {
    return staffAPI.getStaffList(params);
  },

  // Get staff by ID
  getStaffById(id: number): Promise<ApiResponse<StaffResponseDTO>> {
    return staffAPI.getStaffById(id);
  },

  // Create staff
  createStaff(data: CreateStaffDTO): Promise<ApiResponse<StaffResponseDTO>> {
    return staffAPI.createStaff(data);
  },

  // Update staff
  updateStaff(id: number, data: UpdateStaffDTO): Promise<ApiResponse<StaffResponseDTO>> {
    return staffAPI.updateStaff(id, data);
  },

  // Delete staff
  deleteStaff(id: number): Promise<ApiResponse<void>> {
    return staffAPI.deleteStaff(id);
  }
};
