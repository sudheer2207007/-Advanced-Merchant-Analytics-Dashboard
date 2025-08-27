import React from 'react';
import { formatCurrency } from '../mock';

const RevenueChart = ({ data, detailed = false }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Month</span>
        <span>Revenue</span>
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.revenue / maxRevenue) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {item.month}
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(item.revenue)}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              {detailed && (
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{item.transactions} transactions</span>
                  <span>
                    Avg: {formatCurrency(item.revenue / item.transactions)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Transactions</p>
            <p className="text-lg font-semibold text-gray-900">
              {data.reduce((sum, item) => sum + item.transactions, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;