// src/application/redux/slices/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../../domain/entities/Auth';
import { LoginRequestDTO, RegisterRequestDTO } from '../../../domain/dto/AuthDTO';
import { authRepository } from '../../../services/repositories/AuthRepositoryImpl';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequestDTO, { rejectWithValue }) => {
    try {
      const response = await authRepository.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Đăng nhập thất bại');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequestDTO, { rejectWithValue }) => {
    try {
      const response = await authRepository.register(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Đăng ký thất bại');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authRepository.logout();
      // Logout thành công
    } catch (error: any) {
      // Logout API có thể fail (404) nhưng localStorage đã được clear
      // Không reject, vẫn coi như logout thành công
      console.warn('Logout API failed, but local data cleared:', error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        const expiresAtStr = localStorage.getItem('tokenExpiresAt');

        // Kiểm tra token expiry
        if (expiresAtStr) {
          const expiresAt = parseInt(expiresAtStr, 10);
          if (Number.isFinite(expiresAt) && Date.now() > expiresAt) {
            console.warn('⚠️ Token expired, clearing auth data');
            // Token đã hết hạn, xóa localStorage
            const keysToRemove = [
              'accessToken', 'tokenType', 'tokenExpiresAt',
              'user', 'userRole', 'userId', 'username',
              'userEmail', 'userFullName'
            ];
            keysToRemove.forEach(key => localStorage.removeItem(key));
            return null;
          }
        }

        if (token && userStr) {
          const user = JSON.parse(userStr);
          console.log('✅ Auth status restored from localStorage:', {
            user: user.username,
            role: user.role
          });
          return { token, user };
        } else {
          console.log('ℹ️ No auth data found in localStorage');
        }
      }
      return null;
    } catch (error: any) {
      console.error('❌ Check auth status failed:', error);
      return rejectWithValue('Kiểm tra trạng thái đăng nhập thất bại');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = null;

        // Persist to localStorage as extra safety
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('accessToken', action.payload.access_token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            console.log('✅ Login successful, user authenticated:', action.payload.user.username);
          } catch (e) {
            console.error('Failed to persist login to localStorage:', e);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        console.error('❌ Login rejected:', action.payload);
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = null;

        // Persist to localStorage as extra safety
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('accessToken', action.payload.access_token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            console.log('✅ Registration successful, user authenticated:', action.payload.user.username);
          } catch (e) {
            console.error('Failed to persist registration to localStorage:', e);
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        console.error('❌ Registration rejected:', action.payload);
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Vẫn clear auth dù logout thất bại
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Check Auth Status
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      });
  },
});

export const { clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;

