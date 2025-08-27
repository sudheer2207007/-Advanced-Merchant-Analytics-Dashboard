// Enhanced Mock Data for American Express Merchant Performance Insights Dashboard

export const mockMerchants = [
  {
    id: "AMX-001",
    businessName: "TechNova Electronics",
    industry: "Electronics & Technology", 
    location: "San Francisco, CA",
    tenure: 36, // months
    status: "high-performer",
    riskScore: 15,
    cardType: "Corporate",
    monthlyRevenue: 2450000,
    transactionVolume: 18500,
    avgTicketSize: 132.43,
    growthRate: 18.5,
    customerSegment: "Premium",
    paymentMix: { card: 78, digital: 22 }
  },
  {
    id: "AMX-002", 
    businessName: "Fashion Forward Boutique",
    industry: "Retail & Fashion",
    location: "New York, NY", 
    tenure: 24,
    status: "stable",
    riskScore: 35,
    cardType: "Business",
    monthlyRevenue: 890000,
    transactionVolume: 12400,
    avgTicketSize: 71.77,
    growthRate: 5.2,
    customerSegment: "Mid-Market",
    paymentMix: { card: 65, digital: 35 }
  },
  {
    id: "AMX-003",
    businessName: "Urban Dining Group", 
    industry: "Food & Hospitality",
    location: "Chicago, IL",
    tenure: 18,
    status: "at-risk",
    riskScore: 75,
    cardType: "Small Business",
    monthlyRevenue: 450000,
    transactionVolume: 8900,
    avgTicketSize: 50.56,
    growthRate: -8.3,
    customerSegment: "Small Business", 
    paymentMix: { card: 85, digital: 15 }
  },
  {
    id: "AMX-004",
    businessName: "HealthTech Solutions",
    industry: "Healthcare & Medical",
    location: "Boston, MA",
    tenure: 42,
    status: "high-performer", 
    riskScore: 20,
    cardType: "Corporate",
    monthlyRevenue: 1850000,
    transactionVolume: 6700,
    avgTicketSize: 276.12,
    growthRate: 22.1,
    customerSegment: "Premium",
    paymentMix: { card: 92, digital: 8 }
  },
  {
    id: "AMX-005",
    businessName: "Local Market Chain",
    industry: "Grocery & Food",
    location: "Austin, TX", 
    tenure: 60,
    status: "declining",
    riskScore: 85,
    cardType: "Business",
    monthlyRevenue: 720000,
    transactionVolume: 25600,
    avgTicketSize: 28.13,
    growthRate: -12.7,
    customerSegment: "Mid-Market",
    paymentMix: { card: 45, digital: 55 }
  }
];

export const mockKPIs = {
  totalMerchantRevenue: 12847000000,
  totalTransactionVolume: 2450000,
  averageTicketSize: 524.49,
  merchantRetentionRate: 94.2,
  newMerchantAcquisition: 145,
  atRiskMerchants: 23,
  highPerformers: 78,
  industryGrowthRate: 8.4
};

export const mockIndustryBenchmarks = [
  { industry: "Electronics & Technology", avgRevenue: 1850000, avgGrowth: 15.2, merchantCount: 45 },
  { industry: "Food & Hospitality", avgRevenue: 680000, avgGrowth: 3.8, merchantCount: 128 },
  { industry: "Retail & Fashion", avgRevenue: 920000, avgGrowth: 7.1, merchantCount: 89 },
  { industry: "Healthcare & Medical", avgRevenue: 1450000, avgGrowth: 18.9, merchantCount: 32 },
  { industry: "Financial Services", avgRevenue: 2100000, avgGrowth: 12.4, merchantCount: 27 }
];

export const mockRevenueForecasting = [
  { month: "Aug 2024", actual: 1200000, predicted: 1195000, confidence: 0.92 },
  { month: "Sep 2024", actual: 1350000, predicted: 1340000, confidence: 0.89 },
  { month: "Oct 2024", actual: 1280000, predicted: 1290000, confidence: 0.91 },
  { month: "Nov 2024", actual: 1420000, predicted: 1410000, confidence: 0.88 },
  { month: "Dec 2024", actual: 1580000, predicted: 1570000, confidence: 0.85 },
  { month: "Jan 2025", actual: null, predicted: 1650000, confidence: 0.82 },
  { month: "Feb 2025", actual: null, predicted: 1720000, confidence: 0.78 },
  { month: "Mar 2025", actual: null, predicted: 1780000, confidence: 0.75 }
];

