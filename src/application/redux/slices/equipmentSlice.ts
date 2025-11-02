// src/application/redux/slices/equipmentSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  EquipmentResponseDTO,
  EquipmentListResponse
} from "@/domain/dto/EquipmentDTO";
import {
  fetchEquipmentList,
  fetchEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from "../services/EquipmentService";

interface EquipmentState {
  equipmentList: EquipmentResponseDTO[];
  currentEquipment: EquipmentResponseDTO | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: EquipmentState = {
  equipmentList: [],
  currentEquipment: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
  success: null,
};

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    clearEquipmentError: (state) => {
      state.error = null;
    },
    clearEquipmentSuccess: (state) => {
      state.success = null;
    },
    setCurrentEquipment: (state, action: PayloadAction<EquipmentResponseDTO | null>) => {
      state.currentEquipment = action.payload;
    },
    clearCurrentEquipment: (state) => {
      state.currentEquipment = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch equipment list
    builder
      .addCase(fetchEquipmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipmentList.fulfilled, (state, action: PayloadAction<EquipmentListResponse | null>) => {
        state.loading = false;
        if (action.payload) {
          state.equipmentList = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
        }
      })
      .addCase(fetchEquipmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tải danh sách thiết bị";
      });

    // Fetch equipment by ID
    builder
      .addCase(fetchEquipmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipmentById.fulfilled, (state, action: PayloadAction<EquipmentResponseDTO | null>) => {
        state.loading = false;
        state.currentEquipment = action.payload;
      })
      .addCase(fetchEquipmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tải thông tin thiết bị";
      });

    // Create equipment
    builder
      .addCase(createEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createEquipment.fulfilled, (state, action: PayloadAction<EquipmentResponseDTO | null>) => {
        state.loading = false;
        if (action.payload) {
          state.equipmentList.unshift(action.payload);
          state.total += 1;
          state.success = "Tạo thiết bị thành công";
        }
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tạo thiết bị";
      });

    // Update equipment
    builder
      .addCase(updateEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateEquipment.fulfilled, (state, action: PayloadAction<EquipmentResponseDTO | null>) => {
        state.loading = false;
        if (action.payload) {
          const index = state.equipmentList.findIndex(e => e.equipmentId === action.payload!.equipmentId);
          if (index !== -1) {
            state.equipmentList[index] = action.payload;
          }
          if (state.currentEquipment?.equipmentId === action.payload.equipmentId) {
            state.currentEquipment = action.payload;
          }
          state.success = "Cập nhật thiết bị thành công";
        }
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể cập nhật thiết bị";
      });

    // Delete equipment
    builder
      .addCase(deleteEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteEquipment.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.equipmentList = state.equipmentList.filter(e => e.equipmentId !== action.payload);
        state.total -= 1;
        if (state.currentEquipment?.equipmentId === action.payload) {
          state.currentEquipment = null;
        }
        state.success = "Xóa thiết bị thành công";
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể xóa thiết bị";
      });
  },
});

export const {
  clearEquipmentError,
  clearEquipmentSuccess,
  setCurrentEquipment,
  clearCurrentEquipment,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
