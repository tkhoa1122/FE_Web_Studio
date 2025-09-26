// src/hooks/useStudio.ts
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/application/redux/store';
import { fetchAllStudios, fetchStudioById, searchStudios } from '@/application/redux/services/StudioService';
import { clearError } from '@/application/redux/slices/studioSlice';
import { StudioSearchDTO } from '@/domain/dto/StudioDTO';

export const useStudio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { studios, currentStudio, searchResults, loading, error } = useSelector((s: RootState) => s.studios);

  const getAllStudios = useCallback(() => {
    dispatch(fetchAllStudios());
  }, [dispatch]);

  const getStudioById = useCallback((id: string) => {
    dispatch(fetchStudioById(id));
  }, [dispatch]);

  const searchStudiosByCriteria = useCallback((criteria: StudioSearchDTO) => {
    dispatch(searchStudios(criteria));
  }, [dispatch]);

  const clearStudioError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    studios,
    currentStudio,
    searchResults,
    loading,
    error,
    getAllStudios,
    getStudioById,
    searchStudiosByCriteria,
    clearStudioError,
  };
};


