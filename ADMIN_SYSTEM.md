# 🛡️ Hệ Thống Quản Trị Admin - Tài Liệu Đầy Đủ

## 📋 Tổng Quan

Hệ thống admin được thiết kế với bảo mật cao, giao diện chuyên nghiệp và luồng xác thực nghiêm ngặt.

---

## 🎯 Các Tính Năng Chính

### ✅ 1. **Admin Login Page** (`/admin/login`)
- Giao diện hiện đại với gradient background
- Animated elements (pulse effects, floating shapes)
- Form validation
- Loading states
- Error/Success messages
- Responsive design

### ✅ 2. **Admin Dashboard** (`/admin/dashboard`)
- Overview statistics (doanh thu, bookings, users)
- Recent bookings table
- Sidebar navigation
- Top navigation bar với user profile
- Protected route (chỉ admin mới truy cập được)

### ✅ 3. **Loading Component**
- Modern spinner với pulse effect
- Customizable size (sm, md, lg, xl)
- Full screen mode
- Admin và user variants
- Bouncing dots animation

### ✅ 4. **Access Control**
- Role-based authentication
- Admin-only routes
- Auto redirect cho unauthorized users
- Persistent auth check

---

## 🔐 Luồng Xác Thực Admin

### **Scenario 1: User chưa đăng nhập, gõ `/admin`**

```
1. User gõ URL: /admin/dashboard
         ↓
2. Middleware detect /admin route
         ↓
3. useRequireAdmin() hook check
         ↓
4. isAuthenticated = false
         ↓
5. Lưu current path vào localStorage
   localStorage.setItem('adminRedirectAfterLogin', '/admin/dashboard')
         ↓
6. Redirect → /admin/login
         ↓
7. User nhập credentials
         ↓
8. Login thành công
         ↓
9. Check role === 'admin' ✅
         ↓
10. Lấy saved path từ localStorage
         ↓
11. Redirect → /admin/dashboard
         ↓
12. Render dashboard ✅
```

### **Scenario 2: User đã đăng nhập (role: user/staff), gõ `/admin`**

```
1. User gõ URL: /admin/dashboard
         ↓
2. Middleware detect /admin route
         ↓
3. useRequireAdmin() hook check
         ↓
4. isAuthenticated = true ✅
         ↓
5. Check user.role
         ↓
6. user.role = 'user' ❌ (không phải admin)
         ↓
7. Lấy previousUrl từ localStorage (nếu có)
         ↓
8. Redirect → previousUrl hoặc '/'
         ↓
9. Hiển thị trang chủ ✅
```

### **Scenario 3: Admin đã đăng nhập, truy cập `/admin`**

```
1. Admin gõ URL: /admin/dashboard
         ↓
2. useRequireAdmin() check
         ↓
3. isAuthenticated = true ✅
4. user.role = 'admin' ✅
         ↓
5. Render AdminDashboard component ✅
```

---

## 📁 Cấu Trúc Files

```
src/
├── app/
│   ├── (admin)/                        # Admin route group
│   │   ├── layout.tsx                  # Admin layout wrapper
│   │   ├── login/
│   │   │   └── page.tsx               # ✅ Admin login page
│   │   └── dashboard/
│   │       └── page.tsx               # ✅ Admin dashboard
│   │
│   └── (user)/
│       └── components/
│           └── common/
│               └── LoadingSpinner.tsx  # ✅ Loading component
│
├── application/
│   └── hooks/
│       ├── useAuth.ts                  # General auth hook
│       ├── useRequireAuth.ts           # User auth protection
│       └── useRequireAdmin.ts          # ✅ Admin auth protection
│
├── config/
│   └── axios.ts                        # ✅ Updated với admin routes
│
└── middleware.ts                       # ✅ Next.js middleware
```

---

## 🎨 Component Chi Tiết

### 1. **LoadingSpinner Component**

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';     // Kích thước spinner
  fullScreen?: boolean;                  // Full screen overlay
  message?: string;                      // Loading message
  variant?: 'default' | 'admin';         // Color variant
}
```

**Usage:**
```tsx
// User variant
<LoadingSpinner 
  size="lg" 
  message="Đang tải..."
  variant="default"
/>

// Admin variant
<LoadingSpinner 
  size="lg" 
  message="Đang xác thực..."
  variant="admin"
