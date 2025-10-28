// src/application/redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import studios from '../slices/studioSlice';
import auth from '../slices/authSlice';
import rooms from '../slices/roomSlice';
import bookings from '../slices/bookingSlice';

export const store = configureStore({
  reducer: {
    studios,
    auth,
    rooms,
    bookings,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


