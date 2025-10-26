import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Chỉ xử lý các route admin
  if (pathname.startsWith('/admin')) {
    // Lưu URL trước đó để redirect về khi không có quyền
    const response = NextResponse.next();
    
    // Nếu không phải admin login page, lưu current path
    if (!pathname.startsWith('/admin/login')) {
      response.cookies.set('previousUrl', request.url);
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

