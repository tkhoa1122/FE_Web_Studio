'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { CreateRoomDTO } from '@/domain/dto/RoomDTO';
import { roomAPI } from '@/services/api/roomAPI';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateRoomModal({ isOpen, onClose, onSuccess }: CreateRoomModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateRoomDTO>({
    roomtype: '',
    price: 0,
    checkintime: '12:00',
    checkouttime: '14:00',
    depositrequired: 0,
    description: '',
    banner: '',
    address: '',
    images: [],
    utilities: [],
  });

  const [newImageLink, setNewImageLink] = useState('');
  const [newUtilityName, setNewUtilityName] = useState('');

  const handleAddImage = () => {
    if (newImageLink.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, { imageLink: newImageLink.trim() }],
      });
      setNewImageLink('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddUtility = () => {
    if (newUtilityName.trim()) {
      setFormData({
        ...formData,
        utilities: [...formData.utilities, { utilityname: newUtilityName.trim() }],
      });
      setNewUtilityName('');
    }
  };

  const handleRemoveUtility = (index: number) => {
    setFormData({
      ...formData,
      utilities: formData.utilities.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (!formData.roomtype || !formData.address || formData.price <= 0) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    setIsCreating(true);
    try {
      const response = await roomAPI.createRoom(formData);
      if (response.success) {
        alert('Tạo phòng thành công!');
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          roomtype: '',
          price: 0,
          checkintime: '12:00',
          checkouttime: '14:00',
          depositrequired: 0,
          description: '',
          banner: '',
          address: '',
          images: [],
          utilities: [],
        });
      } else {
        alert(response.message || 'Tạo phòng thất bại!');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Có lỗi xảy ra khi tạo phòng!');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo phòng mới">
      <div className="space-y-4">
        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại phòng <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.roomtype}
            onChange={(e) => setFormData({ ...formData, roomtype: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Studio A"
            aria-label="Room type"
          />
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
            placeholder="VD: 123 Đường ABC, Quận 1, TP.HCM"
            aria-label="Address"
          />
        </div>

        {/* Price & Deposit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="150"
              min="0"
              aria-label="Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đặt cọc <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.depositrequired}
              onChange={(e) => setFormData({ ...formData, depositrequired: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
              min="0"
              aria-label="Deposit required"
            />
          </div>
        </div>

        {/* Check-in & Check-out Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giờ nhận phòng <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.checkintime}
              onChange={(e) => setFormData({ ...formData, checkintime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Check-in time"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giờ trả phòng <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.checkouttime}
              onChange={(e) => setFormData({ ...formData, checkouttime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Check-out time"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Studio riêng với không gian thoáng đãng..."
            aria-label="Description"
          />
        </div>

        {/* Banner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Banner
          </label>
          <input
            type="url"
            value={formData.banner}
            onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/banner.jpg"
            aria-label="Banner URL"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={newImageLink}
              onChange={(e) => setNewImageLink(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
              aria-label="Image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              aria-label="Add image"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {formData.images.length > 0 && (
            <div className="space-y-1">
              {formData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1 text-sm text-gray-600 truncate">{img.imageLink}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Utilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiện ích
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newUtilityName}
              onChange={(e) => setNewUtilityName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddUtility()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Wifi"
              aria-label="Utility name"
            />
            <button
              type="button"
              onClick={handleAddUtility}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              aria-label="Add utility"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {formData.utilities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.utilities.map((util, index) => (
                <div key={index} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  <span className="text-sm">{util.utilityname}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUtility(index)}
                    className="text-green-800 hover:text-green-900"
                    aria-label="Remove utility"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isCreating ? 'Đang tạo...' : 'Tạo phòng'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
