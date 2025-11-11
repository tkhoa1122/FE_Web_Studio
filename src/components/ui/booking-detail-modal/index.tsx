'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import { AdminBookingDTO } from '@/domain/dto/AdminTableDTO';
import { Calendar, Clock, User, Mail, Phone, MapPin, DollarSign, FileText, CheckCircle, XCircle } from 'lucide-react';
import { adminBookingAPI } from '@/services/api/bookingAPI';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: AdminBookingDTO | null;
  onUpdate: () => void;
}

export default function BookingDetailModal({
  isOpen,
  onClose,
  booking,
  onUpdate,
}: BookingDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<{
    status: AdminBookingDTO['status'];
    paymentStatus: AdminBookingDTO['paymentStatus'];
    notes: string;
  }>({
    status: booking?.status || 'pending',
    paymentStatus: booking?.paymentStatus || 'pending',
    notes: booking?.notes || '',
  });

  React.useEffect(() => {
    if (booking) {
      setEditData({
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        notes: booking.notes || '',
      });
    }
  }, [booking]);

  if (!booking) return null;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await adminBookingAPI.updateBooking(booking.id, editData);
      if (response.success) {
        onUpdate();
        setIsEditing(false);
        onClose();
      } else {
        alert(response.message || 'Failed to update booking');
      }
    } catch (error) {
      alert('An error occurred while updating booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Bạn có chắc chắn muốn hủy booking này?')) return;

    setIsLoading(true);
    try {
      const response = await adminBookingAPI.cancelBooking(booking.id);
      if (response.success) {
        onUpdate();
        onClose();
      } else {
        alert(response.message || 'Failed to cancel booking');
      }
    } catch (error) {
      alert('An error occurred while cancelling booking');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: AdminBookingDTO['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: AdminBookingDTO['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết Booking" size="lg">
      <div className="space-y-6">
        {/* Booking Code and Status */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{booking.bookingCode}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Tạo lúc {new Date(booking.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value as AdminBookingDTO['status'] })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Booking status"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-lg ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-5 h-5" />
            Thông tin khách hàng
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4 text-gray-400" />
              <span>{booking.user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{booking.user.email}</span>
            </div>
            {booking.user.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{booking.user.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Studio Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Thông tin Studio
          </h4>
          <div className="space-y-2">
            <p className="text-gray-900 font-medium">{booking.studio.name}</p>
            <p className="text-sm text-gray-600">{booking.studio.type}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Ngày & Giờ
            </h4>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(booking.date).toLocaleDateString('vi-VN')}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {new Date(booking.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} -{' '}
                {new Date(booking.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-gray-600">Thời lượng: {booking.duration} giờ</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Thanh toán
            </h4>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                {booking.amount.toLocaleString()} ₫
              </p>
              {isEditing ? (
                <select
                  value={editData.paymentStatus}
                  onChange={(e) => setEditData({ ...editData, paymentStatus: e.target.value as AdminBookingDTO['paymentStatus'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Payment status"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              ) : (
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                  {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ghi chú
          </h4>
          {isEditing ? (
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Thêm ghi chú..."
            />
          ) : (
            <p className="text-gray-700">{booking.notes || 'Không có ghi chú'}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                <CheckCircle className="w-4 h-4" />
                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </>
          ) : (
            <>
              {booking.status !== 'cancelled' && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  <XCircle className="w-4 h-4" />
                  Hủy Booking
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
