// src/domain/dto/StudioDTO.ts

export interface CreateStudioRequestDTO {
  name: string;
  description: string;
  capacity: number;
  area: number;
  pricePerHour: number;
  pricePerDay?: number;
  equipment: string[];
  location: string;
  amenities: string[];
  background?: string;
  lighting?: string;
  images?: string[];
}

export interface StudioResponseDTO {
  id: string;
  name: string;
  description: string;
  capacity: number;
  area: number;
  pricePerHour: number;
  pricePerDay?: number;
  equipment: string[];
  images: string[];
  location: string;
  amenities: string[];
  status: string;
  background?: string;
  lighting?: string;
  rating?: number;
  totalBookings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudioSearchDTO {
  location?: string;
  minCapacity?: number;
  maxPrice?: number;
  status?: string;
  page?: number;
  limit?: number;
}

// DTO cho phụ kiện
export interface AccessoryResponseDTO {
  id: string;
  name: string;
  description: string;
  type: string;
  quantity: number;
  availableQuantity: number;
  pricePerHour: number;
  pricePerDay?: number;
  images: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// DTO cho gói thuê studio
export interface StudioPackageDTO {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  features: string[];
  studioIds: string[];
  accessoryIds: string[];
  isPopular?: boolean;
}