export const mockCustomerDemographics = [
  { ageGroup: "25-34", percentage: 28, avgSpend: 145.32, transactions: 450000 },
  { ageGroup: "35-44", percentage: 24, avgSpend: 198.77, transactions: 380000 },
  { ageGroup: "45-54", percentage: 22, avgSpend: 234.56, transactions: 340000 },
  { ageGroup: "55-64", percentage: 15, avgSpend: 187.89, transactions: 220000 },
  { ageGroup: "18-24", percentage: 8, avgSpend: 89.43, transactions: 125000 },
  { ageGroup: "65+", percentage: 3, avgSpend: 156.78, transactions: 45000 }
];

export const mockRiskAlerts = [
  {
    merchantId: "AMX-003",
    merchantName: "Urban Dining Group",
    riskLevel: "High",
    reason: "Revenue declined 15% over 3 months",
    recommendation: "Implement retention campaign & review pricing strategy",
    priority: 1
  },
  {
    merchantId: "AMX-005", 
    merchantName: "Local Market Chain",
    riskLevel: "Critical",
    reason: "Transaction volume down 20%, customer complaints increased",
    recommendation: "Immediate intervention required - schedule business review",
    priority: 1
  },
  {
    merchantId: "AMX-012",
    merchantName: "Seasonal Sports Store",
    riskLevel: "Medium", 
    reason: "Seasonal decline but below historical patterns",
    recommendation: "Monitor closely, prepare seasonal marketing support",
    priority: 2
  }
];

export const mockMerchantSegments = [
  { 
    segment: "High-Value Premium", 
    count: 45, 
    totalRevenue: 4200000000,
    avgRevenue: 93333333,
    characteristics: "Large corporate accounts, high-ticket transactions",
    color: "#43ff6f"
  },
  {
    segment: "Growth Champions",
    count: 78,
    totalRevenue: 2800000000, 
    avgRevenue: 35897436,
    characteristics: "Fast-growing mid-market businesses",
    color: "#36d399"
  },
  {
    segment: "Stable Core",
    count: 234,
    totalRevenue: 4100000000,
    avgRevenue: 17521368,
    characteristics: "Established businesses with consistent performance",
    color: "#22c55e"
  },
  {
    segment: "Emerging Potential",
    count: 156,
    totalRevenue: 890000000,
    avgRevenue: 5705128,
    characteristics: "New merchants with growth potential",
    color: "#84cc16"
  },
  {
    segment: "At-Risk",
    count: 23,
    totalRevenue: 340000000,
    avgRevenue: 14782609,
    characteristics: "Declining performance, needs intervention",
    color: "#ef4444"
  }
];

export const mockPaymentTrends = [
  { method: "American Express Cards", percentage: 68, growth: 5.2, volume: 1666000 },
  { method: "Digital Payments", percentage: 32, growth: 18.7, volume: 784000 },
  { method: "Corporate Cards", percentage: 25, growth: 8.9, volume: 612500 },
  { method: "Business Cards", percentage: 28, growth: 3.1, volume: 686000 },
  { method: "Consumer Cards", percentage: 15, growth: 2.8, volume: 367500 }
];

// Helper functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};

export const getRiskColor = (riskScore) => {
  if (riskScore <= 25) return 'text-green-600 bg-green-50';
  if (riskScore <= 50) return 'text-yellow-600 bg-yellow-50';  
  if (riskScore <= 75) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

export const getStatusColor = (status) => {
  const colors = {
    'high-performer': 'text-green-600 bg-green-50',
    'stable': 'text-blue-600 bg-blue-50',
    'at-risk': 'text-orange-600 bg-orange-50',
    'declining': 'text-red-600 bg-red-50'
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
};

export const getGrowthColor = (growth) => {
  if (growth > 10) return 'text-green-600';
  if (growth > 0) return 'text-emerald-600';
  if (growth > -5) return 'text-yellow-600';
  return 'text-red-600';
};