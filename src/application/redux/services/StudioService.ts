import { createAsyncThunk } from "@reduxjs/toolkit";
import { studioRepositoryImpl } from "../../../services/repositories/StudioRepositoryImpl";
import { GetAllStudiosUseCase } from "../../usecases/GetAllStudios";
import { GetStudioByIdUseCase } from "../../usecases/GetStudioById";
import { SearchStudiosUseCase } from "../../usecases/SearchStudios";
import { StudioResponseDTO, StudioSearchDTO } from "@/domain/dto/StudioDTO";
import { PaginatedResponse } from "@/domain/dto/common/ApiResponse";

// Repository đã được khởi tạo từ StudioRepositoryImpl.ts

// Lấy tất cả studio
export const fetchAllStudios = createAsyncThunk<StudioResponseDTO[]>(
  "studios/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const useCase = new GetAllStudiosUseCase(studioRepositoryImpl);
      const response = await useCase.execute();
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải danh sách studio");
    }
  }
);

// Lấy chi tiết studio theo ID
export const fetchStudioById = createAsyncThunk<
  StudioResponseDTO | null,
  string
>(
  "studios/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const useCase = new GetStudioByIdUseCase(studioRepositoryImpl);
      const response = await useCase.execute(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải thông tin studio");
    }
  }
);

// Tìm kiếm studio theo tiêu chí
export const searchStudios = createAsyncThunk<
  PaginatedResponse<StudioResponseDTO> | null,
  StudioSearchDTO
>(
  "studios/search",
  async (criteria: StudioSearchDTO, { rejectWithValue }) => {
    try {
      const useCase = new SearchStudiosUseCase(studioRepositoryImpl);
      const response = await useCase.execute(criteria);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tìm kiếm studio");
    }
  }
);
