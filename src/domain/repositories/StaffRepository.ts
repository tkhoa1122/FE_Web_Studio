// src/domain/repositories/StaffRepository.ts

import { ApiResponse } from "@/domain/dto/common/ApiResponse";
import {
  StaffResponseDTO,
  CreateStaffDTO,
  UpdateStaffDTO,
  StaffListParams,
  StaffListResponse,
} from "@/domain/dto/StaffDTO";

export interface StaffRepository {
  // Get staff list with pagination and filters
  getStaffList(
    params: StaffListParams
  ): Promise<ApiResponse<StaffListResponse>>;

  // Get staff by ID
  getStaffById(id: number): Promise<ApiResponse<StaffResponseDTO>>;

  // Create new staff
  createStaff(data: CreateStaffDTO): Promise<ApiResponse<StaffResponseDTO>>;

  // Update staff
  updateStaff(
    id: number,
    data: UpdateStaffDTO
  ): Promise<ApiResponse<StaffResponseDTO>>;

  // Delete staff
  deleteStaff(id: number): Promise<ApiResponse<void>>;
}
