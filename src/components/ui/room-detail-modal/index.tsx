'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Save, MapPin, DollarSign, Clock, Image as ImageIcon, Wrench, Wifi } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { RoomResponseDTO, UpdateRoomDTO } from '@/domain/dto/RoomDTO';
import { UpdateEquipmentDTO } from '@/domain/dto/EquipmentDTO';
import { roomAPI } from '@/services/api/roomAPI';
import { updateEquipment as updateEquipmentAPI } from '@/services/api/equipmentAPI';

type EditableEquipment = {
  equipmentid: number;
  roomid: number;
  equipmenttype: string;
  equipmentname: string;
  image: string;
  quantity: number;
  price: number;
  isavailable: boolean;
};

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomResponseDTO | null;
  onUpdate: () => void;
}

export default function RoomDetailModal({ isOpen, onClose, room, onUpdate }: RoomDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateRoomDTO>({
    roomtype: '',
    price: 0,
    checkintime: '',
    checkouttime: '',
    depositrequired: 0,
    description: '',
    banner: '',
    address: '',
    images: [],
    utilities: [],
  });

  const [equipmentEdits, setEquipmentEdits] = useState<EditableEquipment[]>([]);

  const syncFormWithRoom = useCallback((roomData: RoomResponseDTO) => {
    setFormData({
      roomtype: roomData.roomtype,
      price: Number(roomData.price),
      checkintime: roomData.checkintime,
      checkouttime: roomData.checkouttime,
      depositrequired: Number(roomData.depositrequired),
      description: roomData.description || '',
      banner: roomData.banner || '',
      address: roomData.address,
      images: roomData.images?.map((img) => ({ imageLink: img.imageLink })) || [],
      utilities: roomData.utilities?.map((util) => ({ utilityname: util.utilityname })) || [],
    });

    setEquipmentEdits(
      (roomData.equipments ?? []).map((equipment) => ({
        equipmentid: equipment.equipmentid,
        roomid: equipment.roomid,
        equipmenttype: equipment.equipmenttype,
        equipmentname: equipment.equipmentname,
        image: String((equipment as any).image ?? ''),
        quantity: Number(equipment.quantity ?? 0),
        price: Number((equipment as any).price ?? 0),
        isavailable: Boolean(equipment.isavailable),
      }))
    );
  }, []);

  useEffect(() => {
    if (room) {
      syncFormWithRoom(room);
    } else {
      setEquipmentEdits([]);
    }
  }, [room, syncFormWithRoom]);

  const handleEquipmentChange = useCallback(
    <K extends keyof EditableEquipment>(
      equipmentId: number,
      field: K,
      value: EditableEquipment[K]
    ) => {
      setEquipmentEdits((prev) =>
        prev.map((item) =>
          item.equipmentid === equipmentId ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  const buildEquipmentUpdates = useCallback((): Array<{
    id: number;
    data: UpdateEquipmentDTO;
  }> => {
    if (!room?.equipments) return [];

    return equipmentEdits.reduce<Array<{ id: number; data: UpdateEquipmentDTO }>>(
      (accumulator, current) => {
        const original = room.equipments?.find(
          (item) => item.equipmentid === current.equipmentid
        );

        if (!original) {
          return accumulator;
        }

        const originalImage = String((original as any).image ?? '');
        const originalPrice = Number((original as any).price ?? 0);

        const hasChanges =
          current.equipmentname !== original.equipmentname ||
          current.equipmenttype !== original.equipmenttype ||
          current.image !== originalImage ||
          current.quantity !== original.quantity ||
          current.price !== originalPrice ||
          current.isavailable !== original.isavailable;

        if (hasChanges) {
          const payload: UpdateEquipmentDTO = {
            roomid: current.roomid,
            equipmenttype: current.equipmenttype,
            equipmentname: current.equipmentname,
            image: current.image,
            quantity: current.quantity,
            price: current.price,
            isavailable: current.isavailable,
          };

          accumulator.push({ id: current.equipmentid, data: payload });
        }

        return accumulator;
      },
      []
    );
  }, [equipmentEdits, room]);

  const hasRoomFieldChanges = useCallback(() => {
    if (!room) return false;

    if (formData.roomtype !== room.roomtype) return true;
    if (formData.address !== room.address) return true;
    if (formData.price !== Number(room.price)) return true;
    if (formData.depositrequired !== Number(room.depositrequired)) return true;
    if (formData.checkintime !== room.checkintime) return true;
    if (formData.checkouttime !== room.checkouttime) return true;
    if ((formData.description || '') !== (room.description || '')) return true;
    if ((formData.banner || '') !== (room.banner || '')) return true;

    return false;
  }, [formData, room]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    if (room) {
      syncFormWithRoom(room);
    }
  }, [room, syncFormWithRoom]);

  const handleSave = async () => {
    if (!room) return;

    const equipmentUpdates = buildEquipmentUpdates();
    const shouldUpdateRoom = hasRoomFieldChanges();

    if (!shouldUpdateRoom && equipmentUpdates.length === 0) {
      alert('Không có thay đổi cần lưu');
      return;
    }

    setIsSaving(true);
    try {
      if (shouldUpdateRoom) {
        const response = await roomAPI.updateRoom(room.roomid, formData);
        if (!response.success) {
          throw new Error(response.message || 'Không thể cập nhật thông tin phòng');
        }
      }

      if (equipmentUpdates.length > 0) {
        const results = await Promise.allSettled(
          equipmentUpdates.map(({ id, data }) => updateEquipmentAPI(id, data))
        );

        const hasFailure = results.some((result) => result.status === 'rejected');

        if (hasFailure) {
          throw new Error('Không thể cập nhật một số thiết bị');
        }
      }

      alert('Cập nhật phòng thành công!');
      setIsEditing(false);
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error('Error updating room:', error);
      alert(error?.message || 'Có lỗi xảy ra khi cập nhật phòng!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!room) return;

    if (!confirm('Bạn có chắc chắn muốn xóa phòng này?')) return;

    try {
      const response = await roomAPI.deleteRoom(room.roomid);
      if (response.success) {
        alert('Xóa phòng thành công!');
        onUpdate();
        onClose();
      } else {
        alert(response.message || 'Xóa thất bại!');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Có lỗi xảy ra khi xóa phòng!');
    }
  };

  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Chỉnh sửa phòng' : 'Chi tiết phòng'}>
      <div className="space-y-6">
        {/* Banner Image */}
        {!isEditing && room.banner && (
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img src={room.banner} alt={room.roomtype} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại phòng <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.roomtype}
              onChange={(e) => setFormData({ ...formData, roomtype: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Studio A"
              aria-label="Room type"
            />
          ) : (
            <p className="text-lg font-semibold text-gray-900">{room.roomtype}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Đường Nguyễn Văn Tăng, Quận Thủ Đức"
              aria-label="Address"
            />
          ) : (
            <p className="text-gray-700">{room.address}</p>
          )}
        </div>

        {/* Price & Deposit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Giá <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="150"
                aria-label="Price"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">₫{Number(room.price).toLocaleString()}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đặt cọc <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.depositrequired}
                onChange={(e) => setFormData({ ...formData, depositrequired: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
                aria-label="Deposit required"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">₫{Number(room.depositrequired).toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Check-in & Check-out Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Giờ nhận phòng <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="time"
                value={formData.checkintime}
                onChange={(e) => setFormData({ ...formData, checkintime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Check-in time"
              />
            ) : (
              <p className="text-gray-700">{room.checkintime}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Giờ trả phòng <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="time"
                value={formData.checkouttime}
                onChange={(e) => setFormData({ ...formData, checkouttime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Check-out time"
              />
            ) : (
              <p className="text-gray-700">{room.checkouttime}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          {isEditing ? (
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Studio riêng với không gian thoáng đãng..."
              aria-label="Description"
            />
          ) : (
            <p className="text-gray-700">{room.description || 'Không có mô tả'}</p>
          )}
        </div>

        {/* Banner URL */}
        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
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
        )}

        {/* Utilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Wifi className="w-4 h-4 inline mr-1" />
            Tiện ích
          </label>
          {!isEditing && room.utilities && room.utilities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {room.utilities.map((utility) => (
                <span
                  key={utility.utilityid}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                >
                  {utility.utilityname}
                </span>
              ))}
            </div>
          ) : !isEditing ? (
            <p className="text-gray-500">Không có tiện ích</p>
          ) : (
            <p className="text-sm text-gray-500">Chỉnh sửa utilities qua API riêng</p>
          )}
        </div>

        {/* Equipments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Wrench className="w-4 h-4 inline mr-1" />
            Thiết bị
          </label>
          {isEditing ? (
            equipmentEdits.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {equipmentEdits.map((equipment) => (
                  <div
                    key={equipment.equipmentid}
                    className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>ID: {equipment.equipmentid}</span>
                      <span>Room: {equipment.roomid}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <label className="text-xs font-medium text-gray-600">Tên thiết bị</label>
                        <input
                          type="text"
                          value={equipment.equipmentname}
                          onChange={(event) =>
                            handleEquipmentChange(
                              equipment.equipmentid,
                              'equipmentname',
                              event.target.value
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="VD: Đèn Godox"
                          aria-label="Equipment name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Loại thiết bị</label>
                        <input
                          type="text"
                          value={equipment.equipmenttype}
                          onChange={(event) =>
                            handleEquipmentChange(
                              equipment.equipmentid,
                              'equipmenttype',
                              event.target.value
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="VD: Light"
                          aria-label="Equipment type"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600">Ảnh thiết bị</label>
                      <input
                        type="url"
                        value={equipment.image}
                        onChange={(event) =>
                          handleEquipmentChange(
                            equipment.equipmentid,
                            'image',
                            event.target.value
                          )
                        }
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                        aria-label="Equipment image"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600">Số lượng</label>
                        <input
                          type="number"
                          min={0}
                          value={equipment.quantity}
                          onChange={(event) =>
                            handleEquipmentChange(
                              equipment.equipmentid,
                              'quantity',
                              Number(event.target.value)
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Equipment quantity"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Giá</label>
                        <input
                          type="number"
                          min={0}
                          value={equipment.price}
                          onChange={(event) =>
                            handleEquipmentChange(
                              equipment.equipmentid,
                              'price',
                              Number(event.target.value)
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Equipment price"
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-2 pt-5 md:pt-6">
                        <input
                          id={`equipment-visible-${equipment.equipmentid}`}
                          type="checkbox"
                          checked={equipment.isavailable}
                          onChange={(event) =>
                            handleEquipmentChange(
                              equipment.equipmentid,
                              'isavailable',
                              event.target.checked
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`equipment-visible-${equipment.equipmentid}`}
                          className="text-sm text-gray-700"
                        >
                          Hiển thị thiết bị này
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Phòng chưa có thiết bị nào.</p>
            )
          ) : room.equipments && room.equipments.length > 0 ? (
            <div className="space-y-2">
              {room.equipments.map((equipment) => (
                <div
                  key={equipment.equipmentid}
                  className="flex items-center justify-between rounded-lg bg-blue-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-blue-900">{equipment.equipmentname}</p>
                    <p className="text-xs text-blue-700">Loại: {equipment.equipmenttype}</p>
                  </div>
                  <div className="text-right text-xs text-blue-700 space-y-1">
                    <p>Số lượng: {equipment.quantity}</p>
                    <p>{equipment.isavailable ? 'Đang hiển thị' : 'Đang ẩn'}</p>
                    {Boolean((equipment as any).image) && (
                      <a
                        href={(equipment as any).image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Xem ảnh
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Không có thiết bị</p>
          )}
        </div>

        {/* Images */}
        {!isEditing && room.images && room.images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Hình ảnh ({room.images.length})
            </label>
            <div className="grid grid-cols-3 gap-2">
              {room.images.slice(0, 6).map((image, index) => (
                <div key={index} className="h-24 rounded-lg overflow-hidden">
                  <img src={image.imageLink} alt={`Room ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Xóa phòng
          </button>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Đang lưu...' : 'Lưu'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
