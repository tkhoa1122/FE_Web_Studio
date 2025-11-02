// src/services/repositories/EquipmentRepositoryImpl.ts

import { EquipmentRepository } from "@/domain/repositories/EquipmentRepository";
import { 
  EquipmentResponseDTO, 
  EquipmentListParams, 
  EquipmentListResponse,
  CreateEquipmentDTO,
  UpdateEquipmentDTO
} from "@/domain/dto/EquipmentDTO";
import * as equipmentAPI from "../api/equipmentAPI";

export class EquipmentRepositoryImpl implements EquipmentRepository {
  async getEquipmentList(params?: EquipmentListParams): Promise<EquipmentListResponse | null> {
    try {
      return await equipmentAPI.getEquipmentList(params);
    } catch (error) {
      console.error("EquipmentRepository - getEquipmentList error:", error);
      throw error;
    }
  }

  async getEquipmentById(id: number): Promise<EquipmentResponseDTO | null> {
    try {
      return await equipmentAPI.getEquipmentById(id);
    } catch (error) {
      console.error("EquipmentRepository - getEquipmentById error:", error);
      throw error;
    }
  }

  async createEquipment(data: CreateEquipmentDTO): Promise<EquipmentResponseDTO | null> {
    try {
      return await equipmentAPI.createEquipment(data);
    } catch (error) {
      console.error("EquipmentRepository - createEquipment error:", error);
      throw error;
    }
  }

  async updateEquipment(id: number, data: UpdateEquipmentDTO): Promise<EquipmentResponseDTO | null> {
    try {
      return await equipmentAPI.updateEquipment(id, data);
    } catch (error) {
      console.error("EquipmentRepository - updateEquipment error:", error);
      throw error;
    }
  }

  async deleteEquipment(id: number): Promise<boolean> {
    try {
      return await equipmentAPI.deleteEquipment(id);
    } catch (error) {
      console.error("EquipmentRepository - deleteEquipment error:", error);
      throw error;
    }
  }
}

export const equipmentRepository = new EquipmentRepositoryImpl();
