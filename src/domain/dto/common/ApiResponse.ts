// src/domain/dto/common/ApiResponse.ts

// Generic API Response wrapper
export interface ApiResponse<T = any> {
  status: "success" | "fail" | "error";
  message: string;
  data?: T | null;
  length?: number;
  error?: any | null;
  success: boolean;
  timestamp?: string;
  // Authentication tokens (optional)
  refreshToken?: string | null;
  accessToken?: string | null;
  // Additional metadata
  metadata?: {
    totalCount?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

// Paginated response for list data
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error response structure
export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  path?: string;
  statusCode?: number;
}

// Success response for single item
export interface SuccessResponse<T> {
  status: "success";
  message: string;
  data: T;
  success: true;
  timestamp: string;
}

// Fail response for business logic errors
export interface FailResponse {
  status: "fail";
  message: string;
  error: string;
  success: false;
  timestamp: string;
}


