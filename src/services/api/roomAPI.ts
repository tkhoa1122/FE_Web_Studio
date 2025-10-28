// src/services/api/roomAPI.ts

import { axiosInstance } from '@/config/axios';
import { ApiResponse } from '@/domain/dto/common/ApiResponse';
import { 
  RoomsApiResponse, 
  RoomApiResponse, 
  EquipmentApiResponse, 
  RoomSearchApiResponse,
  RoomResponseDTO, 
  RoomSearchDTO, 
  EquipmentResponseDTO, 
  EquipmentSearchDTO 
} from '@/domain/dto/RoomDTO';
import { PaginatedResponse } from '@/domain/dto/common/ApiResponse';

export const roomAPI = {
  // Room endpoints
  getAllRooms: async (): Promise<RoomsApiResponse> => {
    try {
      console.log('roomAPI: Base URL:', axiosInstance.defaults.baseURL);
      console.log('roomAPI: Making request to rooms endpoint');
      const response = await axiosInstance.get('rooms');
      console.log('roomAPI: Raw response:', response);
      console.log('roomAPI: Response data:', response.data);
      return response.data;
    } catch (error: any) {
      console.log('roomAPI: Error occurred:', error);
      console.log('roomAPI: Error response:', error.response);
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách phòng',
        data: null,
        error: error.message
      };
    }
  },

  getRoomById: async (id: number): Promise<RoomApiResponse> => {
    try {
      const response = await axiosInstance.get(`rooms/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thông tin phòng',
        data: null,
        error: error.message
      };
    }
  },

  searchRooms: async (criteria: RoomSearchDTO): Promise<RoomSearchApiResponse> => {
    try {
      const response = await axiosInstance.get('rooms', { params: criteria });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tìm kiếm phòng',
        data: null,
        error: error.message
      };
    }
  },

  // Equipment endpoints
  getAllEquipments: async (): Promise<EquipmentApiResponse> => {
    try {
      const response = await axiosInstance.get('equipment');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách thiết bị',
        data: null,
        error: error.message
      };
    }
  },

  getEquipmentById: async (id: number): Promise<ApiResponse<EquipmentResponseDTO>> => {
    try {
      const response = await axiosInstance.get(`equipment/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thông tin thiết bị',
        data: null,
        error: error.message
      } as any;
    }
  },

  getEquipmentsByRoomId: async (roomId: number): Promise<EquipmentApiResponse> => {
    try {
      const response = await axiosInstance.get(`equipment`, { 
        params: { roomid: roomId } 
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải thiết bị của phòng',
        data: null,
        error: error.message
      };
    }
  },

  searchEquipments: async (criteria: EquipmentSearchDTO): Promise<ApiResponse<PaginatedResponse<EquipmentResponseDTO>>> => {
    try {
      const response = await axiosInstance.get('equipment', { params: criteria });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tìm kiếm thiết bị',
        data: null,
        error: error.message
      };
    }
  }
};
