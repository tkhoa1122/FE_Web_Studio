'use client';
import React from 'react';
import { Check, Star, Sparkles } from 'lucide-react';
import { StudioPackageDTO } from '../../../../domain/dto/StudioDTO';

interface PricingCardProps {
  packageData: StudioPackageDTO;
  onBookNow: (packageId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ packageData, onBookNow }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div
      className={`relative h-full flex flex-col rounded-3xl transition-all duration-500 hover:-translate-y-3 ${
        packageData.isPopular
          ? 'bg-gradient-to-br from-[#667EEA] to-[#764BA2] shadow-2xl hover:shadow-[#667EEA]/40 scale-105'
          : 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-[#667EEA]/50'
      }`}
    >
      {packageData.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Phổ biến nhất</span>
            <Star className="w-4 h-4 fill-white" />
          </div>
        </div>
      )}
      
      <div className={`p-8 flex flex-col flex-grow ${packageData.isPopular ? 'text-white' : ''}`}>
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-3 ${packageData.isPopular ? 'text-white' : 'text-gray-900'}`}>
            {packageData.name}
          </h3>
          
          <p className={`text-sm ${packageData.isPopular ? 'text-white/80' : 'text-gray-600'}`}>
            {packageData.description}
          </p>
        </div>

        <div className="text-center mb-8">
          <div className={`flex items-baseline justify-center flex-wrap space-x-1 mb-2`}>
            <span className={`text-5xl font-bold ${packageData.isPopular ? 'text-white' : 'text-[#667EEA]'}`}>
              {formatPrice(packageData.pricePerHour).replace('₫', '')}
            </span>
            <span className={`text-xl ${packageData.isPopular ? 'text-white/70' : 'text-gray-500'}`}>
              ₫
            </span>
            <span className={`text-sm font-medium whitespace-nowrap ${packageData.isPopular ? 'text-white/70' : 'text-gray-500'}`}>
              / giờ thuê studio
            </span>
          </div>
        </div>

        <ul className="space-y-4 mb-8 flex-grow">
          {packageData.features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div className={`${packageData.isPopular ? 'bg-white/20' : 'bg-[#667EEA]/10'} p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                <Check 
                  className={`w-4 h-4 ${packageData.isPopular ? 'text-white' : 'text-[#667EEA]'}`}
                />
              </div>
              <span className={`text-sm font-medium ${packageData.isPopular ? 'text-white/90' : 'text-gray-700'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBookNow(packageData.id)}
          className={`w-full py-4 rounded-xl text-base font-bold transition-all duration-300 ${
            packageData.isPopular
              ? 'bg-white text-[#667EEA] hover:bg-white/90 hover:shadow-xl hover:scale-105'
              : 'bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white hover:shadow-lg hover:shadow-[#667EEA]/40 hover:scale-105'
          }`}
        >
          Đặt lịch ngay
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
