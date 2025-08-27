// Mock data for Merchant Performance Insights Dashboard

export const mockMerchants = [
  {
    id: "1",
    name: "TechStore Pro",
    category: "Electronics",
    status: "active",
    joinedDate: "2024-01-15",
    location: "San Francisco, CA"
  },
  {
    id: "2", 
    name: "Fashion Hub",
    category: "Clothing",
    status: "active",
    joinedDate: "2024-02-20",
    location: "New York, NY"
  },
  {
    id: "3",
    name: "Home Essentials",
    category: "Home & Garden",
    status: "pending",
    joinedDate: "2024-03-10",
    location: "Austin, TX"
  },
  {
    id: "4",
    name: "BookWorld",
    category: "Books",
    status: "active",
    joinedDate: "2024-01-05",
    location: "Seattle, WA"
  }
];

export const mockMetrics = {
  totalRevenue: 2847293,
  totalTransactions: 15847,
  averageOrderValue: 179.65,
  conversionRate: 3.2,
  activeStores: 156,
  newCustomers: 2341,
  customerRetention: 68.5,
  topSellingCategory: "Electronics"
};

export const mockRevenueData = [
  { month: "Jan", revenue: 185000, transactions: 1250 },
  { month: "Feb", revenue: 225000, transactions: 1480 },
  { month: "Mar", revenue: 195000, transactions: 1320 },
  { month: "Apr", revenue: 265000, transactions: 1680 },
  { month: "May", revenue: 245000, transactions: 1590 },
  { month: "Jun", revenue: 285000, transactions: 1750 },
  { month: "Jul", revenue: 320000, transactions: 1950 }
];

export const mockCategoryData = [
  { name: "Electronics", value: 35, revenue: 995430 },
  { name: "Clothing", value: 28, revenue: 796820 },
  { name: "Home & Garden", value: 18, revenue: 512513 },
  { name: "Books", value: 12, revenue: 341667 },
  { name: "Sports", value: 7, revenue: 199363 }
];

export const mockTransactions = [
  {
    id: "TXN-001",
    merchantId: "1",
    merchantName: "TechStore Pro",
    amount: 299.99,
    date: "2024-07-15",
    status: "completed",
    product: "Wireless Headphones",
    customer: "John Doe"
  },
  {
    id: "TXN-002", 
    merchantId: "2",
    merchantName: "Fashion Hub",
    amount: 89.50,
    date: "2024-07-14",
    status: "completed",
    product: "Summer Dress",
    customer: "Sarah Wilson"
  },
  {
    id: "TXN-003",
    merchantId: "1", 
    merchantName: "TechStore Pro",
    amount: 549.99,
    date: "2024-07-14",
    status: "pending",
    product: "Gaming Laptop",
    customer: "Mike Johnson"
  },
  {
    id: "TXN-004",
    merchantId: "4",
    merchantName: "BookWorld",
    amount: 24.99,
    date: "2024-07-13",
    status: "completed",
    product: "Programming Guide",
    customer: "Emma Brown"
  },
  {
    id: "TXN-005",
    merchantId: "2",
    merchantName: "Fashion Hub", 
    amount: 129.99,
    date: "2024-07-13",
    status: "refunded",
    product: "Designer Handbag",
    customer: "Lisa Garcia"
  }
];

export const mockTopPerformers = [
  {
    merchantId: "1",
    merchantName: "TechStore Pro",
    revenue: 89250,
    growth: 12.5,
    transactions: 458
  },
  {
    merchantId: "2", 
    merchantName: "Fashion Hub",
    revenue: 76890,
    growth: 8.7,
    transactions: 623
  },
  {
    merchantId: "4",
    merchantName: "BookWorld",
    revenue: 45600,
    growth: 15.2,
    transactions: 892
  }
];

// Helper functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50', 
    inactive: 'text-red-600 bg-red-50',
    completed: 'text-green-600 bg-green-50',
    refunded: 'text-red-600 bg-red-50'
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
};