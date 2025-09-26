// src/services/api/studioAPI.ts
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { CreateStudioRequestDTO, StudioResponseDTO, StudioSearchDTO } from '@/domain/dto/StudioDTO';
import { mockApiResponses } from '../data/mockData';

export const studioAPI = {
  getAllStudios: async (): Promise<ApiResponse<StudioResponseDTO[]>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.getAllStudios();
  },
  getStudioById: async (id: string): Promise<ApiResponse<StudioResponseDTO>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.getStudioById(id);
  },
  searchStudios: async (criteria: StudioSearchDTO): Promise<ApiResponse<PaginatedResponse<StudioResponseDTO>>> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockApiResponses.searchStudios(criteria);
  },
  createStudio: async (_data: CreateStudioRequestDTO): Promise<ApiResponse<StudioResponseDTO>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: null, error: 'mock', success: false };
  },
  updateStudio: async (_id: string, _data: Partial<CreateStudioRequestDTO>): Promise<ApiResponse<StudioResponseDTO>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: null, error: 'mock', success: false };
  },
  deleteStudio: async (_id: string): Promise<ApiResponse<boolean>> => {
    return { status: 'fail', message: 'Not implemented in mock', data: false, error: 'mock', success: false };
  },
  checkAvailability: async (_id: string, _s: string, _e: string): Promise<ApiResponse<boolean>> => {
    return { status: 'success', message: 'OK', data: true, error: null, success: true };
  },
};


