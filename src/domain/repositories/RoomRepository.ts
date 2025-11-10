// src/domain/repositories/RoomRepository.ts

import {
  ApiResponse,
  PaginatedResponse,
} from "@/domain/dto/common/ApiResponse";
import {
  RoomResponseDTO,
  RoomSearchDTO,
  EquipmentResponseDTO,
  EquipmentSearchDTO,
  CreateRoomDTO,
  UpdateRoomDTO,
  RoomListParams,
  RoomListResponse,
} from "@/domain/dto/RoomDTO";

export interface RoomRepository {
  // Room methods
  findAll(): Promise<ApiResponse<RoomResponseDTO[]>>;
  findById(id: number): Promise<ApiResponse<RoomResponseDTO>>;
  search(
    criteria: RoomSearchDTO
  ): Promise<ApiResponse<PaginatedResponse<RoomResponseDTO>>>;

  // Admin methods
  getRoomsList(params: RoomListParams): Promise<ApiResponse<RoomListResponse>>;
  getRoomById(id: number): Promise<ApiResponse<RoomResponseDTO>>;
  createRoom(data: CreateRoomDTO): Promise<ApiResponse<RoomResponseDTO>>;
  updateRoom(
    id: number,
    data: UpdateRoomDTO
  ): Promise<ApiResponse<RoomResponseDTO>>;
  deleteRoom(id: number): Promise<ApiResponse<void>>;

  // Equipment methods
  findAllEquipments(): Promise<ApiResponse<EquipmentResponseDTO[]>>;
  getEquipmentById(id: number): Promise<ApiResponse<EquipmentResponseDTO>>;
  findEquipmentsByRoomId(
    roomId: number
  ): Promise<ApiResponse<EquipmentResponseDTO[]>>;
  searchEquipments(
    criteria: EquipmentSearchDTO
  ): Promise<ApiResponse<PaginatedResponse<EquipmentResponseDTO>>>;
}