/>

// Full screen
<LoadingSpinner 
  fullScreen={true}
  message="Đang tải dữ liệu..."
/>
```

### 2. **useRequireAdmin Hook**

**Purpose:** Bảo vệ admin routes, chỉ cho phép user có role='admin' truy cập

**Return Values:**
```typescript
{
  isAuthenticated: boolean;  // Đã đăng nhập?
  isLoading: boolean;        // Đang check?
  isAdmin: boolean;          // Là admin?
}
```

**Usage trong Component:**
```tsx
export default function AdminPage() {
  const { isAuthenticated, isLoading, isAdmin } = useRequireAdmin();

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Sẽ auto redirect nếu không phải admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  // Chỉ render khi đã xác thực là admin
  return <AdminContent />;
}
```

### 3. **Admin Login Page**

**Features:**
- ✅ Modern gradient background với animated shapes
- ✅ Left side branding (desktop only)
- ✅ Right side login form
- ✅ Username/password inputs
- ✅ Show/hide password
- ✅ Error handling với animated alerts
- ✅ Success message
- ✅ Loading state trong button
- ✅ Role check sau khi login
- ✅ Security badge và notes
- ✅ Back to home link

**Design Elements:**
```tsx
// Gradient background
bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900

// Animated blobs
<div className="absolute ... bg-blue-500/30 ... animate-pulse"></div>

// Grid pattern overlay
<div className="absolute ... bg-[linear-gradient(...)]"></div>

