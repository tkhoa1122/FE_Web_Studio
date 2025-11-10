// src/application/redux/services/EquipmentService.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { equipmentRepository } from "@/services/repositories/EquipmentRepositoryImpl";
import {
  EquipmentListParams,
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from "@/domain/dto/EquipmentDTO";

/**
 * Fetch equipment list with filters
 */
export const fetchEquipmentList = createAsyncThunk(
  "equipment/fetchList",
  async (params: EquipmentListParams | undefined, { rejectWithValue }) => {
    try {
      const response = await equipmentRepository.getEquipmentList(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải danh sách thiết bị"
      );
    }
  }
);

/**
 * Fetch equipment by ID
 */
export const fetchEquipmentById = createAsyncThunk(
  "equipment/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await equipmentRepository.getEquipmentById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải thông tin thiết bị"
      );
    }
  }
);

/**
 * Create new equipment
 */
export const createEquipment = createAsyncThunk(
  "equipment/create",
  async (data: CreateEquipmentDTO, { rejectWithValue }) => {
    try {
      const response = await equipmentRepository.createEquipment(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tạo thiết bị"
      );
    }
  }
);

/**
 * Update equipment
 */
export const updateEquipment = createAsyncThunk(
  "equipment/update",
  async (
    { id, data }: { id: number; data: UpdateEquipmentDTO },
    { rejectWithValue }
  ) => {
    try {
      const response = await equipmentRepository.updateEquipment(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể cập nhật thiết bị"
      );
    }
  }
);

/**
 * Delete equipment
 */
export const deleteEquipment = createAsyncThunk(
  "equipment/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await equipmentRepository.deleteEquipment(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể xóa thiết bị"
      );
    }
  }
);
