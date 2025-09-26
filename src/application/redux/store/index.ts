// src/services/redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import studios from '../slices/studioSlice';

export const store = configureStore({
  reducer: {
    studios,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


