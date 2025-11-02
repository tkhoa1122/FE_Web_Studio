// src/application/redux/slices/staffSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  StaffResponseDTO,
  StaffListResponse
} from "@/domain/dto/StaffDTO";
import {
  fetchStaffList,
  fetchStaffById,
  createStaff,
  updateStaff,
  deleteStaff
} from "../services/StaffService";

interface StaffState {
  staffList: StaffResponseDTO[];
  currentStaff: StaffResponseDTO | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: StaffState = {
  staffList: [],
  currentStaff: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
  success: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffError: (state) => {
      state.error = null;
    },
    clearStaffSuccess: (state) => {
      state.success = null;
    },
    setCurrentStaff: (state, action: PayloadAction<StaffResponseDTO | null>) => {
      state.currentStaff = action.payload;
    },
    clearCurrentStaff: (state) => {
      state.currentStaff = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch staff list
    builder
      .addCase(fetchStaffList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffList.fulfilled, (state, action: PayloadAction<StaffListResponse | null>) => {
        state.loading = false;
        if (action.payload) {
          state.staffList = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
        }
      })
      .addCase(fetchStaffList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tải danh sách nhân viên";
      });

    // Fetch staff by ID
    builder
      .addCase(fetchStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffById.fulfilled, (state, action: PayloadAction<StaffResponseDTO | null>) => {
        state.loading = false;
        state.currentStaff = action.payload;
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tải thông tin nhân viên";
      });

    // Create staff
    builder
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createStaff.fulfilled, (state, action: PayloadAction<StaffResponseDTO | null>) => {
        state.loading = false;
        if (action.payload) {
          state.staffList.unshift(action.payload);
          state.total += 1;
          state.success = "Tạo nhân viên thành công";
        }
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể tạo nhân viên";
      });

    // Update staff
    builder
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateStaff.fulfilled, (state, action: PayloadAction<StaffResponseDTO | null>) => {
        state.loading = false;
        if (action.payload) {
          const index = state.staffList.findIndex(s => s.userId === action.payload!.userId);
          if (index !== -1) {
            state.staffList[index] = action.payload;
          }
          if (state.currentStaff?.userId === action.payload.userId) {
            state.currentStaff = action.payload;
          }
          state.success = "Cập nhật nhân viên thành công";
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể cập nhật nhân viên";
      });

    // Delete staff
    builder
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.staffList = state.staffList.filter(s => s.userId !== action.payload);
        state.total -= 1;
        if (state.currentStaff?.userId === action.payload) {
          state.currentStaff = null;
        }
        state.success = "Xóa nhân viên thành công";
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Không thể xóa nhân viên";
      });
  },
});

export const {
  clearStaffError,
  clearStaffSuccess,
  setCurrentStaff,
  clearCurrentStaff,
} = staffSlice.actions;

export default staffSlice.reducer;
