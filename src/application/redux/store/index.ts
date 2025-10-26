// src/application/redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import studios from '../slices/studioSlice';
import auth from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    studios,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


