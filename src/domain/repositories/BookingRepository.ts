// src/domain/repositories/BookingRepository.ts

import { ApiResponse, PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { 
  BookingResponseDTO, 
  BookingCreateDTO, 
  BookingSearchDTO,
  InvoiceResponseDTO,
  InvoiceCreateDTO,
  InvoiceSearchDTO
} from '@/domain/dto/BookingDTO';

export interface BookingRepository {
  // Booking methods
  createBooking(booking: BookingCreateDTO): Promise<ApiResponse<BookingResponseDTO>>;
  getBookingById(id: number): Promise<ApiResponse<BookingResponseDTO>>;
  getUserBookings(userId: number, criteria?: BookingSearchDTO): Promise<ApiResponse<PaginatedResponse<BookingResponseDTO>>>;
  updateBookingStatus(id: number, status: string): Promise<ApiResponse<BookingResponseDTO>>;
  
  // Invoice methods
  createInvoice(invoice: InvoiceCreateDTO): Promise<ApiResponse<InvoiceResponseDTO>>;
  getInvoiceById(id: number): Promise<ApiResponse<InvoiceResponseDTO>>;
  getUserInvoices(userId: number, criteria?: InvoiceSearchDTO): Promise<ApiResponse<PaginatedResponse<InvoiceResponseDTO>>>;
  getInvoiceByBookingId(bookingId: number): Promise<ApiResponse<InvoiceResponseDTO>>;
}
