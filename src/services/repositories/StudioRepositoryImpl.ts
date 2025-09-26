// src/services/repositories/StudioRepositoryImpl.ts
import { StudioRepository } from '@/domain/repositories/StudioRepository';
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { CreateStudioRequestDTO, StudioResponseDTO, StudioSearchDTO } from '@/domain/dto/StudioDTO';
import { studioAPI } from '../api/studioAPI';

export const studioRepositoryImpl: StudioRepository = {
  findAll(): Promise<ApiResponse<StudioResponseDTO[]>> {
    return studioAPI.getAllStudios();
  },
  findById(id: string): Promise<ApiResponse<StudioResponseDTO>> {
    return studioAPI.getStudioById(id);
  },
  search(criteria: StudioSearchDTO): Promise<ApiResponse<PaginatedResponse<StudioResponseDTO>>> {
    return studioAPI.searchStudios(criteria);
  },
  create(data: CreateStudioRequestDTO): Promise<ApiResponse<StudioResponseDTO>> {
    return studioAPI.createStudio(data);
  },
  update(id: string, data: Partial<CreateStudioRequestDTO>): Promise<ApiResponse<StudioResponseDTO>> {
    return studioAPI.updateStudio(id, data);
  },
  delete(id: string): Promise<ApiResponse<boolean>> {
    return studioAPI.deleteStudio(id);
  },
  checkAvailability(id: string, s: string, e: string): Promise<ApiResponse<boolean>> {
    return studioAPI.checkAvailability(id, s, e);
  },
};


