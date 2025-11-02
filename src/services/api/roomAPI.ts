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
  EquipmentSearchDTO,
  CreateRoomDTO,
  UpdateRoomDTO,
  RoomListParams,
  RoomListResponse,
  RoomListApiResponse
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
  },

  // Admin endpoints
  getRoomsList: async (params: RoomListParams): Promise<RoomListApiResponse> => {
    try {
      const { page = 1, limit = 10, search } = params;
      const response = await axiosInstance.get('rooms', { 
        params: { page, limit, search } 
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tải danh sách phòng',
        data: null,
        error: error.message
      };
    }
  },

  createRoom: async (data: CreateRoomDTO): Promise<RoomApiResponse> => {
    try {
      const response = await axiosInstance.post('rooms/admin', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể tạo phòng',
        data: null,
        error: error.message
      };
    }
  },

  updateRoom: async (id: number, data: UpdateRoomDTO): Promise<RoomApiResponse> => {
    try {
      const response = await axiosInstance.patch(`rooms/admin/${id}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể cập nhật phòng',
        data: null,
        error: error.message
      };
    }
  },

  deleteRoom: async (id: number): Promise<ApiResponse<void>> => {
    try {
      const response = await axiosInstance.delete(`rooms/admin/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'error',
        message: error.response?.data?.message || 'Không thể xóa phòng',
        data: null,
        error: error.message
      };
    }
  }
};
