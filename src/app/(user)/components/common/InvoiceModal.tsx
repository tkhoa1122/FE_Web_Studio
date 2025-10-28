'use client';
import React from 'react';
import { X } from 'lucide-react';
import InvoiceDetail from './InvoiceDetail';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoice: any | null;
  room: any | null;
  bookingTime?: { start?: string; end?: string };
}

const InvoiceModal: React.FC<Props> = ({ isOpen, onClose, invoice, room, bookingTime }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl md:max-w-4xl shadow-xl relative max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
        {invoice && (
          <div className="p-4 md:p-6">
            <InvoiceDetail
              invoiceId={invoice.invoiceId}
              createdAt={invoice.created_at}
              status={invoice.status}
              items={invoice.items}
              totalAmount={invoice.totalAmount}
              qrUrl={invoice.qrUrl}
              bookingTime={bookingTime}
              room={room}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceModal;


