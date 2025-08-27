import React from 'react';
import { formatCurrency } from '../mock';

const CategoryChart = ({ data }) => {
  const colors = [
    'bg-blue-500',
    'bg-emerald-500', 
    'bg-amber-500',
    'bg-violet-500',
    'bg-rose-500'
  ];
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="space-y-6">
      {/* Donut Chart Simulation */}
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 rounded-full border-[24px] border-gray-100"></div>
        
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 rounded-full border-[24px] border-transparent ${colors[index]} opacity-80`}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.sin((angle * Math.PI) / 180) * 50}% ${50 - Math.cos((angle * Math.PI) / 180) * 50}%, 50% 50%)`
              }}
            />
          );
        })}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-sm">
            <div className="text-center">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-sm font-semibold">{total}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
              <span className="text-sm font-medium text-gray-700">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {formatCurrency(item.revenue)}
              </p>
              <p className="text-xs text-gray-500">
                {item.value}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;