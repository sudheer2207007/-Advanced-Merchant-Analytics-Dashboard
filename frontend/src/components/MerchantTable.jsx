import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search, Download, Eye, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { 
  mockMerchants, 
  formatCurrency, 
  formatNumber,
  getStatusColor,
  getRiskColor,
  getGrowthColor
} from '../mock';

const MerchantTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMerchants = mockMerchants.filter(merchant => {
    const matchesSearch = 
      merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || merchant.industry.toLowerCase().includes(industryFilter.toLowerCase());
    const matchesRisk = riskFilter === 'all' || 
      (riskFilter === 'low' && merchant.riskScore <= 30) ||
      (riskFilter === 'medium' && merchant.riskScore > 30 && merchant.riskScore <= 60) ||
      (riskFilter === 'high' && merchant.riskScore > 60);
    
    return matchesSearch && matchesStatus && matchesIndustry && matchesRisk;
  });

  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMerchants = filteredMerchants.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    alert('Export would download comprehensive merchant portfolio report with performance analytics');
  };

  const handleViewDetails = (merchantId) => {
    alert(`Opening detailed analytics dashboard for merchant: ${merchantId}`);
  };

  const handleCreateCampaign = (merchantId) => {
    alert(`Creating targeted marketing campaign for merchant: ${merchantId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" style={{ color: '#43ff6f' }} />
            Merchant Portfolio Analysis
          </CardTitle>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Advanced Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search merchants, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="high-performer">High Performer</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="declining">Declining</SelectItem>
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="retail">Retail & Fashion</SelectItem>
                <SelectItem value="food">Food & Hospitality</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk (0-30)</SelectItem>
                <SelectItem value="medium">Medium Risk (31-60)</SelectItem>
                <SelectItem value="high">High Risk (61+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Merchant Details</TableHead>
                  <TableHead>Industry & Location</TableHead>
                  <TableHead>Performance Metrics</TableHead>
                  <TableHead>Risk Assessment</TableHead>
                  <TableHead>Payment Mix</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMerchants.map((merchant) => (
                  <TableRow key={merchant.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{merchant.businessName}</p>
                        <p className="text-sm text-gray-600">{merchant.id}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(merchant.status)}>
                            {merchant.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {merchant.cardType}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{merchant.industry}</p>
                        <p className="text-sm text-gray-600">{merchant.location}</p>
                        <p className="text-xs text-gray-500">
                          {merchant.tenure} months tenure
                        </p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold">{formatCurrency(merchant.monthlyRevenue)}</p>
                        <p className="text-sm text-gray-600">
                          {formatNumber(merchant.transactionVolume)} transactions
                        </p>
                        <div className="flex items-center gap-1">
                          {merchant.growthRate > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={`text-sm font-semibold ${getGrowthColor(merchant.growthRate)}`}>
                            {merchant.growthRate > 0 ? '+' : ''}{merchant.growthRate}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={getRiskColor(merchant.riskScore)} size="sm">
                          Risk: {merchant.riskScore}
                        </Badge>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              merchant.riskScore <= 30 ? 'bg-green-500' :
                              merchant.riskScore <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(merchant.riskScore, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{merchant.customerSegment}</p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Card: {merchant.paymentMix.card}%</span>
                          <span>Digital: {merchant.paymentMix.digital}%</span>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 flex">
                          <div 
                            className="bg-blue-500 h-2 rounded-l-full"
                            style={{ width: `${merchant.paymentMix.card}%` }}
                          />
                          <div 
                            className="h-2 rounded-r-full"
                            style={{ 
                              width: `${merchant.paymentMix.digital}%`,
                              backgroundColor: '#43ff6f' 
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Avg: {formatCurrency(merchant.avgTicketSize)}
                        </p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(merchant.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {(merchant.status === 'at-risk' || merchant.status === 'declining') && (
                          <Button 
                            size="sm"
                            onClick={() => handleCreateCampaign(merchant.id)}
                            style={{ backgroundColor: '#43ff6f', color: 'white' }}
                          >
                            <AlertCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMerchants.length)} of {filteredMerchants.length} merchants
                {searchTerm && ` (filtered from ${mockMerchants.length} total)`}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Portfolio Summary */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Portfolio Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold" style={{ color: '#43ff6f' }}>
                    {formatCurrency(filteredMerchants.reduce((sum, m) => sum + m.monthlyRevenue, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Growth</p>
                  <p className={`text-lg font-bold ${getGrowthColor(
                    filteredMerchants.reduce((sum, m) => sum + m.growthRate, 0) / filteredMerchants.length
                  )}`}>
                    {filteredMerchants.length > 0 
                      ? `+${(filteredMerchants.reduce((sum, m) => sum + m.growthRate, 0) / filteredMerchants.length).toFixed(1)}%`
                      : '0%'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">High Risk</p>
                  <p className="text-lg font-bold text-red-600">
                    {filteredMerchants.filter(m => m.riskScore > 60).length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Top Performers</p>
                  <p className="text-lg font-bold text-green-600">
                    {filteredMerchants.filter(m => m.status === 'high-performer').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantTable;