// src/services/repositories/BookingRepositoryImpl.ts

import { BookingRepository } from '@/domain/repositories/BookingRepository';
import { 
  BookingResponseDTO, 
  BookingCreateDTO, 
  BookingSearchDTO,
  InvoiceResponseDTO,
  InvoiceCreateDTO,
  InvoiceSearchDTO
} from '@/domain/dto/BookingDTO';
import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { bookingAPI } from '../api/bookingAPI';

export const bookingRepositoryImpl: BookingRepository = {
  // Booking methods
  createBooking(booking: BookingCreateDTO): Promise<ApiResponse<BookingResponseDTO>> {
    return bookingAPI.createBooking(booking);
  },

  getBookingById(id: number): Promise<ApiResponse<BookingResponseDTO>> {
    return bookingAPI.getBookingById(id);
  },

  getUserBookings(userId: number, criteria?: BookingSearchDTO): Promise<ApiResponse<PaginatedResponse<BookingResponseDTO>>> {
    return bookingAPI.getUserBookings(userId, criteria);
  },

  updateBookingStatus(id: number, status: string): Promise<ApiResponse<BookingResponseDTO>> {
    return bookingAPI.updateBookingStatus(id, status);
  },

  // Invoice methods
  createInvoice(invoice: InvoiceCreateDTO): Promise<ApiResponse<InvoiceResponseDTO>> {
    return bookingAPI.createInvoice(invoice);
  },

  getInvoiceById(id: number): Promise<ApiResponse<InvoiceResponseDTO>> {
    return bookingAPI.getInvoiceById(id);
  },

  getUserInvoices(userId: number, criteria?: InvoiceSearchDTO): Promise<ApiResponse<PaginatedResponse<InvoiceResponseDTO>>> {
    return bookingAPI.getUserInvoices(userId, criteria);
  },

  getInvoiceByBookingId(bookingId: number): Promise<ApiResponse<InvoiceResponseDTO>> {
    return bookingAPI.getInvoiceByBookingId(bookingId);
  }
};
