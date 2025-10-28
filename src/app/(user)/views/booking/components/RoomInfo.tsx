'use client';
import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface Props {
  room: any;
}

const RoomInfo: React.FC<Props> = ({ room }) => {
  if (!room) return null;
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin phòng</h2>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <img src={room.banner || room.images?.[0]?.imageLink || ''} alt={room.roomtype} className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{room.roomtype}</h3>
            <p className="text-gray-600">{room.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-[#667EEA]" />
                <span className="text-sm text-gray-600">{room.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-[#667EEA]" />
            <div>
              <p className="text-sm text-gray-600">Giờ hoạt động</p>
              <p className="font-semibold">{room.checkintime} - {room.checkouttime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-[#667EEA]" />
            <div>
              <p className="text-sm text-gray-600">Giá thuê</p>
              <p className="font-semibold">{Intl.NumberFormat('vi-VN').format(parseFloat(room.price))} ₫/giờ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;


