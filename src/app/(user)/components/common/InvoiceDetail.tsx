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
      <div className="px-6 md:px-10 pt-8 pb-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hóa đơn #{invoiceId}</h2>
            <p className="text-sm text-gray-600 mt-1">Ngày tạo: {new Date(createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
          <span className={`self-start md:self-auto px-3 py-1 rounded-full text-sm font-semibold ${status === 'unpaid' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {status === 'unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Studio info */}
        {room && (
          <div className="lg:col-span-3 border rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-4">
              <img src={room.banner || room.images?.[0]?.imageLink || ''} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">{room.roomtype}</p>
                <p className="text-sm text-gray-600">{room.address}</p>
                <p className="text-sm text-gray-600 mt-1">Giờ hoạt động: {room.checkintime} - {room.checkouttime}</p>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết hóa đơn</h3>
          <div className="divide-y rounded-xl border">
            {items.map((item) => {
              const isRoom = (item as any).itemType === 'room' || item.itemName?.toLowerCase().includes('studio') || item.itemName?.toLowerCase().includes('room');
              return (
                <div key={item.itemId} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.itemName}</p>
                    {isRoom && start && end ? (
                      <p className="text-sm text-gray-600">Thời gian: {start.toLocaleTimeString('vi-VN')} - {end.toLocaleTimeString('vi-VN')} ({Number(hours).toFixed(0)} giờ)</p>
                    ) : (
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(item.totalPrice)} ₫</p>
                    <p className="text-sm text-gray-600">{formatPrice(item.unitPrice)} ₫/giờ</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-6 text-xl font-bold text-gray-900">
            <span>Tổng cộng</span>
            <span>{formatPrice(totalAmount)} ₫</span>
          </div>
        </div>

        {/* QR */}
        <div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Thanh toán bằng QR</h4>
            {qrUrl ? (
              <QRCodeImage url={qrUrl} alt={`QR hóa đơn #${invoiceId}`} />
            ) : (
              <p className="text-sm text-gray-600">Không có liên kết thanh toán.</p>
            )}
            {qrUrl && (
              <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white font-semibold hover:shadow-lg">
                Mở liên kết thanh toán
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;


