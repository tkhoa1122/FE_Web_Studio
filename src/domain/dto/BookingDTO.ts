// src/domain/dto/BookingDTO.ts

import { BookingResponse, BookingCreateRequest, BookingStatus } from '../entities/Booking';
import { InvoiceResponse, InvoiceCreateRequest } from '../entities/Invoice';
import { ApiResponse, PaginatedResponse } from './common/ApiResponse';

export interface BookingResponseDTO extends BookingResponse {}

export interface BookingCreateDTO extends BookingCreateRequest {}

export interface BookingSearchDTO {
  status?: BookingStatus;
  userid?: number;
  page?: number;
  limit?: number;
}

export interface InvoiceResponseDTO extends InvoiceResponse {}

export interface InvoiceCreateDTO extends InvoiceCreateRequest {}

export interface InvoiceSearchDTO {
  bookingid?: number;
  status?: string;
  page?: number;
  limit?: number;
}
