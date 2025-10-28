// src/domain/entities/Invoice.ts

export interface Invoice {
  invoiceId: number;
  bookingId: number;
  totalAmount: number;
  roomPrice: number;
  equipmentPrice: number;
  status: InvoiceStatus;
  qrUrl: string;
  notes: string;
  items: InvoiceItem[];
  created_at: string;
}

export interface InvoiceItem {
  itemId: number;
  itemType: 'room' | 'equipment';
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type InvoiceStatus = 'unpaid' | 'paid' | 'cancelled';

export interface InvoiceCreateRequest {
  bookingid: number;
  notes: string;
}

export interface InvoiceResponse {
  invoiceId: number;
  bookingId: number;
  totalAmount: number;
  roomPrice: number;
  equipmentPrice: number;
  status: InvoiceStatus;
  qrUrl: string;
  notes: string;
  items: InvoiceItem[];
  created_at: string;
}
