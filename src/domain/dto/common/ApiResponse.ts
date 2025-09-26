// src/domain/dto/common/ApiResponse.ts
export interface ApiResponse<T = any> {
  status: "success" | "fail";
  message: string;
  data?: T | null;
  length?: number;
  error: any | null;
  success: boolean;
  refreshToken?: string | null;
  accessToken?: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}


