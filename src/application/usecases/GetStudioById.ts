// src/services/usecases/GetStudioById.ts
import { StudioRepository } from '@/domain/repositories/StudioRepository';
import { StudioResponseDTO } from '@/domain/dto/StudioDTO';
import { ApiResponse } from '@/domain/dto/common/ApiResponse';

export class GetStudioByIdUseCase {
  constructor(private readonly repo: StudioRepository) {}

  execute(id: string): Promise<ApiResponse<StudioResponseDTO>> {
    return this.repo.findById(id);
  }
}


