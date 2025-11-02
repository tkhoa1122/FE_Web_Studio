// src/domain/dto/RoomDTO.ts

import { Room, Equipment } from '../entities/Room';
import { ApiResponse, PaginatedResponse } from './common/ApiResponse';

// DTO cho Room Response
export interface RoomResponseDTO {
  roomid: number;
  roomtype: string;
  price: string;
  checkintime: string;
  checkouttime: string;
  depositrequired: string;
  description: string;
  address: string;
  banner: string;
  utilities: {
    utilityid: number;
    utilityname: string;
    roomid: number;
  }[];
  images: {
    roomImageId: number;
    imageLink: string;
    roomid: number;
  }[];
  equipments: {
    equipmentid: number;
    roomid: number;
    equipmenttype: string;
    equipmentname: string;
    quantity: number;
    price: string;
    isavailable: boolean;
  }[];
}

// DTO cho Equipment Response
export interface EquipmentResponseDTO {
  equipmentid: number;
  roomid: number;
  equipmenttype: string;
  equipmentname: string;
  image?: string | null;
  quantity: number;
  isavailable: boolean;
}

// DTO cho Room Search
export interface RoomSearchDTO {
  roomtype?: string;
  minPrice?: number;
  maxPrice?: number;
  address?: string;
  equipmentType?: string;
  page?: number;
  limit?: number;
}

// DTO cho Equipment Search
export interface EquipmentSearchDTO {
  equipmenttype?: string;
  roomid?: number;
  isavailable?: boolean;
  page?: number;
  limit?: number;
}

// Admin DTOs
export interface RoomImageCreateDTO {
  imageLink: string;
}

export interface RoomUtilityCreateDTO {
  utilityname: string;
}

export interface CreateRoomDTO {
  roomtype: string;
  price: number;
  checkintime: string;
  checkouttime: string;
  depositrequired: number;
  description: string;
  banner: string;
  address: string;
  images: RoomImageCreateDTO[];
  utilities: RoomUtilityCreateDTO[];
}

export interface UpdateRoomDTO {
  roomtype?: string;
  price?: number;
  checkintime?: string;
  checkouttime?: string;
  depositrequired?: number;
  description?: string;
  banner?: string;
  address?: string;
  images?: RoomImageCreateDTO[];
  utilities?: RoomUtilityCreateDTO[];
}

export interface RoomListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface RoomListResponse {
  data: RoomResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response types
export type RoomsApiResponse = ApiResponse<RoomResponseDTO[]>;
export type RoomApiResponse = ApiResponse<RoomResponseDTO>;
export type EquipmentApiResponse = ApiResponse<EquipmentResponseDTO[]>;
export type RoomSearchApiResponse = ApiResponse<PaginatedResponse<RoomResponseDTO>>;
export type RoomListApiResponse = ApiResponse<RoomListResponse>;
