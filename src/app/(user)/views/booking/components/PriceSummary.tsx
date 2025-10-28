'use client';
import React from 'react';

interface Props {
  roomPrice: number;
  quantity: number;
  hours: number;
  equipments: Array<{ name: string; unitPrice: number; qty: number }>;
}

const PriceSummary: React.FC<Props> = ({ roomPrice, quantity, hours, equipments }) => {
  const format = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
  const roomTotal = roomPrice * quantity * hours;
  const eqTotal = equipments.reduce((s, e) => s + e.unitPrice * e.qty * hours, 0);
  const total = roomTotal + eqTotal;

  return (
    <div className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Tóm tắt giá</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Giá phòng ({quantity} phòng × {Number(hours.toFixed(1))} giờ{hours===0 ? ' (ước tính)' : ''})</span>
          <span>{format(roomTotal)} ₫</span>
        </div>
        {equipments.some(e => e.qty > 0) && (
          <div className="space-y-1 text-sm text-white/90">
            {equipments.map((e, idx) => e.qty > 0 && (
              <div key={idx} className="flex justify-between">
                <span>{e.name} ({e.qty} × {Number(hours.toFixed(1))}h)</span>
                <span>{format(e.unitPrice * e.qty * hours)} ₫</span>
              </div>
            ))}
          </div>
        )}
        <div className="border-t border-white/20 pt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Tổng cộng</span>
            <span>{format(total)} ₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;


