import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlockchainVerificationModal } from "@/components/modals/BlockchainVerificationModal";
import { TrendingUp, Brain, Shield, AlertTriangle, Target, Sparkles } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Sample data
const demandForecast = [
  { month: "Feb", actual: 2400, predicted: 2350, confidence: 85 },
  { month: "Mar", actual: 1398, predicted: 1450, confidence: 78 },
  { month: "Apr", actual: 9800, predicted: 9600, confidence: 92 },
  { month: "May", actual: 3908, predicted: 4100, confidence: 88 },
  { month: "Jun", actual: 4800, predicted: 4750, confidence: 91 },
  { month: "Jul", predicted: 4200, confidence: 89 },
  { month: "Aug", predicted: 3800, confidence: 86 },
  { month: "Sep", predicted: 4500, confidence: 83 },
];

const supplierRecommendations = [
  {
    supplier: "MedSupply Corporation",
    score: 96,
    reasons: [
      "98% on-time delivery rate",
      "15% cost reduction potential",
      "High quality ratings (4.8/5)",
      "Strong blockchain verification"
    ],
    riskFactors: ["Single source dependency"],
    predictedSavings: "$12,400",
    confidence: 94,
  },
  {
    supplier: "Global HealthCorp",
    score: 91,
    reasons: [
      "Diverse product portfolio",
      "Competitive pricing model",
      "Strong regulatory compliance",
      "AI-optimized logistics"
    ],
    riskFactors: ["Higher shipping costs", "Longer lead times"],
    predictedSavings: "$8,750",
    confidence: 87,
  },
  {
    supplier: "BioMedical Partners",
    score: 88,
    reasons: [
      "Specialized expertise",
      "Innovation partnership potential",
      "Excellent quality control",
      "Transparent blockchain tracking"
    ],
    riskFactors: ["Premium pricing", "Limited capacity"],
    predictedSavings: "$5,200",
    confidence: 82,
  },
];

const aiPredictions = [
  {
    id: 1,
    type: "Demand Surge",
    medicine: "Paracetamol 500mg",
    prediction: "40% increase expected in next 2 weeks",
    confidence: 89,
    action: "Recommend increasing stock by 500 units",
    blockchain: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
  },
  {
    id: 2,
    type: "Supply Risk",
    medicine: "Insulin Pen",
    prediction: "Potential shortage from supplier delays",
    confidence: 76,
    action: "Contact alternative suppliers immediately",
    blockchain: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
  },
  {
    id: 3,
    type: "Cost Optimization",
    medicine: "Amoxicillin 250mg",
    prediction: "Price drop anticipated next month",
    confidence: 84,
    action: "Delay large orders until price reduction",
    blockchain: "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
  },
];

export default function PredictiveAnalytics() {
  const [blockchainModal, setBlockchainModal] = useState<{
    isOpen: boolean;
    data?: any;
  }>({ isOpen: false });

  const handleBlockchainVerification = (prediction: any) => {
    setBlockchainModal({
      isOpen: true,
      data: {
        transactionHash: prediction.blockchain,
        blockNumber: Math.floor(Math.random() * 1000000).toString(),
        timestamp: new Date().toLocaleString(),
        itemName: `AI Prediction - ${prediction.medicine}`,
        itemType: "prediction" as const,
      },
    });
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-success-light text-success">High</Badge>;
    if (confidence >= 80) return <Badge className="bg-warning-light text-warning">Medium</Badge>;
    return <Badge variant="secondary">Low</Badge>;
  };

  const getPredictionTypeBadge = (type: string) => {
    const colors: { [key: string]: string } = {
      "Demand Surge": "bg-primary-light text-primary",
      "Supply Risk": "bg-destructive-light text-destructive",
      "Cost Optimization": "bg-success-light text-success",
    };
    
    return (
      <Badge className={colors[type] || "bg-muted text-muted-foreground"}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Predictive Analytics</h1>
          <p className="text-muted-foreground">
            AI-driven insights with blockchain-verified transparency
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary-light text-primary">
            <Brain className="w-3 h-3 mr-1" />
            AI Engine Active
          </Badge>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium">Prediction Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-foreground">87.3%</div>
            <div className="text-sm text-muted-foreground">Last 30 days average</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="font-medium">Cost Savings</span>
            </div>
            <div className="text-2xl font-bold text-success">$26,350</div>
            <div className="text-sm text-muted-foreground">Potential monthly savings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="font-medium">Active Alerts</span>
            </div>
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">Requiring immediate attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Demand Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Medicine Demand Forecast</span>
          </CardTitle>
          <CardDescription>
            AI-powered prediction of medicine consumption patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={demandForecast}>
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
                dataKey="actual"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="Actual Demand"
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                strokeDasharray="5 5"
                name="AI Prediction"
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Predictions & Supplier Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Active AI Predictions</span>
            </CardTitle>
            <CardDescription>
              Current insights with blockchain verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiPredictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="p-4 rounded-lg border bg-card-header space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getPredictionTypeBadge(prediction.type)}
                      <span className="font-medium">{prediction.medicine}</span>
                    </div>
                    {getConfidenceBadge(prediction.confidence)}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-foreground">{prediction.prediction}</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Recommended Action: {prediction.action}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Confidence: {prediction.confidence}%
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBlockchainVerification(prediction)}
                      className="flex items-center space-x-1"
                    >
                      <Shield className="w-3 h-3" />
                      <span>Verify</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supplier Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span>AI Supplier Recommendations</span>
            </CardTitle>
            <CardDescription>
              Optimized supplier selection based on multiple factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierRecommendations.map((supplier, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card-header space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-secondary">#{index + 1}</span>
                      </div>
                      <span className="font-medium">{supplier.supplier}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-success-light text-success">
                        {supplier.predictedSavings}
                      </Badge>
                      {getConfidenceBadge(supplier.confidence)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Key Benefits:</p>
                      <ul className="text-xs space-y-1">
                        {supplier.reasons.slice(0, 2).map((reason, i) => (
                          <li key={i} className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-success rounded-full"></div>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {supplier.riskFactors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Risk Factors:</p>
                        <ul className="text-xs space-y-1">
                          {supplier.riskFactors.map((risk, i) => (
                            <li key={i} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-warning rounded-full"></div>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Verification Modal */}
      <BlockchainVerificationModal
        isOpen={blockchainModal.isOpen}
        onClose={() => setBlockchainModal({ isOpen: false })}
        data={blockchainModal.data}
      />
    </div>
  );
}