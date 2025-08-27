import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  Phone, 
  Mail,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import { mockRiskAlerts, mockMerchants, formatCurrency, getRiskColor } from '../mock';

const RiskAssessment = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const atRiskMerchants = mockMerchants.filter(m => 
    m.status === 'at-risk' || m.status === 'declining' || m.riskScore > 60
  );

  const filteredAlerts = selectedRiskLevel === 'all' 
    ? mockRiskAlerts 
    : mockRiskAlerts.filter(alert => alert.riskLevel.toLowerCase() === selectedRiskLevel);

  const handleContactMerchant = (merchantId, method) => {
    alert(`${method} outreach scheduled for merchant ${merchantId}`);
  };

  const handleCreateCampaign = (merchantId) => {
    alert(`Retention campaign created for merchant ${merchantId}`);
  };

  return (
    <div className="space-y-6">
      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Critical Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockRiskAlerts.filter(a => a.riskLevel === 'Critical').length}
                </p>
                <p className="text-xs text-gray-500">Immediate action required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockRiskAlerts.filter(a => a.riskLevel === 'High').length}
                </p>
                <p className="text-xs text-gray-500">Declining performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Medium Risk</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockRiskAlerts.filter(a => a.riskLevel === 'Medium').length}
                </p>
                <p className="text-xs text-gray-500">Monitor closely</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" style={{ color: '#43ff6f' }} />
              Active Risk Alerts
            </span>
            <div className="flex gap-2">
              {['all', 'critical', 'high', 'medium'].map(level => (
                <Button 
                  key={level}
                  variant={selectedRiskLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRiskLevel(level)}
                  className={selectedRiskLevel === level ? "text-white" : ""}
                  style={selectedRiskLevel === level ? { backgroundColor: '#43ff6f' } : {}}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <Alert key={index} className={`${
                alert.riskLevel === 'Critical' ? 'border-red-200 bg-red-50' :
                alert.riskLevel === 'High' ? 'border-orange-200 bg-orange-50' :
                'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.riskLevel === 'Critical' ? 'text-red-600' :
                        alert.riskLevel === 'High' ? 'text-orange-600' :
                        'text-yellow-600'
                      }`} />
                      <Badge className={`${
                        alert.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                        alert.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alert.riskLevel} Risk
                      </Badge>
                      <span className="font-semibold">{alert.merchantName}</span>
                      <span className="text-sm text-gray-500">({alert.merchantId})</span>
                    </div>
                    <AlertDescription className="text-gray-700 mb-2">
                      <strong>Issue:</strong> {alert.reason}
                    </AlertDescription>
                    <AlertDescription className="text-gray-700 mb-3">
                      <strong>Recommendation:</strong> {alert.recommendation}
                    </AlertDescription>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContactMerchant(alert.merchantId, 'Email')}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContactMerchant(alert.merchantId, 'Call')}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleCreateCampaign(alert.merchantId)}
                      style={{ backgroundColor: '#43ff6f', color: 'white' }}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Campaign
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* At-Risk Merchants Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" style={{ color: '#43ff6f' }} />
            At-Risk Merchant Portfolio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atRiskMerchants.map((merchant, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{merchant.businessName}</h4>
                      <Badge className={getRiskColor(merchant.riskScore)}>
                        Risk Score: {merchant.riskScore}
                      </Badge>
                      <Badge className={`${merchant.status === 'at-risk' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                        {merchant.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Monthly Revenue</p>
                        <p className="font-semibold">{formatCurrency(merchant.monthlyRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Growth Rate</p>
                        <p className={`font-semibold ${merchant.growthRate < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {merchant.growthRate > 0 ? '+' : ''}{merchant.growthRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Industry</p>
                        <p className="font-semibold">{merchant.industry}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tenure</p>
                        <p className="font-semibold">{merchant.tenure} months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Review
                    </Button>
                    <Button size="sm" style={{ backgroundColor: '#43ff6f', color: 'white' }}>
                      Action Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Strategies */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">🎯 Recommended Risk Mitigation Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Immediate Actions (0-30 days)</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Personal outreach to critical risk merchants within 48 hours</li>
                <li>• Offer temporary fee reductions or payment flexibility</li>
                <li>• Schedule business review meetings with account managers</li>
                <li>• Deploy targeted retention campaigns with special offers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Strategic Initiatives (30-90 days)</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Implement predictive churn modeling for early detection</li>
                <li>• Develop industry-specific support programs</li>
                <li>• Create merchant success workshops and training</li>
                <li>• Establish quarterly health check processes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;