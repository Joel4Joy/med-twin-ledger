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
import { FileText, Search, Filter, Download, Calendar } from "lucide-react";

// Sample data
const usageLogs = [
  {
    id: 1,
    patientId: "P-2024-001",
    medicine: "Paracetamol 500mg",
    quantity: 2,
    date: "2024-01-15T10:30:00",
    department: "Emergency",
    finalCost: 0.30,
    prescribedBy: "Dr. Smith",
    administeredBy: "Nurse Johnson",
  },
  {
    id: 2,
    patientId: "P-2024-002",
    medicine: "Amoxicillin 250mg",
    quantity: 14,
    date: "2024-01-15T09:15:00",
    department: "Pediatrics",
    finalCost: 10.50,
    prescribedBy: "Dr. Wilson",
    administeredBy: "Nurse Davis",
  },
  {
    id: 3,
    patientId: "P-2024-003",
    medicine: "Insulin Pen",
    quantity: 1,
    date: "2024-01-15T08:45:00",
    department: "Endocrinology",
    finalCost: 24.99,
    prescribedBy: "Dr. Brown",
    administeredBy: "Nurse Taylor",
  },
  {
    id: 4,
    patientId: "P-2024-004",
    medicine: "Lisinopril 10mg",
    quantity: 30,
    date: "2024-01-14T16:20:00",
    department: "Cardiology",
    finalCost: 13.50,
    prescribedBy: "Dr. Anderson",
    administeredBy: "Nurse Wilson",
  },
  {
    id: 5,
    patientId: "P-2024-005",
    medicine: "Metformin 500mg",
    quantity: 60,
    date: "2024-01-14T14:10:00",
    department: "Internal Medicine",
    finalCost: 15.00,
    prescribedBy: "Dr. Martinez",
    administeredBy: "Nurse Garcia",
  },
  {
    id: 6,
    patientId: "P-2024-006",
    medicine: "Ibuprofen 200mg",
    quantity: 20,
    date: "2024-01-14T11:30:00",
    department: "Orthopedics",
    finalCost: 4.00,
    prescribedBy: "Dr. Lee",
    administeredBy: "Nurse Brown",
  },
];

const departments = [
  "Emergency",
  "Pediatrics",
  "Endocrinology",
  "Cardiology",
  "Internal Medicine",
  "Orthopedics",
  "Surgery",
  "ICU",
];

export default function UsageLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredLogs = usageLogs.filter((log) => {
    const matchesSearch = log.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || log.department === departmentFilter;
    
    const logDate = new Date(log.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = logDate.toDateString() === today.toDateString();
    } else if (dateFilter === "yesterday") {
      matchesDate = logDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === "week") {
      matchesDate = logDate >= weekAgo;
    }
    
    return matchesSearch && matchesDepartment && matchesDate;
  });

  const totalCost = filteredLogs.reduce((sum, log) => sum + log.finalCost, 0);
  const totalQuantity = filteredLogs.reduce((sum, log) => sum + log.quantity, 0);

  const getDepartmentBadge = (department: string) => {
    const colors: { [key: string]: string } = {
      "Emergency": "bg-destructive-light text-destructive",
      "ICU": "bg-destructive-light text-destructive",
      "Surgery": "bg-warning-light text-warning",
      "Cardiology": "bg-primary-light text-primary",
      "Pediatrics": "bg-secondary-light text-secondary",
      "Endocrinology": "bg-success-light text-success",
    };
    
    return (
      <Badge className={colors[department] || "bg-muted text-muted-foreground"}>
        {department}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usage Logs</h1>
          <p className="text-muted-foreground">
            Track medicine consumption across all departments
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{filteredLogs.length}</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{totalQuantity}</div>
            <div className="text-sm text-muted-foreground">Items Dispensed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">${totalCost.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Cost</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{departments.length}</div>
            <div className="text-sm text-muted-foreground">Active Departments</div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Medicine Usage Records</span>
          </CardTitle>
          <CardDescription>
            Detailed log of all medicine dispensing activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient ID, medicine, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Administered By</TableHead>
                  <TableHead>Final Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.patientId}</TableCell>
                    <TableCell className="font-medium">{log.medicine}</TableCell>
                    <TableCell>{log.quantity}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(log.date).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          {new Date(log.date).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getDepartmentBadge(log.department)}</TableCell>
                    <TableCell>{log.prescribedBy}</TableCell>
                    <TableCell>{log.administeredBy}</TableCell>
                    <TableCell className="font-medium">${log.finalCost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No usage logs found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}