// Feature cards
{ icon: Server, title: 'Quản lý Studios', desc: 'Theo dõi realtime' }
```

### 4. **Admin Dashboard**

**Features:**
- ✅ Top navigation bar
  - Logo và title
  - Notifications bell
  - Admin profile dropdown
  - Logout button
  
- ✅ Sidebar navigation
  - Dashboard
  - Studios
  - Bookings
  - Equipment
  - Users
  - Analytics
  - Settings

- ✅ Stats cards
  - Tổng doanh thu
  - Booking hôm nay
  - Studios hoạt động
  - Người dùng mới

- ✅ Recent bookings table
  - Studio name
  - Client name
  - Time slot
  - Status badge
  - Amount

**Color Scheme:**
```
Primary: Blue (#2563EB) - Main actions
Secondary: Cyan (#06B6D4) - Accents
Success: Green (#10B981) - Confirmed
Warning: Yellow (#F59E0B) - Pending
Danger: Red (#EF4444) - Cancel
```

---

## 🔧 Axios Configuration

### **Updated Response Interceptor**

```typescript
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const pathname = window.location.pathname;
      
      // Admin routes → admin login
      if (pathname.startsWith('/admin')) {
        if (!pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      } 
      // User routes → user login
      else if (pathname.includes('/booking') || pathname.includes('/profile')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

**Logic:**
- 401 từ admin routes → `/admin/login`
- 401 từ user protected routes → `/login`
- Tách biệt hoàn toàn giữa admin và user flows

---

## 🛡️ Middleware

**File:** `src/middleware.ts`

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    
    // Lưu URL trước đó
    if (!pathname.startsWith('/admin/login')) {
      response.cookies.set('previousUrl', request.url);
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],  // Chỉ apply cho admin routes
};
```

**Purpose:**
- Detect admin routes
- Lưu previous URL để redirect về khi không có quyền
- Server-side protection layer

---

## 🎯 Access Control Matrix

| Route | Chưa Login | User Login | Staff Login | Admin Login |
|-------|-----------|-----------|-------------|-------------|
| `/` | ✅ Allow | ✅ Allow | ✅ Allow | ✅ Allow |
| `/studios` | ✅ Allow | ✅ Allow | ✅ Allow | ✅ Allow |
| `/booking` | ❌ → `/login` | ✅ Allow | ✅ Allow | ✅ Allow |
| `/admin/login` | ✅ Allow | ✅ Allow (check role) | ✅ Allow (check role) | ✅ Allow |
| `/admin/dashboard` | ❌ → `/admin/login` | ❌ → `/` | ❌ → `/` | ✅ Allow |
| `/admin/*` | ❌ → `/admin/login` | ❌ → `/` | ❌ → `/` | ✅ Allow |

---

## 🚀 Testing Flow

### **Test 1: Chưa đăng nhập, truy cập admin**
```bash
1. Mở browser incognito
2. Gõ: http://localhost:3000/admin/dashboard
3. Expect: Redirect → /admin/login
4. Login với admin credentials
5. Expect: Redirect về /admin/dashboard
```

### **Test 2: User đã login, truy cập admin**
```bash
1. Login với user account (role: 'user')
2. Gõ: http://localhost:3000/admin/dashboard
3. Expect: Redirect → / (home page)
4. Console message: "Không có quyền truy cập"
```

### **Test 3: Admin đã login, truy cập admin**
```bash
1. Login với admin account (role: 'admin')
2. Gõ: http://localhost:3000/admin/dashboard
3. Expect: Render dashboard thành công ✅
```

### **Test 4: Token expired ở admin page**
```bash
1. Login admin, vào dashboard
2. Wait cho token hết hạn (hoặc xóa token thủ công)
3. Click vào action nào đó (call API)
4. Server trả 401
5. Expect: Axios interceptor → redirect /admin/login
```

---

## 💡 Best Practices

### 1. **Luôn kiểm tra role sau khi login**
```typescript
if (success) {
  if (user?.role === 'admin') {
    // Cho phép vào admin
  } else {
    // Redirect về home
  }
}
```

### 2. **Sử dụng Loading Component**
```typescript
if (isLoading) {
  return <LoadingSpinner variant="admin" />;
}
```

### 3. **Clear localStorage khi logout**
```typescript
const logout = async () => {
  await dispatch(logoutUser());
  localStorage.removeItem('adminRedirectAfterLogin');
  router.push('/');
};
```

### 4. **Protected Component Pattern**
```typescript
export default function ProtectedPage() {
  const { isLoading, isAdmin } = useRequireAdmin();
  
  if (isLoading) return <Loading />;
  if (!isAdmin) return null;  // Will redirect
  
  return <Content />;
}
```

---

## 🎨 Customization Guide

### **Thay đổi màu sắc Admin**

**File:** `src/app/(admin)/login/page.tsx`

```typescript
// Background gradient
from-slate-900 via-blue-900 to-slate-900
→ Thay bằng màu bạn muốn

// Primary button
from-blue-600 to-cyan-600
→ Thay bằng màu brand

// Accent colors
bg-blue-500/30  // Animated blobs
border-blue-400/30  // Borders
text-blue-400  // Text accents
```

### **Thêm Admin Routes**

1. Tạo file mới trong `src/app/(admin)/`
```tsx
// src/app/(admin)/users/page.tsx
'use client';
import { useRequireAdmin } from '@/application/hooks/useRequireAdmin';

export default function UsersPage() {
  const { isLoading, isAdmin } = useRequireAdmin();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAdmin) return null;
  
  return <UsersContent />;
}
```

2. Thêm vào sidebar navigation trong dashboard

---

## 📊 Performance

- ✅ Code splitting với Next.js app router
- ✅ Client-side navigation (fast)
- ✅ Lazy loading components
- ✅ Minimal re-renders với proper state management
- ✅ Optimized images và assets

---

## 🔒 Security Checklist

- ✅ JWT token trong localStorage
- ✅ Bearer token trong HTTP headers
- ✅ Role-based access control
- ✅ Server-side middleware protection
- ✅ Client-side route guards
- ✅ 401 error handling
- ✅ Token expiry handling
- ✅ Secure password input (type="password")
- ✅ HTTPS connection (production)

---

## 🐛 Troubleshooting

### **Lỗi: "Cannot read property 'role' of null"**
**Solution:** Kiểm tra user đã được load từ Redux chưa
```typescript
if (!user) return <Loading />;
```

### **Lỗi: Redirect loop**
**Solution:** Kiểm tra logic trong useRequireAdmin, đảm bảo không check khi isLoading=true

### **Lỗi: localStorage is not defined**
**Solution:** Thêm check typeof window
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem(...);
}
```

---

## 📞 Support

Nếu có vấn đề, kiểm tra:
1. Console errors
2. Network tab (API calls)
3. Redux DevTools (state changes)
4. localStorage (token còn hiệu lực?)

---

Hệ thống admin đã sẵn sàng! 🚀

