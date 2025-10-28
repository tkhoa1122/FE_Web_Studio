'use client';
import React from 'react';
import Link from 'next/link';

const BookingBreadcrumb: React.FC = () => {
  return (
    <section className="py-4 bg-white border-b">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/views/studios" className="hover:text-[#667EEA] transition-colors">
            Studios
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Đặt phòng</span>
        </div>
      </div>
    </section>
  );
};

export default BookingBreadcrumb;


