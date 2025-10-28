'use client';

import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export default function RevenuePage() {
  const monthlyRevenue = [
    { month: 'Jan 2025', revenue: 45000000, bookings: 120, growth: 12 },
    { month: 'Feb 2025', revenue: 52000000, bookings: 135, growth: 15.5 },
    { month: 'Mar 2025', revenue: 48000000, bookings: 128, growth: -7.7 },
    { month: 'Apr 2025', revenue: 58000000, bookings: 145, growth: 20.8 },
    { month: 'May 2025', revenue: 62000000, bookings: 156, growth: 6.9 },
    { month: 'Jun 2025', revenue: 71000000, bookings: 178, growth: 14.5 },
  ];

  const topStudios = [
    { name: 'Studio A - Premium', revenue: 28000000, bookings: 156 },
    { name: 'Studio D - Pro', revenue: 24000000, bookings: 142 },
    { name: 'Studio B - Standard', revenue: 18000000, bookings: 128 },
    { name: 'Studio C - Mini', revenue: 12000000, bookings: 98 },
  ];

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const totalBookings = monthlyRevenue.reduce((sum, m) => sum + m.bookings, 0);
  const avgRevenue = totalRevenue / monthlyRevenue.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Report</h1>
          <p className="text-gray-600 mt-1">Financial overview and revenue analytics</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue (6 months)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₫{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₫{avgRevenue.toLocaleString('vi-VN', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalBookings}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Revenue Trend</h2>
        <div className="space-y-4">
          {monthlyRevenue.map((month, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{month.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{month.bookings} bookings</span>
                  <span className={`font-semibold ${month.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {month.growth >= 0 ? '+' : ''}{month.growth}%
                  </span>
                  <span className="font-bold text-gray-900 w-32 text-right">
                    ₫{month.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(month.revenue / 75000000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Studios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Studios</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Studio Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue/Booking
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topStudios.map((studio, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-gray-900">#{index + 1}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{studio.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{studio.bookings}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ₫{studio.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      ₫{(studio.revenue / studio.bookings).toLocaleString('vi-VN', { maximumFractionDigits: 0 })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
