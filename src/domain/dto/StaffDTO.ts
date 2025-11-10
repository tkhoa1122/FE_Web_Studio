// src/domain/dto/StaffDTO.ts

import { ApiResponse, PaginatedResponse } from "./common/ApiResponse";

// Staff Response DTO
export interface StaffResponseDTO {
  userId: number;
  username: string;
  email: string;
  fullName: string;
  role: "admin" | "manager" | "staff";
  createdAt?: string;
  updatedAt?: string;
}

// Create Staff DTO
export interface CreateStaffDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: "staff" | "manager" | "admin";
}

// Update Staff DTO
export interface UpdateStaffDTO {
  username?: string;
  email?: string;
  password?: string;
  fullName?: string;
  role?: "staff" | "manager" | "admin";
}

// Staff List Parameters
export interface StaffListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: "staff" | "manager" | "admin";
}

// Staff List Response
export interface StaffListResponse {
  data: StaffResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response Types
export type StaffApiResponse = ApiResponse<StaffResponseDTO>;
export type StaffListApiResponse = ApiResponse<StaffListResponse>;
export type StaffPaginatedApiResponse = ApiResponse<
  PaginatedResponse<StaffResponseDTO>
>;
