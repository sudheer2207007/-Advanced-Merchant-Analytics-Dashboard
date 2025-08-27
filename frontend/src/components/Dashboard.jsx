import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Store,
  Target,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  mockMetrics, 
  mockRevenueData, 
  mockCategoryData,
  mockTopPerformers,
  formatCurrency,
  formatNumber
} from '../mock';
import RevenueChart from './RevenueChart';
import TransactionsTable from './TransactionsTable';
import CategoryChart from './CategoryChart';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [selectedMerchant, setSelectedMerchant] = useState('all');

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(mockMetrics.totalRevenue),
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Total Transactions',
      value: formatNumber(mockMetrics.totalTransactions),
      icon: ShoppingBag,
      change: '+8.2%', 
      changeType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(mockMetrics.averageOrderValue),
      icon: TrendingUp,
      change: '+5.1%',
      changeType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: `${mockMetrics.conversionRate}%`,
      icon: Target,
      change: '-0.5%',
      changeType: 'negative', 
      description: 'vs last month'
    },
    {
      title: 'Active Stores',
      value: formatNumber(mockMetrics.activeStores),
      icon: Store,
      change: '+15',
      changeType: 'positive',
      description: 'new this month'
    },
    {
      title: 'New Customers',
      value: formatNumber(mockMetrics.newCustomers),
      icon: Users,
      change: '+23.1%',
      changeType: 'positive',
      description: 'vs last month'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Merchant Performance Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and analyze merchant performance metrics
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
            
            <Select value={selectedMerchant} onValueChange={setSelectedMerchant}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Merchants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Merchants</SelectItem>
                <SelectItem value="1">TechStore Pro</SelectItem>
                <SelectItem value="2">Fashion Hub</SelectItem>
                <SelectItem value="4">BookWorld</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
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
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart data={mockRevenueData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryChart data={mockCategoryData} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Merchants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopPerformers.map((merchant, index) => (
                    <div key={merchant.merchantId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{merchant.merchantName}</p>
                          <p className="text-sm text-gray-600">{merchant.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(merchant.revenue)}</p>
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          +{merchant.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart data={mockRevenueData} detailed={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Merchant analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;