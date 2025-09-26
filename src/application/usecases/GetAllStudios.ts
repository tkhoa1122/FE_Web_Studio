// src/services/usecases/GetAllStudios.ts
import { StudioRepository } from '@/domain/repositories/StudioRepository';
import { StudioResponseDTO } from '@/domain/dto/StudioDTO';
import { ApiResponse } from '@/domain/dto/common/ApiResponse';

export class GetAllStudiosUseCase {
  constructor(private readonly repo: StudioRepository) {}

  execute(): Promise<ApiResponse<StudioResponseDTO[]>> {
    return this.repo.findAll();
  }
}


