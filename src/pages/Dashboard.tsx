import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
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
const usageTrendsData = [
  { month: "Jan", usage: 2400, prediction: 2200 },
  { month: "Feb", usage: 1398, prediction: 1500 },
  { month: "Mar", usage: 9800, prediction: 9500 },
  { month: "Apr", usage: 3908, prediction: 4000 },
  { month: "May", usage: 4800, prediction: 4900 },
  { month: "Jun", usage: 3800, prediction: 3700 },
];

const supplierData = [
  { name: "MedSupply Co", value: 30, color: "hsl(var(--primary))" },
  { name: "HealthCorp", value: 25, color: "hsl(var(--secondary))" },
  { name: "PharmaTech", value: 20, color: "hsl(var(--success))" },
  { name: "MediDist", value: 15, color: "hsl(var(--warning))" },
  { name: "Others", value: 10, color: "hsl(var(--muted))" },
];

const expenseData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 58000 },
];

const shortageAlerts = [
  { medicine: "Paracetamol 500mg", currentStock: 45, threshold: 100, severity: "high" },
  { medicine: "Amoxicillin 250mg", currentStock: 78, threshold: 150, severity: "medium" },
  { medicine: "Insulin Pen", currentStock: 12, threshold: 50, severity: "critical" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Healthcare Dashboard</h1>
          <p className="text-muted-foreground">
            AI-Driven Digital Twin with Blockchain Transparency
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-success-light text-success">
            <Activity className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Medicines"
          value="2,847"
          description="In inventory across all departments"
          icon={<Package className="w-5 h-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Active Suppliers"
          value="23"
          description="Verified and trusted partners"
          icon={<Users className="w-5 h-5 text-secondary" />}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Monthly Expenses"
          value="$58,400"
          description="Current month spending"
          icon={<DollarSign className="w-5 h-5 text-success" />}
          trend={{ value: 3, isPositive: false }}
        />
        <KPICard
          title="Shortage Alerts"
          value="3"
          description="Medicines below threshold"
          icon={<AlertTriangle className="w-5 h-5 text-warning" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Medicine Usage Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly usage patterns with AI predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageTrendsData}>
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
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Actual Usage"
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Supplier Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary" />
              <span>Supplier Distribution</span>
            </CardTitle>
            <CardDescription>
              Medicine supply by trusted partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={supplierData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {supplierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <span>Monthly Expense Breakdown</span>
            </CardTitle>
            <CardDescription>
              Healthcare procurement spending analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={expenseData}>
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
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Shortage Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Critical Alerts</span>
            </CardTitle>
            <CardDescription>
              Low stock medicines requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortageAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.medicine}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.currentStock} / {alert.threshold} units
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "critical"
                        ? "destructive"
                        : alert.severity === "high"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}