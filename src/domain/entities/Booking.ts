// src/domain/entities/Booking.ts

export interface Booking {
  bookingid: number;
  userid: number;
  starttime: string;
  endtime: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  details: BookingDetail[];
}

export interface BookingDetail {
  detailid: number;
  bookingid: number;
  roomid: number;
  quantity: number;
  room?: {
    roomid: number;
    roomtype: string;
    price: string;
    banner: string;
  };
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingCreateRequest {
  userid: number;
  starttime: string;
  endtime: string;
  details: Array<
    | {
        roomid: number;
        quantity: number;
      }
    | {
        equipmentid: number;
        quantity: number;
      }
  >;
}

export interface BookingResponse {
  bookingid: number;
  userid: number;
  starttime: string;
  endtime: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  details: BookingDetail[];
}
