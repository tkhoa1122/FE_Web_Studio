// src/domain/repositories/StudioRepository.ts
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { CreateStudioRequestDTO, StudioResponseDTO, StudioSearchDTO } from '@/domain/dto/StudioDTO';

export interface StudioRepository {
  findAll(): Promise<ApiResponse<StudioResponseDTO[]>>;
  findById(id: string): Promise<ApiResponse<StudioResponseDTO>>;
  search(criteria: StudioSearchDTO): Promise<ApiResponse<PaginatedResponse<StudioResponseDTO>>>;
  create(data: CreateStudioRequestDTO): Promise<ApiResponse<StudioResponseDTO>>;
  update(id: string, data: Partial<CreateStudioRequestDTO>): Promise<ApiResponse<StudioResponseDTO>>;
  delete(id: string): Promise<ApiResponse<boolean>>;
  checkAvailability(id: string, startTime: string, endTime: string): Promise<ApiResponse<boolean>>;
}


