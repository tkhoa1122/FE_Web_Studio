// src/domain/entities/Room.ts

export interface Room {
  roomid: number;
  roomtype: string;
  price: string;
  checkintime: string;
  checkouttime: string;
  depositrequired: string;
  description: string;
  address: string;
  banner: string;
  utilities: RoomUtility[];
  images: RoomImage[];
  equipments: RoomEquipment[];
}

export interface RoomUtility {
  utilityid: number;
  utilityname: string;
  roomid: number;
}

export interface RoomImage {
  roomImageId: number;
  imageLink: string;
  roomid: number;
}

export interface RoomEquipment {
  equipmentid: number;
  roomid: number;
  equipmenttype: string;
  equipmentname: string;
  quantity: number;
  price: string;
  isavailable: boolean;
}

// Entity cho Equipment độc lập
export interface Equipment {
  equipmentid: number;
  roomid: number;
  equipmenttype: string;
  equipmentname: string;
  quantity: number;
  isavailable: boolean;
}

export type EquipmentType = 'Light' | 'Camera' | 'Audio' | 'Video' | 'Other';
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'unavailable';
