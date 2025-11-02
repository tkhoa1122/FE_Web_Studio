// src/services/repositories/RoomRepositoryImpl.ts

import { RoomRepository } from '@/domain/repositories/RoomRepository';
import { 
  ApiResponse, 
  PaginatedResponse 
} from '@/domain/dto/common/ApiResponse';
import { 
  RoomResponseDTO, 
  RoomSearchDTO, 
  EquipmentResponseDTO, 
  EquipmentSearchDTO,
  CreateRoomDTO,
  UpdateRoomDTO,
  RoomListParams,
  RoomListResponse
} from '@/domain/dto/RoomDTO';
import { roomAPI } from '../api/roomAPI';

export const roomRepositoryImpl: RoomRepository = {
  // Room methods
  findAll(): Promise<ApiResponse<RoomResponseDTO[]>> {
    return roomAPI.getAllRooms();
  },

  findById(id: number): Promise<ApiResponse<RoomResponseDTO>> {
    return roomAPI.getRoomById(id);
  },

  search(criteria: RoomSearchDTO): Promise<ApiResponse<PaginatedResponse<RoomResponseDTO>>> {
    return roomAPI.searchRooms(criteria);
  },

  // Equipment methods
  findAllEquipments(): Promise<ApiResponse<EquipmentResponseDTO[]>> {
    return roomAPI.getAllEquipments();
  },

  getEquipmentById(id: number): Promise<ApiResponse<EquipmentResponseDTO>> {
    return roomAPI.getEquipmentById(id);
  },

  findEquipmentsByRoomId(roomId: number): Promise<ApiResponse<EquipmentResponseDTO[]>> {
    return roomAPI.getEquipmentsByRoomId(roomId);
  },

  searchEquipments(criteria: EquipmentSearchDTO): Promise<ApiResponse<PaginatedResponse<EquipmentResponseDTO>>> {
    return roomAPI.searchEquipments(criteria);
  },

  // Admin methods
  getRoomsList(params: RoomListParams): Promise<ApiResponse<RoomListResponse>> {
    return roomAPI.getRoomsList(params);
  },

  getRoomById(id: number): Promise<ApiResponse<RoomResponseDTO>> {
    return roomAPI.getRoomById(id);
  },

  createRoom(data: CreateRoomDTO): Promise<ApiResponse<RoomResponseDTO>> {
    return roomAPI.createRoom(data);
  },

  updateRoom(id: number, data: UpdateRoomDTO): Promise<ApiResponse<RoomResponseDTO>> {
    return roomAPI.updateRoom(id, data);
  },

  deleteRoom(id: number): Promise<ApiResponse<void>> {
    return roomAPI.deleteRoom(id);
  }
};
