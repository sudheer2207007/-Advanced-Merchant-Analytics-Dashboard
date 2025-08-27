import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingBag,
  Store,
  Target,
  Calendar,
  Filter,
  AlertTriangle,
  Award,
  BarChart3,
  PieChart,
  CreditCard
} from 'lucide-react';
import { 
  mockKPIs,
  mockIndustryBenchmarks,
  mockMerchantSegments,
  mockRiskAlerts,
  formatCurrency,
  formatNumber
} from '../mock';
import ForecastingChart from './ForecastingChart';
import MerchantTable from './MerchantTable';
import SegmentationChart from './SegmentationChart';
import RiskAssessment from './RiskAssessment';
import IndustryAnalysis from './IndustryAnalysis';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30d');
  const [industryFilter, setIndustryFilter] = useState('all');

  const kpiCards = [
    {
      title: 'Total Merchant Revenue',
      value: formatCurrency(mockKPIs.totalMerchantRevenue),
      icon: DollarSign,
      change: '+8.4%',
      changeType: 'positive',
      description: 'YoY growth'
    },
    {
      title: 'Transaction Volume',
      value: formatNumber(mockKPIs.totalTransactionVolume),
      icon: ShoppingBag,
      change: '+12.7%', 
      changeType: 'positive',
      description: 'vs last quarter'
    },
    {
      title: 'Average Ticket Size',
      value: formatCurrency(mockKPIs.averageTicketSize),
      icon: TrendingUp,
      change: '+5.8%',
      changeType: 'positive',
      description: 'vs last quarter'
    },
    {
      title: 'Merchant Retention',
      value: `${mockKPIs.merchantRetentionRate}%`,
      icon: Target,
      change: '+2.1%',
      changeType: 'positive', 
      description: 'retention rate'
    },
    {
      title: 'High Performers',
      value: formatNumber(mockKPIs.highPerformers),
      icon: Award,
      change: '+15',
      changeType: 'positive',
      description: 'top tier merchants'
    },
    {
      title: 'At-Risk Alerts',
      value: formatNumber(mockKPIs.atRiskMerchants),
      icon: AlertTriangle,
      change: '-8',
      changeType: 'positive',
      description: 'requiring attention'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              American Express Merchant Insights
            </h1>
            <p className="text-gray-600 mt-1">
              Advanced analytics and performance optimization for merchant portfolio
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="retail">Retail & Fashion</SelectItem>
                <SelectItem value="hospitality">Food & Hospitality</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Risk Alerts */}
        {mockRiskAlerts.filter(alert => alert.priority === 1).length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Urgent:</strong> {mockRiskAlerts.filter(alert => alert.priority === 1).length} merchants require immediate attention. 
              <span className="underline cursor-pointer ml-2">View Risk Assessment →</span>
            </AlertDescription>
          </Alert>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4" 
                    style={{ borderLeftColor: '#43ff6f' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(67, 255, 111, 0.1)' }}>
                      <Icon className="h-5 w-5" style={{ color: '#43ff6f' }} />
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        kpi.changeType === 'positive' 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-red-600 bg-red-50'
                      }`}
                    >
                      {kpi.change}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-600">
                      {kpi.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {kpi.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-[800px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="industry">Benchmarks</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" style={{ color: '#43ff6f' }} />
                    Merchant Segmentation Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SegmentationChart data={mockMerchantSegments} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" style={{ color: '#43ff6f' }} />
                    Industry Performance Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <IndustryAnalysis data={mockIndustryBenchmarks} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: '#43ff6f' }} />
                  Top Revenue Contributors (Pareto Analysis)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMerchantSegments.slice(0, 3).map((segment, index) => (
                    <div key={segment.segment} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm text-white"
                             style={{ backgroundColor: segment.color }}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{segment.segment}</p>
                          <p className="text-sm text-gray-600">{segment.count} merchants • {segment.characteristics}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(segment.totalRevenue)}</p>
                        <p className="text-sm text-gray-600">{formatCurrency(segment.avgRevenue)} avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting">
            <ForecastingChart />
          </TabsContent>

          <TabsContent value="segmentation">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Segmentation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <SegmentationChart data={mockMerchantSegments} detailed={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessment />
          </TabsContent>

          <TabsContent value="industry">
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarks & Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <IndustryAnalysis data={mockIndustryBenchmarks} detailed={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants">
            <MerchantTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;