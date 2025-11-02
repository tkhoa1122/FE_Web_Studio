// src/application/redux/services/StaffService.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { staffRepositoryImpl } from "@/services/repositories/StaffRepositoryImpl";
import { 
  StaffResponseDTO,
  CreateStaffDTO,
  UpdateStaffDTO,
  StaffListParams,
  StaffListResponse
} from "@/domain/dto/StaffDTO";

// Lấy danh sách nhân viên
export const fetchStaffList = createAsyncThunk<
  StaffListResponse | null,
  StaffListParams
>(
  "staff/fetchList",
  async (params: StaffListParams, { rejectWithValue }) => {
    try {
      const response = await staffRepositoryImpl.getStaffList(params);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải danh sách nhân viên");
    }
  }
);

// Lấy thông tin nhân viên theo ID
export const fetchStaffById = createAsyncThunk<
  StaffResponseDTO | null,
  number
>(
  "staff/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await staffRepositoryImpl.getStaffById(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải thông tin nhân viên");
    }
  }
);

// Tạo nhân viên mới
export const createStaff = createAsyncThunk<
  StaffResponseDTO | null,
  CreateStaffDTO
>(
  "staff/create",
  async (data: CreateStaffDTO, { rejectWithValue }) => {
    try {
      const response = await staffRepositoryImpl.createStaff(data);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tạo nhân viên");
    }
  }
);

// Cập nhật nhân viên
export const updateStaff = createAsyncThunk<
  StaffResponseDTO | null,
  { id: number; data: UpdateStaffDTO }
>(
  "staff/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await staffRepositoryImpl.updateStaff(id, data);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể cập nhật nhân viên");
    }
  }
);

// Xóa nhân viên
export const deleteStaff = createAsyncThunk<
  number,
  number
>(
  "staff/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await staffRepositoryImpl.deleteStaff(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể xóa nhân viên");
    }
  }
);
