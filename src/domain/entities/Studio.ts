// src/domain/entities/Studio.ts

export interface Studio {
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
}


