// src/application/redux/services/BookingService.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingRepositoryImpl } from '../../../services/repositories/BookingRepositoryImpl';
import { 
  BookingResponseDTO, 
  BookingCreateDTO, 
  BookingSearchDTO,
  InvoiceResponseDTO,
  InvoiceCreateDTO,
  InvoiceSearchDTO
} from '@/domain/dto/BookingDTO';

// Booking async thunks
export const createBooking = createAsyncThunk<
  BookingResponseDTO,
  BookingCreateDTO,
  { rejectValue: string }
>(
  "bookings/create",
  async (booking: BookingCreateDTO, { rejectWithValue }) => {
    try {
      console.log('BookingService: Creating booking:', booking);
      const response = await bookingRepositoryImpl.createBooking(booking);
      console.log('BookingService: Booking response:', response);
      
      if (!response.success) {
        console.log('BookingService: Booking failed:', response.message);
        return rejectWithValue(response.message);
      }
      
      const bookingData = response.data;
      if (!bookingData) {
        return rejectWithValue("Dữ liệu booking rỗng");
      }
      console.log('BookingService: Returning booking:', bookingData);
      return bookingData;
    } catch (error: any) {
      console.log('BookingService: Error:', error);
      return rejectWithValue(error.message || "Không thể tạo booking");
    }
  }
);

export const getBookingById = createAsyncThunk<
  BookingResponseDTO,
  number,
  { rejectValue: string }
>(
  "bookings/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.getBookingById(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      if (!response.data) {
        return rejectWithValue("Không tìm thấy booking");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải thông tin booking");
    }
  }
);

export const getUserBookings = createAsyncThunk<
  BookingResponseDTO[],
  { userId: number; criteria?: BookingSearchDTO },
  { rejectValue: string }
>(
  "bookings/getUserBookings",
  async ({ userId, criteria }, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.getUserBookings(userId, criteria);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      // Accept both shapes: { data: Booking[] } or { data: { items: Booking[] } }
      const raw = (response as any).data;
      if (Array.isArray(raw)) {
        return raw;
      }
      return raw?.items || [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải danh sách booking");
    }
  }
);

export const updateBookingStatus = createAsyncThunk<
  BookingResponseDTO,
  { id: number; status: string },
  { rejectValue: string }
>(
  "bookings/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.updateBookingStatus(id, status);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      if (!response.data) {
        return rejectWithValue("Cập nhật trạng thái thất bại");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể cập nhật trạng thái booking");
    }
  }
);

// Invoice async thunks
export const createInvoice = createAsyncThunk<
  InvoiceResponseDTO,
  InvoiceCreateDTO,
  { rejectValue: string }
>(
  "invoices/create",
  async (invoice: InvoiceCreateDTO, { rejectWithValue }) => {
    try {
      console.log('BookingService: Creating invoice:', invoice);
      const response = await bookingRepositoryImpl.createInvoice(invoice);
      console.log('BookingService: Invoice response:', response);
      
      if (!response.success) {
        console.log('BookingService: Invoice failed:', response.message);
        return rejectWithValue(response.message);
      }
      
      const invoiceData = response.data;
      if (!invoiceData) {
        return rejectWithValue("Dữ liệu hóa đơn rỗng");
      }
      console.log('BookingService: Returning invoice:', invoiceData);
      return invoiceData;
    } catch (error: any) {
      console.log('BookingService: Error:', error);
      return rejectWithValue(error.message || "Không thể tạo hóa đơn");
    }
  }
);

export const getInvoiceById = createAsyncThunk<
  InvoiceResponseDTO,
  number,
  { rejectValue: string }
>(
  "invoices/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.getInvoiceById(id);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      if (!response.data) {
        return rejectWithValue("Không tìm thấy hóa đơn");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải thông tin hóa đơn");
    }
  }
);

export const getUserInvoices = createAsyncThunk<
  InvoiceResponseDTO[],
  { userId: number; criteria?: InvoiceSearchDTO },
  { rejectValue: string }
>(
  "invoices/getUserInvoices",
  async ({ userId, criteria }, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.getUserInvoices(userId, criteria);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      const raw = (response as any).data;
      if (Array.isArray(raw)) {
        return raw;
      }
      return raw?.items || [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải danh sách hóa đơn");
    }
  }
);

export const getInvoiceByBookingId = createAsyncThunk<
  InvoiceResponseDTO,
  number,
  { rejectValue: string }
>(
  "invoices/getByBookingId",
  async (bookingId: number, { rejectWithValue }) => {
    try {
      const response = await bookingRepositoryImpl.getInvoiceByBookingId(bookingId);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      if (!response.data) {
        return rejectWithValue("Không tìm thấy hóa đơn của booking này");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Không thể tải hóa đơn theo booking");
    }
  }
);
