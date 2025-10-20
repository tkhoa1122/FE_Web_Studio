// src/domain/entities/Studio.ts

export interface Studio {
  id: string;
  name: string;
  description: string;
  capacity: number; // Sức chứa tối đa
  area: number; // Diện tích (m²)
  pricePerHour: number;
  pricePerDay?: number; // Giá thuê theo ngày (ưu đãi)
  equipment: StudioEquipment[];
  images: string[];
  location: string;
  amenities: string[];
  status: StudioStatus; // trống/đang thuê/bảo trì/hỏng
  background?: string; // Background có sẵn
  lighting?: string; // Đèn chiếu sáng có sẵn
  rating?: number;
  totalBookings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudioEquipment {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
  status: EquipmentStatus; // còn/đang thuê/hỏng
  pricePerHour?: number;
  pricePerDay?: number;
}

export type StudioStatus = 'available' | 'occupied' | 'maintenance' | 'broken';
export type EquipmentStatus = 'available' | 'rented' | 'broken';
export type EquipmentType = 'camera' | 'lighting' | 'background' | 'prop' | 'furniture';

// Entity cho phụ kiện quảng cáo
export interface Accessory {
  id: string;
  name: string;
  description: string;
  type: AccessoryType;
  quantity: number;
  availableQuantity: number;
  pricePerHour: number;
  pricePerDay?: number;
  images: string[];
  status: EquipmentStatus;
  createdAt: string;
  updatedAt: string;
}

export type AccessoryType = 'standee' | 'table_chair' | 'backdrop' | 'decoration' | 'prop' | 'other';


