'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Star, RefreshCw, Eye, Package } from 'lucide-react';
import { roomAPI } from '@/services/api/roomAPI';
import { RoomResponseDTO, RoomListParams } from '@/domain/dto/RoomDTO';
import Pagination from '@/components/ui/pagination';
import LoadingSpinner from '@/app/(user)/components/common/LoadingSpinner';
import RoomDetailModal from '@/components/ui/room-detail-modal';
import CreateRoomModal from '@/components/ui/create-room-modal';

export default function StudiosPage() {
  const [rooms, setRooms] = useState<RoomResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomResponseDTO | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
  });

  const normalizeRoomsResponse = (raw: any, pageSize: number) => {
    if (!raw) {
      return { rooms: [], total: 0, totalPages: 1 };
    }

    const primary = raw.data ?? raw.result ?? raw.rooms ?? raw.items ?? raw;

    let roomList: RoomResponseDTO[] = [];
    if (Array.isArray(primary)) {
      roomList = primary;
    } else if (Array.isArray(primary?.data)) {
      roomList = primary.data;
    } else if (Array.isArray(primary?.rooms)) {
      roomList = primary.rooms;
    } else if (Array.isArray(primary?.items)) {
      roomList = primary.items;
    }

    const metaSource =
      raw.metadata ??
      raw.meta ??
      primary?.metadata ??
      primary?.meta ??
      primary ??
      {};

    const inferredTotal =
      metaSource.total ??
      metaSource.totalItems ??
      metaSource.totalCount ??
      primary?.total ??
      raw.total ??
      raw.length ??
      roomList.length;

    const inferredTotalPages =
      metaSource.totalPages ??
      metaSource.pages ??
      primary?.totalPages ??
      raw.totalPages ??
      (inferredTotal ? Math.ceil(inferredTotal / pageSize) : 1);

    return {
      rooms: roomList,
      total: typeof inferredTotal === 'number' ? inferredTotal : roomList.length,
      totalPages:
        typeof inferredTotalPages === 'number' && inferredTotalPages > 0
          ? inferredTotalPages
          : Math.max(1, Math.ceil((inferredTotal || roomList.length || 1) / pageSize)),
    };
  };

  // Fetch rooms (studios)
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const params: RoomListParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
      };

      const response = await roomAPI.getRoomsList(params);
      if (response) {
        const { rooms: mappedRooms, total, totalPages: mappedTotalPages } = normalizeRoomsResponse(response, itemsPerPage);
        setRooms(mappedRooms ?? []);
        setTotalItems(total ?? mappedRooms.length ?? 0);
        setTotalPages(mappedTotalPages ?? 1);
        setStats({ total: total ?? mappedRooms.length ?? 0 });
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [currentPage, itemsPerPage]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== undefined) {
        setCurrentPage(1);
        fetchRooms();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleViewDetails = (room: RoomResponseDTO) => {
    setSelectedRoom(room);
    setIsDetailModalOpen(true);
  };



  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Phòng/Studios</h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả phòng và studio</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchRooms()}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm Phòng
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng theo loại hoặc địa chỉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng Phòng</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang hiển thị</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{rooms.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trang hiện tại</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentPage}/{totalPages}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" fullScreen={false} />
        </div>
      ) : rooms.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có phòng nào</h3>
          <p className="text-gray-600">Thử điều chỉnh tìm kiếm</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div key={room.roomid} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Room Banner */}
              {room.banner && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={room.banner}
                    alt={room.roomtype}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{room.roomtype}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{room.address}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    ID: {room.roomid}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Giá</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ₫{Number(room.price).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Đặt cọc</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ₫{Number(room.depositrequired).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Thời gian</p>
                  <p className="text-sm text-gray-700">
                    {room.checkintime} - {room.checkouttime}
                  </p>
                </div>

                {room.utilities && room.utilities.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Tiện ích</p>
                    <div className="flex flex-wrap gap-2">
                      {room.utilities.slice(0, 3).map((utility) => (
                        <span
                          key={utility.utilityid}
                          className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                        >
                          {utility.utilityname}
                        </span>
                      ))}
                      {room.utilities.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{room.utilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {room.equipments && room.equipments.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Thiết bị</p>
                    <div className="flex flex-wrap gap-2">
                      {room.equipments.slice(0, 2).map((equipment) => (
                        <span
                          key={equipment.equipmentid}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                        >
                          {equipment.equipmentname} (x{equipment.quantity})
                        </span>
                      ))}
                      {room.equipments.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{room.equipments.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewDetails(room)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && rooms.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={totalItems}
        />
      )}

      {/* Room Detail Modal */}
      <RoomDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        room={selectedRoom}
        onUpdate={fetchRooms}
      />

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchRooms}
      />
    </div>
  );
}
