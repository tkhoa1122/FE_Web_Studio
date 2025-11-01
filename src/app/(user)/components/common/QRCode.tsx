'use client';
import React, { useState } from 'react';

interface QRCodeProps {
  url: string;
  alt?: string;
  size?: number;
}

const QRCodeImage: React.FC<QRCodeProps> = ({ url, alt = 'QR Code', size = 200 }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Luôn tạo ảnh QR từ chuỗi URL bằng dịch vụ QR công khai (ổn định hơn so với BE)
  const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col items-center justify-center">
      {!loaded && !error && (
        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 text-sm">
          Đang tải QR...
        </div>
      )}
      {error && (
        <div className="w-[200px] h-[200px] flex items-center justify-center rounded-xl bg-red-50 text-red-600 text-sm">
          Không tải được QR
        </div>
      )}
      <img
        src={qrImgSrc}
        alt={alt}
        width={size}
        height={size}
        className={`rounded-xl border ${loaded ? 'block' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError('load_failed')}
      />
    </div>
  );
};

export default QRCodeImage;


