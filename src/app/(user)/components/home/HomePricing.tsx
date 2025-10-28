'use client';
import React from 'react';
import PricingCard from '../../components/common/PricingCard';
import { mockStudioPackages } from '@/services/data/mockData';
import { StudioPackageDTO } from '@/domain/dto/StudioDTO';

interface Props {
  onBookNow: (id: string) => void;
}

const HomePricing: React.FC<Props> = ({ onBookNow }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#667EEA] to-[#764BA2] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Bảng giá Studio</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Lựa chọn gói phù hợp với nhu cầu của bạn</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mockStudioPackages.map((pkg: StudioPackageDTO) => (
            <PricingCard key={pkg.id} packageData={pkg} onBookNow={onBookNow} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePricing;


