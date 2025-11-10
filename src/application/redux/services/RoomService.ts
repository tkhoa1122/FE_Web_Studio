// src/application/redux/services/RoomService.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { roomRepositoryImpl } from "../../../services/repositories/RoomRepositoryImpl";
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
import { PaginatedResponse } from "@/domain/dto/common/ApiResponse";

// Lấy tất cả phòng
export const fetchAllRooms = createAsyncThunk<RoomResponseDTO[]>(
  "rooms/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("RoomService: Starting fetchAllRooms");
      const response = await roomRepositoryImpl.findAll();
      console.log("RoomService: API response:", response);

      if (!response.success) {
        console.log("RoomService: API failed:", response.message);
        return rejectWithValue(response.message);
      }

      const rooms = response.data || [];
      console.log("RoomService: Returning rooms:", rooms);
      return rooms;
    } catch (error: any) {
      console.log("RoomService: Error:", error);
      return rejectWithValue(error.message || "Không thể tải danh sách phòng");
    }
  }
);

// Lấy chi tiết phòng theo ID
export const fetchRoomById = createAsyncThunk<RoomResponseDTO | null, number>(
  "rooms/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await roomRepositoryImpl.findById(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải thông tin phòng");
    }
  }
);

// Tìm kiếm phòng theo tiêu chí
export const searchRooms = createAsyncThunk<
  PaginatedResponse<RoomResponseDTO> | null,
  RoomSearchDTO
>("rooms/search", async (criteria: RoomSearchDTO, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.search(criteria);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || null;
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể tìm kiếm phòng");
  }
});

// Lấy tất cả thiết bị
export const fetchAllEquipments = createAsyncThunk<EquipmentResponseDTO[]>(
  "equipments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await roomRepositoryImpl.findAllEquipments();
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Không thể tải danh sách thiết bị"
      );
    }
  }
);

// Lấy thiết bị theo phòng
export const fetchEquipmentsByRoomId = createAsyncThunk<
  EquipmentResponseDTO[],
  number
>("equipments/fetchByRoomId", async (roomId: number, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.findEquipmentsByRoomId(roomId);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || [];
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể tải thiết bị của phòng");
  }
});

// Lấy thiết bị theo ID
export const fetchEquipmentById = createAsyncThunk<
  EquipmentResponseDTO | null,
  number
>("equipments/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.getEquipmentById(id);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || null;
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể tải thông tin thiết bị");
  }
});

// Tìm kiếm thiết bị
export const searchEquipments = createAsyncThunk<
  PaginatedResponse<EquipmentResponseDTO> | null,
  EquipmentSearchDTO
>(
  "equipments/search",
  async (criteria: EquipmentSearchDTO, { rejectWithValue }) => {
    try {
      const response = await roomRepositoryImpl.searchEquipments(criteria);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tìm kiếm thiết bị");
    }
  }
);

// Admin Operations

// Lấy danh sách phòng với pagination
export const fetchRoomsList = createAsyncThunk<
  RoomListResponse | null,
  RoomListParams
>("rooms/fetchList", async (params: RoomListParams, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.getRoomsList(params);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || null;
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể tải danh sách phòng");
  }
});

// Tạo phòng mới
export const createRoom = createAsyncThunk<
  RoomResponseDTO | null,
  CreateRoomDTO
>("rooms/create", async (data: CreateRoomDTO, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.createRoom(data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || null;
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể tạo phòng");
  }
});

// Cập nhật phòng
export const updateRoom = createAsyncThunk<
  RoomResponseDTO | null,
  { id: number; data: UpdateRoomDTO }
>("rooms/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await roomRepositoryImpl.updateRoom(id, data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.data || null;
  } catch (error: any) {
    return rejectWithValue(error.message || "Không thể cập nhật phòng");
  }
});

// Xóa phòng
export const deleteRoom = createAsyncThunk<number, number>(
  "rooms/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await roomRepositoryImpl.deleteRoom(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể xóa phòng");
    }
  }
);
