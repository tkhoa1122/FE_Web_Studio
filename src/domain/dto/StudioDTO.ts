// src/domain/dto/StudioDTO.ts

export interface CreateStudioRequestDTO {
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  equipment: string[];
  location: string;
  amenities: string[];
  images?: string[];
}

export interface StudioResponseDTO {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  equipment: string[];
  images: string[];
  location: string;
  amenities: string[];
  availability: boolean;
  rating?: number;
  totalBookings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudioSearchDTO {
  location?: string;
  minCapacity?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}


