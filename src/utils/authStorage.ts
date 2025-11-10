// src/utils/authStorage.ts
// Helper utilities for accessing auth data from localStorage

export interface StoredAuthData {
  accessToken: string | null;
  tokenType: string | null;
  tokenExpiresAt: number | null;
  user: any | null;
  userRole: string | null;
  userId: number | null;
  username: string | null;
  userEmail: string | null;
  userFullName: string | null;
}

/**
 * Get all auth data from localStorage
 */
export function getAuthFromStorage(): StoredAuthData {
  if (typeof window === 'undefined') {
    return {
      accessToken: null,
      tokenType: null,
      tokenExpiresAt: null,
      user: null,
      userRole: null,
      userId: null,
      username: null,
      userEmail: null,
      userFullName: null,
    };
  }

  try {
    const tokenExpiresAtStr = localStorage.getItem('tokenExpiresAt');
    const userIdStr = localStorage.getItem('userId');
    const userStr = localStorage.getItem('user');

    return {
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
      tokenExpiresAt: tokenExpiresAtStr ? parseInt(tokenExpiresAtStr, 10) : null,
      user: userStr ? JSON.parse(userStr) : null,
      userRole: localStorage.getItem('userRole'),
      userId: userIdStr ? parseInt(userIdStr, 10) : null,
      username: localStorage.getItem('username'),
      userEmail: localStorage.getItem('userEmail'),
      userFullName: localStorage.getItem('userFullName'),
    };
  } catch (error) {
    console.error('Failed to read auth from localStorage:', error);
    return {
      accessToken: null,
      tokenType: null,
      tokenExpiresAt: null,
      user: null,
      userRole: null,
      userId: null,
      username: null,
      userEmail: null,
      userFullName: null,
    };
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const auth = getAuthFromStorage();

  // Check if token exists
  if (!auth.accessToken) {
    return false;
  }

  // Check if token is expired
  if (auth.tokenExpiresAt && Date.now() > auth.tokenExpiresAt) {
    console.warn('Token expired');
    return false;
  }

  return true;
}

/**
 * Check if user has admin role
 */
export function isAdmin(): boolean {
  const auth = getAuthFromStorage();
  return auth.userRole === 'admin';
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
}

/**
 * Get current user info
 */
export function getCurrentUser(): any | null {
  const auth = getAuthFromStorage();
  return auth.user;
}

/**
 * Get user role
 */
export function getUserRole(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuthStorage(): void {
  if (typeof window === 'undefined') return;

  const keysToRemove = [
    'accessToken',
    'tokenType',
    'tokenExpiresAt',
    'user',
    'userRole',
    'userId',
    'username',
    'userEmail',
    'userFullName',
    'adminRedirectAfterLogin'
  ];

  keysToRemove.forEach(key => localStorage.removeItem(key));
  console.log('✅ Auth storage cleared');
}

/**
 * Debug: Log all auth data
 */
export function debugAuthStorage(): void {
  if (typeof window === 'undefined') {
    console.log('⚠️ Window is undefined, cannot access localStorage');
    return;
  }

  const auth = getAuthFromStorage();
  console.log('📦 Auth Storage Debug:', {
    hasToken: !!auth.accessToken,
    tokenPreview: auth.accessToken ? auth.accessToken.substring(0, 20) + '...' : null,
    tokenType: auth.tokenType,
    expiresAt: auth.tokenExpiresAt ? new Date(auth.tokenExpiresAt).toLocaleString() : null,
    isExpired: auth.tokenExpiresAt ? Date.now() > auth.tokenExpiresAt : null,
    user: auth.user ? {
      userid: auth.user.userid,
      username: auth.user.username,
      role: auth.user.role,
      email: auth.user.email,
    } : null,
    userRole: auth.userRole,
    userId: auth.userId,
    username: auth.username,
    userEmail: auth.userEmail,
    userFullName: auth.userFullName,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
  });
}

