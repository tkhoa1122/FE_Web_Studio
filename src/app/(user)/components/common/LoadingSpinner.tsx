'use client';
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  message?: string;
  variant?: 'default' | 'admin';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  fullScreen = false,
  message = 'Đang tải...',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4'
  };

  const colors = variant === 'admin' 
    ? 'border-blue-600 border-t-transparent'
    : 'border-[#667EEA] border-t-transparent';

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main Spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} ${colors} rounded-full animate-spin`}></div>
        {/* Inner pulse effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} ${variant === 'admin' ? 'bg-blue-500/20' : 'bg-[#667EEA]/20'} rounded-full animate-ping`}></div>
      </div>

      {/* Message */}
      {message && (
        <div className="text-center">
          <p className={`text-lg font-medium ${variant === 'admin' ? 'text-gray-700' : 'text-gray-600'}`}>
            {message}
          </p>
          <div className="flex space-x-1 justify-center mt-2">
            <div className={`w-2 h-2 ${variant === 'admin' ? 'bg-blue-600' : 'bg-[#667EEA]'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 ${variant === 'admin' ? 'bg-blue-600' : 'bg-[#667EEA]'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 ${variant === 'admin' ? 'bg-blue-600' : 'bg-[#667EEA]'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;

