import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, Brain, Target } from 'lucide-react';
import { mockRevenueForecasting, formatCurrency } from '../mock';

const ForecastingChart = () => {
  const [forecastModel, setForecastModel] = useState('arima');
  
  const maxValue = Math.max(
    ...mockRevenueForecasting.map(d => Math.max(d.actual || 0, d.predicted))
  );

  const modelTypes = [
    { value: 'arima', label: 'ARIMA Model', accuracy: '92%' },
    { value: 'prophet', label: 'Prophet (FB)', accuracy: '89%' },
    { value: 'lstm', label: 'LSTM Neural Network', accuracy: '94%' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" style={{ color: '#43ff6f' }} />
              Revenue Forecasting & Predictive Analytics
            </CardTitle>
            <div className="flex gap-4 items-center">
              <Select value={forecastModel} onValueChange={setForecastModel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelTypes.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label} ({model.accuracy})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Forecast Chart */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Timeline</span>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Actual Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#43ff6f' }}></div>
                    <span>Predicted Revenue</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {mockRevenueForecasting.map((item, index) => {
                  const actualPercentage = item.actual ? (item.actual / maxValue) * 100 : 0;
                  const predictedPercentage = (item.predicted / maxValue) * 100;
                  const isFuture = !item.actual;
                  
                  return (
                    <div key={index} className={`space-y-2 p-3 rounded-lg ${isFuture ? 'bg-gray-50 border-l-4' : 'bg-white'}`}
                         style={isFuture ? { borderLeftColor: '#43ff6f' } : {}}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium ${isFuture ? 'text-green-700' : 'text-gray-700'}`}>
                            {item.month}
                          </span>
                          {isFuture && <Badge variant="secondary" className="text-green-600 bg-green-50">Forecast</Badge>}
                        </div>
                        <div className="flex gap-4 text-sm">
                          {item.actual && (
                            <span className="font-semibold text-blue-600">
                              {formatCurrency(item.actual)}
                            </span>
                          )}
                          <span className="font-semibold" style={{ color: '#43ff6f' }}>
                            {formatCurrency(item.predicted)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {item.actual && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${actualPercentage}%` }}
                            />
                          </div>
                        )}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${predictedPercentage}%`,
                              backgroundColor: '#43ff6f',
                              opacity: isFuture ? 0.8 : 0.6
                            }}
                          />
                        </div>
                      </div>
                      
                      {isFuture && (
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                          <span>Model: {modelTypes.find(m => m.value === forecastModel)?.label}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4" style={{ borderLeftColor: '#43ff6f' }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8" style={{ color: '#43ff6f' }} />
                    <div>
                      <p className="text-sm text-gray-600">Q1 2025 Forecast</p>
                      <p className="text-lg font-semibold">+14.2% Growth</p>
                      <p className="text-xs text-gray-500">vs Q4 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Model Accuracy</p>
                      <p className="text-lg font-semibold">
                        {modelTypes.find(m => m.value === forecastModel)?.accuracy}
                      </p>
                      <p className="text-xs text-gray-500">Last 12 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Brain className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-sm text-gray-600">Risk Factor</p>
                      <p className="text-lg font-semibold">Low</p>
                      <p className="text-xs text-gray-500">Seasonal adjusted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-2">📊 Key Forecasting Insights</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Revenue expected to grow 14.2% in Q1 2025, driven by technology sector expansion</li>
                  <li>• Peak performance anticipated in March 2025 with $1.78M projected revenue</li>
                  <li>• Model confidence remains above 75% for next 3 months with seasonal adjustments</li>
                  <li>• Recommend increasing merchant acquisition budget by 15% to capture growth opportunity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingChart;