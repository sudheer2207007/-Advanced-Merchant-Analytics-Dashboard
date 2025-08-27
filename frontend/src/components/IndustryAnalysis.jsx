import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Building, Users } from 'lucide-react';
import { formatCurrency, formatNumber, getGrowthColor } from '../mock';

const IndustryAnalysis = ({ data, detailed = false }) => {
  const totalMerchants = data.reduce((sum, industry) => sum + industry.merchantCount, 0);
  const avgGrowthRate = data.reduce((sum, industry) => sum + industry.avgGrowth, 0) / data.length;

  return (
    <div className="space-y-6">
      {/* Industry Performance Overview */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Industry Sector</span>
          <div className="flex gap-6">
            <span>Avg Revenue</span>
            <span>Growth Rate</span>
            <span>Market Share</span>
          </div>
        </div>

        {data.map((industry, index) => {
          const marketShare = (industry.merchantCount / totalMerchants) * 100;
          const revenuePosition = (industry.avgRevenue / Math.max(...data.map(d => d.avgRevenue))) * 100;
          
          return (
            <div key={index} className="space-y-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-800">{industry.industry}</span>
                  <Badge variant="secondary" className="text-xs">
                    {industry.merchantCount} merchants
                  </Badge>
                </div>
                
                <div className="flex gap-8 text-sm items-center">
                  <span className="font-semibold w-24 text-right">
                    {formatCurrency(industry.avgRevenue)}
                  </span>
                  <div className="flex items-center gap-1 w-20">
                    {industry.avgGrowth > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`font-semibold ${getGrowthColor(industry.avgGrowth)}`}>
                      {industry.avgGrowth > 0 ? '+' : ''}{industry.avgGrowth.toFixed(1)}%
                    </span>
                  </div>
                  <span className="font-semibold w-16 text-right">
                    {marketShare.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Visual Bars */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Revenue Performance</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${revenuePosition}%`,
                        backgroundColor: '#43ff6f' 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Market Presence</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${marketShare * 2}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Industry Cards */}
      {detailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((industry, index) => (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: index === 0 ? '#43ff6f' : '#e5e5e5' }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {industry.industry}
                  </span>
                  {index === 0 && (
                    <Badge style={{ backgroundColor: '#43ff6f', color: 'white' }}>
                      Top Performer
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Users className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-lg font-semibold">{formatNumber(industry.merchantCount)}</p>
                    <p className="text-xs text-gray-500">Merchants</p>
                  </div>
                  <div>
                    <div className="h-4 w-4 text-gray-500 mx-auto mb-1">💰</div>
                    <p className="text-lg font-semibold">{formatCurrency(industry.avgRevenue)}</p>
                    <p className="text-xs text-gray-500">Avg Revenue</p>
                  </div>
                  <div>
                    <TrendingUp className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <p className={`text-lg font-semibold ${getGrowthColor(industry.avgGrowth)}`}>
                      {industry.avgGrowth > 0 ? '+' : ''}{industry.avgGrowth.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">Growth Rate</p>
                  </div>
                </div>

                {/* Industry Insights */}
                <div className="pt-3 border-t">
                  <h5 className="text-xs font-medium text-gray-600 mb-2">Strategic Insights:</h5>
                  <div className="text-xs text-gray-600 space-y-1">
                    {industry.industry === 'Electronics & Technology' && (
                      <>
                        <p>• Highest growth sector with premium transaction values</p>
                        <p>• Focus on B2B corporate card adoption</p>
                        <p>• Opportunity for payment innovation partnerships</p>
                      </>
                    )}
                    {industry.industry === 'Healthcare & Medical' && (
                      <>
                        <p>• High-value transactions with recurring revenue</p>
                        <p>• Compliance-focused payment solutions needed</p>
                        <p>• Expansion opportunity in telemedicine sector</p>
                      </>
                    )}
                    {industry.industry === 'Retail & Fashion' && (
                      <>
                        <p>• Seasonal patterns with omnichannel needs</p>
                        <p>• Digital payment integration critical</p>
                        <p>• Customer loyalty program opportunities</p>
                      </>
                    )}
                    {industry.industry === 'Food & Hospitality' && (
                      <>
                        <p>• Recovery phase post-pandemic impact</p>
                        <p>• Contactless and mobile payment adoption</p>
                        <p>• Support for small business cash flow</p>
                      </>
                    )}
                    {industry.industry === 'Financial Services' && (
                      <>
                        <p>• Premium segment with complex needs</p>
                        <p>• Regulatory compliance requirements</p>
                        <p>• Cross-selling financial products opportunity</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Industry Benchmarks Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-blue-600">Total Industries</p>
              <p className="text-2xl font-bold text-blue-800">{data.length}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Total Merchants</p>
              <p className="text-2xl font-bold text-blue-800">{formatNumber(totalMerchants)}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Avg Growth Rate</p>
              <p className={`text-2xl font-bold ${getGrowthColor(avgGrowthRate)}`}>
                +{avgGrowthRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Top Sector</p>
              <p className="text-xl font-bold text-blue-800">
                {data.find(d => d.avgGrowth === Math.max(...data.map(i => i.avgGrowth)))?.industry.split(' ')[0]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      {detailed && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">📈 Industry-Specific Growth Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">High-Growth Opportunities</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Technology sector: Expand corporate card penetration</li>
                  <li>• Healthcare: Develop specialized payment solutions</li>
                  <li>• Financial Services: Cross-sell premium products</li>
                  <li>• Retail: Enhance omnichannel payment experience</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Market Expansion</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Target emerging fintech partnerships</li>
                  <li>• Develop industry-specific marketing campaigns</li>
                  <li>• Create vertical-focused account management</li>
                  <li>• Implement predictive industry trend analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndustryAnalysis;