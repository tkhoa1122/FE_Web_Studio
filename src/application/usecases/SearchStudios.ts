// src/services/usecases/SearchStudios.ts
import { StudioRepository } from '@/domain/repositories/StudioRepository';
import { StudioResponseDTO, StudioSearchDTO } from '@/domain/dto/StudioDTO';
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';

export class SearchStudiosUseCase {
  constructor(private readonly repo: StudioRepository) {}

  execute(criteria: StudioSearchDTO): Promise<ApiResponse<PaginatedResponse<StudioResponseDTO>>> {
    return this.repo.search(criteria);
  }
}


