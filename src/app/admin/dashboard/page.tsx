    'use client';
import React from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  Package,
  BarChart3,
  Settings,
  Bell,
  ChevronDown
} from 'lucide-react';
import { useRequireAdmin } from '@/application/hooks/useRequireAdmin';
import { useAuth } from '@/application/hooks/useAuth';
import LoadingSpinner from '@/app/(user)/components/common/LoadingSpinner';

export default function AdminDashboard() {
  // Bảo vệ route - chỉ admin mới vào được
  const { isAuthenticated, isLoading, isAdmin } = useRequireAdmin();
  const { user, logout } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          fullScreen={false}
          message="Đang tải bảng điều khiển..."
          variant="admin"
        />
      </div>
    );
  }

  // Chưa authenticated hoặc không phải admin (sẽ redirect)
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '125.5M ₫',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Booking hôm nay',
      value: '24',
      change: '+8.3%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Studios hoạt động',
      value: '12/15',
      change: '80%',
      trend: 'stable',
      icon: Camera,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Người dùng mới',
      value: '156',
      change: '+23.1%',
      trend: 'up',
      icon: Users,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentBookings = [
    { id: 1, studio: 'Studio A - Premium', client: 'Nguyễn Văn A', time: '14:00 - 16:00', status: 'confirmed', amount: '2.5M ₫' },
    { id: 2, studio: 'Studio B - Standard', client: 'Trần Thị B', time: '10:00 - 12:00', status: 'pending', amount: '1.8M ₫' },
    { id: 3, studio: 'Studio C - VIP', client: 'Lê Văn C', time: '16:00 - 18:00', status: 'confirmed', amount: '3.2M ₫' },
    { id: 4, studio: 'Studio A - Premium', client: 'Phạm Thị D', time: '18:00 - 20:00', status: 'confirmed', amount: '2.5M ₫' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Studio Booking System</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-500 uppercase font-medium">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="/admin/studios" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Camera className="w-5 h-5" />
              <span>Studios</span>
            </a>
            <a href="/admin/bookings" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
            </a>
            <a href="/admin/equipment" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Package className="w-5 h-5" />
              <span>Thiết bị</span>
            </a>
            <a href="/admin/users" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Users className="w-5 h-5" />
              <span>Người dùng</span>
            </a>
            <a href="/admin/analytics" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Thống kê</span>
            </a>
            <a href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" />
              <span>Cài đặt</span>
            </a>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Chào mừng trở lại, {user?.fullName}! 👋
            </h2>
            <p className="text-gray-600">
              Đây là tổng quan về hệ thống của bạn hôm nay
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  {stat.trend === 'up' && (
                    <div className="flex items-center space-x-1 text-green-600 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Booking gần đây</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Xem tất cả →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Studio</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thời gian</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Số tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Camera className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{booking.studio}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{booking.client}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

