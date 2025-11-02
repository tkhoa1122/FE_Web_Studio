// src/domain/repositories/EquipmentRepository.ts

import { 
  EquipmentResponseDTO, 
  EquipmentListParams, 
  EquipmentListResponse,
  CreateEquipmentDTO,
  UpdateEquipmentDTO
} from "../dto/EquipmentDTO";

export interface EquipmentRepository {
  // Public endpoints
  getEquipmentById(id: number): Promise<EquipmentResponseDTO | null>;
  
  // Admin endpoints
  getEquipmentList(params?: EquipmentListParams): Promise<EquipmentListResponse | null>;
  createEquipment(data: CreateEquipmentDTO): Promise<EquipmentResponseDTO | null>;
  updateEquipment(id: number, data: UpdateEquipmentDTO): Promise<EquipmentResponseDTO | null>;
  deleteEquipment(id: number): Promise<boolean>;
}
