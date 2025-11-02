// src/services/api/equipmentAPI.ts

import { axiosInstance } from "@/config/axios";
import {
  EquipmentResponseDTO,
  EquipmentListParams,
  EquipmentListResponse,
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from "@/domain/dto/EquipmentDTO";
import { ApiResponse } from "@/domain/dto/common/ApiResponse";

/**
 * Get equipment list with filters (Admin)
 * GET /equipment
 */
export const getEquipmentList = async (
  params?: EquipmentListParams
): Promise<EquipmentListResponse | null> => {
  try {
    const response = await axiosInstance.get<
      ApiResponse<EquipmentListResponse>
    >("/equipment", { params });
    return response.data.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment list:", error);
    throw error;
  }
};

/**
 * Get equipment by ID
 * GET /equipment/{id}
 */
export const getEquipmentById = async (
  id: number
): Promise<EquipmentResponseDTO | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<EquipmentResponseDTO>>(
      `/equipment/${id}`
    );
    return response.data.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    throw error;
  }
};

/**
 * Create new equipment (Admin)
 * POST /equipment
 */
export const createEquipment = async (
  data: CreateEquipmentDTO
): Promise<EquipmentResponseDTO | null> => {
  try {
    const response = await axiosInstance.post<
      ApiResponse<EquipmentResponseDTO>
    >("/equipment", data);
    return response.data.data ?? null;
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error;
  }
};

/**
 * Update equipment (Admin)
 * PATCH /equipment/admin/{id}
 */
export const updateEquipment = async (
  id: number,
  data: UpdateEquipmentDTO
): Promise<EquipmentResponseDTO | null> => {
  try {
    const response = await axiosInstance.patch<
      ApiResponse<EquipmentResponseDTO>
    >(`/equipment/admin/${id}`, data);
    return response.data.data ?? null;
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
};

/**
 * Delete equipment (Admin)
 * DELETE /equipment/admin/{id}
 */
export const deleteEquipment = async (id: number): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/equipment/admin/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};
