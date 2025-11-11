'use client';
import React from 'react';
import QRCodeImage from './QRCode';

type InvoiceItem = {
  itemId: number;
  itemName: string;
  itemType?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type RoomInfo = {
  roomtype: string;
  address: string;
  checkintime: string;
  checkouttime: string;
  banner?: string;
  images?: { imageLink: string }[];
};

interface Props {
  invoiceId: number | string;
  createdAt: string;
  status: 'unpaid' | 'paid' | string;
  items: InvoiceItem[];
  totalAmount: number;
  qrUrl?: string | null;
  bookingTime?: { start?: string; end?: string };
  room?: RoomInfo | null;
}

const formatPrice = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const InvoiceDetail: React.FC<Props> = ({ invoiceId, createdAt, status, items, totalAmount, qrUrl, bookingTime, room }) => {
  const start = bookingTime?.start ? new Date(bookingTime.start) : null;
  const end = bookingTime?.end ? new Date(bookingTime.end) : null;
  const hours = start && end ? Math.max(1, (end.getTime() - start.getTime()) / 3600000) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-3 sm:pb-4 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hóa đơn #{invoiceId}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Ngày tạo: {new Date(createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
          <span className={`self-start sm:self-auto px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${status === 'unpaid' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {status === 'unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Studio info */}
        {room && (
          <div className="md:col-span-3 border rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <img src={room.banner || room.images?.[0]?.imageLink || ''} className="w-20 sm:w-24 h-20 sm:h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-base sm:text-lg font-bold text-gray-900">{room.roomtype}</p>
                <p className="text-xs sm:text-sm text-gray-600 break-words">{room.address}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Giờ hoạt động: {room.checkintime} - {room.checkouttime}</p>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="md:col-span-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Chi tiết hóa đơn</h3>
          <div className="divide-y rounded-xl border">
            {items.map((item) => {
              const isRoom = (item as any).itemType === 'room' || item.itemName?.toLowerCase().includes('studio') || item.itemName?.toLowerCase().includes('room');
              return (
                <div key={item.itemId} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{item.itemName}</p>
                    {isRoom && start && end ? (
                      <p className="text-xs sm:text-sm text-gray-600">Thời gian: {start.toLocaleTimeString('vi-VN')} - {end.toLocaleTimeString('vi-VN')} ({Number(hours).toFixed(0)} giờ)</p>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    )}
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{formatPrice(item.totalPrice)} ₫</p>
                    <p className="text-xs sm:text-sm text-gray-600">{formatPrice(item.unitPrice)} ₫/giờ</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mt-4 sm:mt-6 text-lg sm:text-xl font-bold text-gray-900">
            <span>Tổng cộng</span>
            <span className="flex-shrink-0">{formatPrice(totalAmount)} ₫</span>
          </div>
        </div>

        {/* QR */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 sticky top-20">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Thanh toán bằng QR</h4>
            {qrUrl ? (
              <QRCodeImage url={qrUrl} alt={`QR hóa đơn #${invoiceId}`} />
            ) : (
              <p className="text-xs sm:text-sm text-gray-600">Không có liên kết thanh toán.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;


