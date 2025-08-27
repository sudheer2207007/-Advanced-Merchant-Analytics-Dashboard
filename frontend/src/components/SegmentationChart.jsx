import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../mock';

const SegmentationChart = ({ data, detailed = false }) => {
  const totalMerchants = data.reduce((sum, segment) => sum + segment.count, 0);
  const totalRevenue = data.reduce((sum, segment) => sum + segment.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Segmentation Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Merchant Count Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Merchant Distribution</h4>
          <div className="space-y-3">
            {data.map((segment, index) => {
              const percentage = (segment.count / totalMerchants) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {segment.segment}
                    </span>
                    <span className="text-sm font-semibold">
                      {segment.count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: segment.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Revenue Distribution</h4>
          <div className="space-y-3">
            {data.map((segment, index) => {
              const percentage = (segment.totalRevenue / totalRevenue) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {segment.segment}
                    </span>
                    <span className="text-sm font-semibold">
                      {formatCurrency(segment.totalRevenue)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: segment.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Segment Cards */}
      {detailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((segment, index) => (
            <Card key={index} className="border-l-4 hover:shadow-lg transition-shadow"
                  style={{ borderLeftColor: segment.color }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{segment.segment}</span>
                  <Badge variant="secondary" style={{ backgroundColor: `${segment.color}20`, color: segment.color }}>
                    Tier {index + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{segment.characteristics}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold">{formatNumber(segment.count)}</p>
                    <p className="text-xs text-gray-500">Merchants</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold">{formatCurrency(segment.totalRevenue)}</p>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold">{formatCurrency(segment.avgRevenue)}</p>
                    <p className="text-xs text-gray-500">Avg Revenue</p>
                  </div>
                </div>

                {/* Segment Insights */}
                <div className="pt-3 border-t">
                  <h5 className="text-xs font-medium text-gray-600 mb-2">Strategic Focus:</h5>
                  <div className="text-xs text-gray-600">
                    {index === 0 && "Maximize wallet share, premium service offerings"}
                    {index === 1 && "Accelerate growth, cross-sell opportunities"}
                    {index === 2 && "Maintain satisfaction, prevent churn"}
                    {index === 3 && "Nurture growth, upgrade pathways"}
                    {index === 4 && "Immediate intervention, retention programs"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Merchants</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(totalMerchants)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Top Segment</p>
            <p className="text-2xl font-bold" style={{ color: data[0].color }}>
              {data[0].segment.split(' ')[0]}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg per Merchant</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue / totalMerchants)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentationChart;