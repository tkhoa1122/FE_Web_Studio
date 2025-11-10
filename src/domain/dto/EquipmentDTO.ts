// src/domain/dto/EquipmentDTO.ts

export interface EquipmentResponseDTO {
  equipmentId: number;
  roomId: number;
  equipmentType: string;
  equipmentName: string;
  image: string;
  quantity: number;
  price: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEquipmentDTO {
  roomid: number;
  equipmenttype: string;
  equipmentname: string;
  image: string;
  quantity: number;
  price: number;
  isavailable: boolean;
}

export interface UpdateEquipmentDTO {
  roomid?: number;
  equipmenttype?: string;
  equipmentname?: string;
  image?: string;
  quantity?: number;
  price?: number;
  isavailable?: boolean;
}

export interface EquipmentListParams {
  page?: number;
  limit?: number;
  roomid?: number;
  isavailable?: boolean;
}

export interface EquipmentListResponse {
  data: EquipmentResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
