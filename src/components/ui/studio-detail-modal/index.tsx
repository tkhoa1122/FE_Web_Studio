'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import { AdminStudioDTO } from '@/domain/dto/AdminTableDTO';
import { MapPin, DollarSign, Users, Package, Image, FileText, CheckCircle, Trash2, Star } from 'lucide-react';
import { adminStudioAPI } from '@/services/api/studioAPI';

interface StudioDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studio: AdminStudioDTO | null;
  onUpdate: () => void;
}

export default function StudioDetailModal({
  isOpen,
  onClose,
  studio,
  onUpdate,
}: StudioDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<{
    name: string;
    description: string;
    address: string;
    type: string;
    price: number;
    pricePerHour: number;
    capacity: number;
    area: number;
    status: AdminStudioDTO['status'];
    equipment: string[];
    amenities: string[];
  }>({
    name: studio?.name || '',
    description: studio?.description || '',
    address: studio?.address || '',
    type: studio?.type || '',
    price: studio?.price || 0,
    pricePerHour: studio?.pricePerHour || 0,
    capacity: studio?.capacity || 0,
    area: studio?.area || 0,
    status: studio?.status || 'active',
    equipment: studio?.equipment || [],
    amenities: studio?.amenities || [],
  });

  React.useEffect(() => {
    if (studio) {
      setEditData({
        name: studio.name,
        description: studio.description,
        address: studio.address,
        type: studio.type,
        price: studio.price,
        pricePerHour: studio.pricePerHour,
        capacity: studio.capacity,
        area: studio.area,
        status: studio.status,
        equipment: studio.equipment,
        amenities: studio.amenities,
      });
    }
  }, [studio]);

  if (!studio) return null;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await adminStudioAPI.updateStudio(studio.id, editData);
      if (response.success) {
        onUpdate();
        setIsEditing(false);
        onClose();
      } else {
        alert(response.message || 'Failed to update studio');
      }
    } catch (error) {
      alert('An error occurred while updating studio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa studio này?')) return;

    setIsLoading(true);
    try {
      const response = await adminStudioAPI.deleteStudio(studio.id);
      if (response.success) {
        onUpdate();
        onClose();
      } else {
        alert(response.message || 'Failed to delete studio');
      }
    } catch (error) {
      alert('An error occurred while deleting studio');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: AdminStudioDTO['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết Studio" size="xl">
      <div className="space-y-6">
        {/* Studio Name and Status */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none w-full"
                aria-label="Studio name"
                placeholder="Tên studio"
              />
            ) : (
              <h3 className="text-2xl font-bold text-gray-900">{studio.name}</h3>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Tạo lúc {new Date(studio.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value as AdminStudioDTO['status'] })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            ) : (
              <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-lg ${getStatusColor(studio.status)}`}>
                {studio.status.charAt(0).toUpperCase() + studio.status.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Địa chỉ
            </h4>
            {isEditing ? (
              <input
                type="text"
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio address"
                placeholder="Địa chỉ"
              />
            ) : (
              <p className="text-gray-700">{studio.address}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Loại Studio
            </h4>
            {isEditing ? (
              <input
                type="text"
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio type"
                placeholder="Loại studio"
              />
            ) : (
              <p className="text-gray-700">{studio.type}</p>
            )}
          </div>
        </div>

        {/* Pricing and Capacity */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Giá cơ bản
            </h4>
            {isEditing ? (
              <input
                type="number"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio price"
                placeholder="Giá"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{studio.price.toLocaleString()} ₫</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Giá/giờ
            </h4>
            {isEditing ? (
              <input
                type="number"
                value={editData.pricePerHour}
                onChange={(e) => setEditData({ ...editData, pricePerHour: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio price per hour"
                placeholder="Giá/giờ"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{studio.pricePerHour.toLocaleString()} ₫</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Sức chứa
            </h4>
            {isEditing ? (
              <input
                type="number"
                value={editData.capacity}
                onChange={(e) => setEditData({ ...editData, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio capacity"
                placeholder="Sức chứa"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{studio.capacity} người</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Diện tích
            </h4>
            {isEditing ? (
              <input
                type="number"
                value={editData.area}
                onChange={(e) => setEditData({ ...editData, area: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Studio area"
                placeholder="Diện tích (m²)"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{studio.area} m²</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mô tả
          </h4>
          {isEditing ? (
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              aria-label="Studio description"
              placeholder="Mô tả chi tiết về studio"
            />
          ) : (
            <p className="text-gray-700">{studio.description}</p>
          )}
        </div>

        {/* Equipment */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Thiết bị
          </h4>
          {isEditing ? (
            <input
              type="text"
              value={editData.equipment.join(', ')}
              onChange={(e) => setEditData({ ...editData, equipment: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ngăn cách bằng dấu phẩy"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {studio.equipment.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Tiện nghi
          </h4>
          {isEditing ? (
            <input
              type="text"
              value={editData.amenities.join(', ')}
              onChange={(e) => setEditData({ ...editData, amenities: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ngăn cách bằng dấu phẩy"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {studio.amenities.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Tổng Bookings
            </h4>
            <p className="text-2xl font-bold text-gray-900">{studio.totalBookings}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Đánh giá
            </h4>
            <p className="text-2xl font-bold text-gray-900">{studio.rating} / 5.0</p>
          </div>
        </div>

        {/* Images */}
        {studio.images && studio.images.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Image className="w-5 h-5" />
              Hình ảnh
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {studio.images.slice(0, 6).map((image, index) => (
                <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img src={image} alt={`Studio ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

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
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
                Xóa Studio
              </button>
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
