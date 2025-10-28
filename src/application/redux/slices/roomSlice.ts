// src/application/redux/slices/roomSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAllRooms,
  fetchRoomById,
  fetchAllEquipments,
  fetchEquipmentsByRoomId,
  searchEquipments,
  searchRooms,
} from '@/application/redux/services/RoomService';
import { RoomResponseDTO, EquipmentResponseDTO } from '@/domain/dto/RoomDTO';

interface RoomState {
  rooms: RoomResponseDTO[];
  equipments: EquipmentResponseDTO[];
  selectedRoom: RoomResponseDTO | null;
  loading: boolean;
  error: string | null;
  searchResults: {
    rooms: RoomResponseDTO[];
    equipments: EquipmentResponseDTO[];
  };
}

const initialState: RoomState = {
  rooms: [],
  equipments: [],
  selectedRoom: null,
  loading: false,
  error: null,
  searchResults: {
    rooms: [],
    equipments: []
  }
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRooms: (state, action: PayloadAction<RoomResponseDTO[]>) => {
      state.rooms = action.payload;
    },
    setEquipments: (state, action: PayloadAction<EquipmentResponseDTO[]>) => {
      state.equipments = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<RoomResponseDTO | null>) => {
      state.selectedRoom = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<{
      rooms: RoomResponseDTO[];
      equipments: EquipmentResponseDTO[];
    }>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = {
        rooms: [],
        equipments: []
      };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle fetchAllRooms
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action: PayloadAction<RoomResponseDTO[]>) => {
        state.loading = false;
        state.rooms = action.payload;
        state.error = null;
      })
      .addCase(fetchAllRooms.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchRoomById
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action: PayloadAction<RoomResponseDTO | null>) => {
        state.loading = false;
        state.selectedRoom = action.payload || null;
        state.error = null;
      })
      .addCase(fetchRoomById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchAllEquipments
      .addCase(fetchAllEquipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEquipments.fulfilled, (state, action: PayloadAction<EquipmentResponseDTO[]>) => {
        state.loading = false;
        state.equipments = action.payload;
        state.error = null;
      })
      .addCase(fetchAllEquipments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchEquipmentsByRoomId
      .addCase(fetchEquipmentsByRoomId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipmentsByRoomId.fulfilled, (state, action: PayloadAction<EquipmentResponseDTO[]>) => {
        state.loading = false;
        state.equipments = action.payload;
        state.error = null;
      })
      .addCase(fetchEquipmentsByRoomId.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle searchEquipments
      .addCase(searchEquipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEquipments.fulfilled, (state, action: any) => {
        state.loading = false;
        state.searchResults.equipments = action.payload?.items || [];
        state.error = null;
      })
      .addCase(searchEquipments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle searchRooms
      .addCase(searchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRooms.fulfilled, (state, action: any) => {
        state.loading = false;
        state.searchResults.rooms = action.payload?.items || [];
        state.error = null;
      })
      .addCase(searchRooms.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setLoading,
  setError,
  setRooms,
  setEquipments,
  setSelectedRoom,
  setSearchResults,
  clearSearchResults,
  clearError
} = roomSlice.actions;

export default roomSlice.reducer;
