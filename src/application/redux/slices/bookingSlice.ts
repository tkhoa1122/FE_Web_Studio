// src/application/redux/slices/bookingSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createBooking,
  getBookingById,
  getUserBookings,
  createInvoice,
  getInvoiceById,
  getInvoiceByBookingId,
  getUserInvoices,
} from '@/application/redux/services/BookingService';
import { BookingResponseDTO, InvoiceResponseDTO } from '@/domain/dto/BookingDTO';

interface BookingState {
  bookings: BookingResponseDTO[];
  invoices: InvoiceResponseDTO[];
  selectedBooking: BookingResponseDTO | null;
  selectedInvoice: InvoiceResponseDTO | null;
  loading: boolean;
  error: string | null;
  searchResults: {
    bookings: BookingResponseDTO[];
    invoices: InvoiceResponseDTO[];
  };
}

const initialState: BookingState = {
  bookings: [],
  invoices: [],
  selectedBooking: null,
  selectedInvoice: null,
  loading: false,
  error: null,
  searchResults: {
    bookings: [],
    invoices: []
  }
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setBookings: (state, action: PayloadAction<BookingResponseDTO[]>) => {
      state.bookings = action.payload;
    },
    setInvoices: (state, action: PayloadAction<InvoiceResponseDTO[]>) => {
      state.invoices = action.payload;
    },
    setSelectedBooking: (state, action: PayloadAction<BookingResponseDTO | null>) => {
      state.selectedBooking = action.payload;
    },
    setSelectedInvoice: (state, action: PayloadAction<InvoiceResponseDTO | null>) => {
      state.selectedInvoice = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<{
      bookings: BookingResponseDTO[];
      invoices: InvoiceResponseDTO[];
    }>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = {
        bookings: [],
        invoices: []
      };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle createBooking
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<BookingResponseDTO>) => {
        state.loading = false;
        state.selectedBooking = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getBookingById
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action: PayloadAction<BookingResponseDTO>) => {
        state.loading = false;
        state.selectedBooking = action.payload;
        state.error = null;
      })
      .addCase(getBookingById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getUserBookings
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action: PayloadAction<BookingResponseDTO[]>) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getUserBookings.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createInvoice
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedInvoice = action.payload;
        state.error = null;
      })
      .addCase(createInvoice.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getInvoiceById
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedInvoice = action.payload;
        state.error = null;
      })
      .addCase(getInvoiceById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getInvoiceByBookingId
      .addCase(getInvoiceByBookingId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedInvoice = null;
      })
      .addCase(getInvoiceByBookingId.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedInvoice = action.payload;
        state.error = null;
      })
      .addCase(getInvoiceByBookingId.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getUserInvoices
      .addCase(getUserInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInvoices.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.invoices = action.payload;
        state.error = null;
      })
      .addCase(getUserInvoices.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setLoading,
  setError,
  setBookings,
  setInvoices,
  setSelectedBooking,
  setSelectedInvoice,
  setSearchResults,
  clearSearchResults,
  clearError
} = bookingSlice.actions;

export default bookingSlice.reducer;
