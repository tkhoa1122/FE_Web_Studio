// src/services/redux/slices/studioSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { StudioResponseDTO } from '@/domain/dto/StudioDTO';
import { PaginatedResponse } from '@/domain/dto/common/ApiResponse';
import { fetchAllStudios, fetchStudioById, searchStudios } from '../services/StudioService';

interface StudioState {
  studios: StudioResponseDTO[];
  currentStudio: StudioResponseDTO | null;
  searchResults: PaginatedResponse<StudioResponseDTO> | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudioState = {
  studios: [],
  currentStudio: null,
  searchResults: null,
  loading: false,
  error: null,
};


const studioSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    clearError(state) { state.error = null; },
    clearCurrentStudio(state) { state.currentStudio = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudios.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllStudios.fulfilled, (state, action) => { state.loading = false; state.studios = action.payload; })
      .addCase(fetchAllStudios.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchStudioById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchStudioById.fulfilled, (state, action) => { state.loading = false; state.currentStudio = action.payload; })
      .addCase(fetchStudioById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(searchStudios.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(searchStudios.fulfilled, (state, action) => { state.loading = false; state.searchResults = action.payload; })
      .addCase(searchStudios.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  }
});

export const { clearError, clearCurrentStudio } = studioSlice.actions;
export default studioSlice.reducer;


