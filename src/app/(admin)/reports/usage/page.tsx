'use client';

import React from 'react';
import { Activity, Clock, BarChart3, Download } from 'lucide-react';

export default function UsagePage() {
  const studioUsage = [
    { name: 'Studio A - Premium', totalHours: 456, utilizationRate: 85, peakHours: '14:00-18:00' },
    { name: 'Studio B - Standard', totalHours: 392, utilizationRate: 73, peakHours: '10:00-14:00' },
    { name: 'Studio C - Mini', totalHours: 324, utilizationRate: 60, peakHours: '15:00-19:00' },
    { name: 'Studio D - Pro', totalHours: 512, utilizationRate: 95, peakHours: '09:00-17:00' },
  ];

  const weeklyUsage = [
    { day: 'Monday', hours: 42, bookings: 12 },
    { day: 'Tuesday', hours: 38, bookings: 10 },
    { day: 'Wednesday', hours: 45, bookings: 13 },
    { day: 'Thursday', hours: 48, bookings: 14 },
    { day: 'Friday', hours: 52, bookings: 15 },
    { day: 'Saturday', hours: 68, bookings: 18 },
    { day: 'Sunday', hours: 56, bookings: 16 },
  ];

  const totalHours = studioUsage.reduce((sum: number, s) => sum + s.totalHours, 0);
  const avgUtilization = studioUsage.reduce((sum: number, s) => sum + s.utilizationRate, 0) / studioUsage.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usage Report</h1>
          <p className="text-gray-600 mt-1">Studio utilization and usage analytics</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usage Hours</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalHours} hrs</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Utilization</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {avgUtilization.toFixed(1)}%
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Used Studio</p>
              <p className="text-lg font-bold text-gray-900 mt-1">Studio D - Pro</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
