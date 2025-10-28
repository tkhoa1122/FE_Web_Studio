// src/domain/repositories/RoomRepository.ts

import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { RoomResponseDTO, RoomSearchDTO, EquipmentResponseDTO, EquipmentSearchDTO } from '@/domain/dto/RoomDTO';

export interface RoomRepository {
  // Room methods
  findAll(): Promise<ApiResponse<RoomResponseDTO[]>>;
  findById(id: number): Promise<ApiResponse<RoomResponseDTO>>;
  search(criteria: RoomSearchDTO): Promise<ApiResponse<PaginatedResponse<RoomResponseDTO>>>;
  
  // Equipment methods
  findAllEquipments(): Promise<ApiResponse<EquipmentResponseDTO[]>>;
  getEquipmentById(id: number): Promise<ApiResponse<EquipmentResponseDTO>>;
  findEquipmentsByRoomId(roomId: number): Promise<ApiResponse<EquipmentResponseDTO[]>>;
  searchEquipments(criteria: EquipmentSearchDTO): Promise<ApiResponse<PaginatedResponse<EquipmentResponseDTO>>>;
}
