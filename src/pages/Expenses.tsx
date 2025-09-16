import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Search, Filter, Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Sample data
const expenses = [
  {
    id: 1,
    date: "2024-01-15",
    category: "Medicine Purchase",
    amount: 15420.50,
    description: "Antibiotics and pain medications from MedSupply Corp",
    vendor: "MedSupply Corp",
    department: "Pharmacy",
    status: "Paid",
  },
  {
    id: 2,
    date: "2024-01-14",
    category: "Equipment",
    amount: 8750.00,
    description: "Medical devices and monitoring equipment",
    vendor: "HealthTech Solutions",
    department: "ICU",
    status: "Pending",
  },
  {
    id: 3,
    date: "2024-01-13",
    category: "Medicine Purchase",
    amount: 12300.75,
    description: "Insulin and diabetes care supplies",
    vendor: "DiabetesCare Inc",
    department: "Endocrinology",
    status: "Paid",
  },
  {
    id: 4,
    date: "2024-01-12",
    category: "Maintenance",
    amount: 3200.00,
    description: "Equipment calibration and maintenance",
    vendor: "Service Pro",
    department: "Facilities",
    status: "Paid",
  },
  {
    id: 5,
    date: "2024-01-11",
    category: "Medicine Purchase",
    amount: 9850.25,
    description: "Emergency medicine stock replenishment",
    vendor: "Global HealthCorp",
    department: "Emergency",
    status: "Paid",
  },
];

const expenseCategories = [
  "Medicine Purchase",
  "Equipment",
  "Maintenance",
  "Staff",
  "Utilities",
  "Other",
];

const monthlyTrends = [
  { month: "Jul", amount: 45000, budget: 50000 },
  { month: "Aug", amount: 52000, budget: 50000 },
  { month: "Sep", amount: 48000, budget: 50000 },
  { month: "Oct", amount: 61000, budget: 55000 },
  { month: "Nov", amount: 55000, budget: 55000 },
  { month: "Dec", amount: 58000, budget: 55000 },
  { month: "Jan", amount: 62450, budget: 60000 },
];

const categoryBreakdown = [
  { name: "Medicine Purchase", value: 75, color: "hsl(var(--primary))" },
  { name: "Equipment", value: 15, color: "hsl(var(--secondary))" },
  { name: "Maintenance", value: 5, color: "hsl(var(--success))" },
  { name: "Staff", value: 3, color: "hsl(var(--warning))" },
  { name: "Other", value: 2, color: "hsl(var(--muted))" },
];

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || expense.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(e => e.status === "Paid").reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(e => e.status === "Pending").reduce((sum, expense) => sum + expense.amount, 0);

  const getStatusBadge = (status: string) => {
    return status === "Paid" 
      ? <Badge className="bg-success-light text-success">Paid</Badge>
      : <Badge className="bg-warning-light text-warning">Pending</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      "Medicine Purchase": "bg-primary-light text-primary",
      "Equipment": "bg-secondary-light text-secondary",
      "Maintenance": "bg-success-light text-success",
      "Staff": "bg-warning-light text-warning",
    };
    
    return (
      <Badge className={colors[category] || "bg-muted text-muted-foreground"}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expense Management</h1>
          <p className="text-muted-foreground">
            Track and analyze healthcare procurement expenses
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-success mr-1" />
              <span className="text-xs text-success">+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">${paidExpenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">${pendingExpenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">$60,000</div>
            <div className="text-sm text-muted-foreground">Monthly Budget</div>
            <div className="flex items-center mt-1">
              <TrendingDown className="w-3 h-3 text-destructive mr-1" />
              <span className="text-xs text-destructive">4% over budget</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Monthly Expense Trends</span>
            </CardTitle>
            <CardDescription>
              Expense patterns vs budget over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke="hsl(var(--muted))"
                  fill="hsl(var(--muted))"
                  fillOpacity={0.3}
                  name="Budget"
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                  name="Actual Expense"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <span>Expense Categories</span>
            </CardTitle>
            <CardDescription>
              Breakdown by expense type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span>Expense Records</span>
          </CardTitle>
          <CardDescription>
            Detailed expense tracking and management
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses by description, vendor, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getCategoryBadge(expense.category)}</TableCell>
                    <TableCell className="max-w-64 truncate">{expense.description}</TableCell>
                    <TableCell>{expense.vendor}</TableCell>
                    <TableCell>{expense.department}</TableCell>
                    <TableCell className="font-medium">${expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No expenses found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}