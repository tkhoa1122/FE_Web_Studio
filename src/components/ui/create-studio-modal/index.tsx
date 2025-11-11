'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import { AdminStudioDTO } from '@/domain/dto/AdminTableDTO';
import { MapPin, DollarSign, Users, Package, FileText, CheckCircle } from 'lucide-react';
import { adminStudioAPI } from '@/services/api/studioAPI';

interface CreateStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateStudioModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateStudioModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<AdminStudioDTO, 'id' | 'totalBookings' | 'rating' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    address: '',
    type: '',
    price: 0,
    pricePerHour: 0,
    capacity: 0,
    area: 0,
    status: 'active',
    equipment: [],
    amenities: [],
    images: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.address || !formData.type) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminStudioAPI.createStudio(formData);
      if (response.success) {
        onSuccess();
        handleReset();
        onClose();
      } else {
        alert(response.message || 'Failed to create studio');
      }
    } catch (error) {
      alert('An error occurred while creating studio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      type: '',
      price: 0,
      pricePerHour: 0,
      capacity: 0,
      area: 0,
      status: 'active',
      equipment: [],
      amenities: [],
      images: [],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo Studio mới" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Studio Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên Studio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Studio A - Premium"
            required
          />
        </div>

        {/* Type and Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại Studio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Premium, Standard, Mini"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminStudioDTO['status'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Studio status"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: 123 Nguyễn Văn A, Quận 1, TP.HCM"
            required
          />
        </div>

        {/* Price and Capacity */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline" /> Giá cơ bản
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline" /> Giá/giờ
            </label>
            <input
              type="number"
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline" /> Sức chứa
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline" /> Diện tích (m²)
            </label>
            <input
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline" /> Mô tả
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Mô tả chi tiết về studio..."
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Package className="w-4 h-4 inline" /> Thiết bị
          </label>
          <input
            type="text"
            value={formData.equipment.join(', ')}
            onChange={(e) => setFormData({ ...formData, equipment: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Camera, Lighting, Microphone (ngăn cách bằng dấu phẩy)"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CheckCircle className="w-4 h-4 inline" /> Tiện nghi
          </label>
          <input
            type="text"
            value={formData.amenities.join(', ')}
            onChange={(e) => setFormData({ ...formData, amenities: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="WiFi, Parking, Air Conditioning (ngăn cách bằng dấu phẩy)"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            <CheckCircle className="w-4 h-4" />
            {isLoading ? 'Đang tạo...' : 'Tạo Studio'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
