import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Play, Pause, RotateCcw, Zap, Layers, Database } from "lucide-react";

// Sample data for digital twin simulation
const hospitalDepartments = [
  {
    id: 1,
    name: "Emergency",
    currentPatients: 24,
    maxCapacity: 30,
    medicineConsumption: 85,
    criticalMedicines: ["Paracetamol", "Morphine", "Adrenaline"],
    status: "high-activity",
  },
  {
    id: 2,
    name: "ICU",
    currentPatients: 18,
    maxCapacity: 20,
    medicineConsumption: 78,
    criticalMedicines: ["Insulin", "Sedatives", "Antibiotics"],
    status: "critical",
  },
  {
    id: 3,
    name: "Pediatrics",
    currentPatients: 12,
    maxCapacity: 25,
    medicineConsumption: 45,
    criticalMedicines: ["Amoxicillin", "Ibuprofen"],
    status: "normal",
  },
  {
    id: 4,
    name: "Cardiology",
    currentPatients: 15,
    maxCapacity: 20,
    medicineConsumption: 62,
    criticalMedicines: ["Lisinopril", "Aspirin", "Statins"],
    status: "normal",
  },
  {
    id: 5,
    name: "Surgery",
    currentPatients: 8,
    maxCapacity: 12,
    medicineConsumption: 92,
    criticalMedicines: ["Anesthetics", "Antibiotics", "Pain Relief"],
    status: "high-activity",
  },
];

const inventoryLevels = [
  { medicine: "Paracetamol 500mg", current: 1245, threshold: 500, consumption: 12 },
  { medicine: "Insulin Pen", current: 89, threshold: 100, consumption: 8 },
  { medicine: "Amoxicillin 250mg", current: 456, threshold: 200, consumption: 15 },
  { medicine: "Morphine 10mg", current: 67, threshold: 50, consumption: 5 },
  { medicine: "Lisinopril 10mg", current: 234, threshold: 150, consumption: 7 },
];

export default function DigitalTwin() {
  const [isSimulationRunning, setIsSimulationRunning] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [realTimeData, setRealTimeData] = useState({
    totalPatients: 77,
    activeDepartments: 5,
    criticalAlerts: 2,
    systemLoad: 76,
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isSimulationRunning) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalPatients: Math.max(70, Math.min(85, prev.totalPatients + (Math.random() - 0.5) * 4)),
        systemLoad: Math.max(60, Math.min(95, prev.systemLoad + (Math.random() - 0.5) * 10)),
        criticalAlerts: Math.max(0, Math.min(5, prev.criticalAlerts + (Math.random() > 0.8 ? 1 : 0))),
      }));
    }, 2000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulationRunning, simulationSpeed]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "high-activity": return "warning";
      default: return "success";
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = getStatusColor(status);
    return <Badge variant={variant as any}>{status.replace("-", " ")}</Badge>;
  };

  const getInventoryStatus = (current: number, threshold: number) => {
    const percentage = (current / threshold) * 100;
    if (percentage < 100) return { status: "critical", color: "destructive" };
    if (percentage < 150) return { status: "low", color: "warning" };
    return { status: "good", color: "success" };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Digital Twin Simulation</h1>
          <p className="text-muted-foreground">
            Real-time hospital inventory and operations modeling
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary-light text-primary">
            <Activity className="w-3 h-3 mr-1" />
            Live Simulation
          </Badge>
        </div>
      </div>

      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Simulation Controls</span>
          </CardTitle>
          <CardDescription>
            Control and monitor the digital twin simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={isSimulationRunning ? "default" : "outline"}
                onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                className="flex items-center space-x-2"
              >
                {isSimulationRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Speed:</span>
                {[0.5, 1, 2, 4].map((speed) => (
                  <Button
                    key={speed}
                    variant={simulationSpeed === speed ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSimulationSpeed(speed)}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Simulation Active</span>
              </div>
              <div>Last Update: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{Math.round(realTimeData.totalPatients)}</div>
            <div className="text-sm text-muted-foreground">Current Patients</div>
            <div className="mt-2">
              <Progress value={(realTimeData.totalPatients / 100) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{realTimeData.activeDepartments}</div>
            <div className="text-sm text-muted-foreground">Active Departments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{realTimeData.criticalAlerts}</div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{Math.round(realTimeData.systemLoad)}%</div>
            <div className="text-sm text-muted-foreground">System Load</div>
            <div className="mt-2">
              <Progress value={realTimeData.systemLoad} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Department Status</span>
            </CardTitle>
            <CardDescription>
              Real-time department capacity and activity levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hospitalDepartments.map((dept) => (
                <div
                  key={dept.id}
                  className="p-4 rounded-lg border bg-card-header space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{dept.name}</span>
                      {getStatusBadge(dept.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {dept.currentPatients}/{dept.maxCapacity} patients
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity</span>
                      <span>{Math.round((dept.currentPatients / dept.maxCapacity) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(dept.currentPatients / dept.maxCapacity) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Medicine Consumption</span>
                      <span>{dept.medicineConsumption}%</span>
                    </div>
                    <Progress value={dept.medicineConsumption} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Critical Medicines:</p>
                    <div className="flex flex-wrap gap-1">
                      {dept.criticalMedicines.map((medicine, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {medicine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Levels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-secondary" />
              <span>Live Inventory Levels</span>
            </CardTitle>
            <CardDescription>
              Real-time medicine stock levels with consumption rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryLevels.map((item, index) => {
                const { status, color } = getInventoryStatus(item.current, item.threshold);
                const percentage = (item.current / item.threshold) * 100;
                
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border bg-card-header space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{item.medicine}</span>
                        <Badge variant={color as any}>{status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.current} units
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level</span>
                        <span>{Math.round(percentage)}% of threshold</span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Consumption: {item.consumption}/hour</span>
                      <span>Threshold: {item.threshold}</span>
                    </div>
                    
                    {status === "critical" && (
                      <div className="flex items-center space-x-1 text-xs text-destructive">
                        <Activity className="w-3 h-3" />
                        <span>Auto-reorder triggered</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}