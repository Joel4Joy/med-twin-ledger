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
import { BlockchainVerificationModal } from "@/components/modals/BlockchainVerificationModal";
import { Package, Search, Filter, Shield, Download } from "lucide-react";

// Sample data
const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: "$0.15",
    manufacturer: "GenericPharma",
    packSize: "10 tablets",
    availability: "Available",
    composition: "Paracetamol 500mg",
    stock: 2500,
    blockchainHash: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: "$0.75",
    manufacturer: "BioMed Ltd",
    packSize: "14 capsules",
    availability: "Low Stock",
    composition: "Amoxicillin 250mg",
    stock: 150,
    blockchainHash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
  },
  {
    id: 3,
    name: "Insulin Pen",
    price: "$24.99",
    manufacturer: "DiabetesCare",
    packSize: "1 pen (3ml)",
    availability: "Critical",
    composition: "Insulin Aspart 100U/ml",
    stock: 45,
    blockchainHash: "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
  },
  {
    id: 4,
    name: "Lisinopril 10mg",
    price: "$0.45",
    manufacturer: "CardioMed",
    packSize: "30 tablets",
    availability: "Available",
    composition: "Lisinopril 10mg",
    stock: 800,
    blockchainHash: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789ab",
  },
  {
    id: 5,
    name: "Metformin 500mg",
    price: "$0.25",
    manufacturer: "DiabetesCare",
    packSize: "60 tablets",
    availability: "Available",
    composition: "Metformin HCl 500mg",
    stock: 1200,
    blockchainHash: "0x987654321098765432109876543210987654321098765432109876543210987",
  },
];

export default function MedicineInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blockchainModal, setBlockchainModal] = useState<{
    isOpen: boolean;
    data?: any;
  }>({ isOpen: false });

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         medicine.availability.toLowerCase().replace(" ", "-") === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-success-light text-success">Available</Badge>;
      case "Low Stock":
        return <Badge className="bg-warning-light text-warning">Low Stock</Badge>;
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "Discontinued":
        return <Badge variant="secondary">Discontinued</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleBlockchainVerification = (medicine: any) => {
    setBlockchainModal({
      isOpen: true,
      data: {
        transactionHash: medicine.blockchainHash,
        blockNumber: Math.floor(Math.random() * 1000000).toString(),
        timestamp: new Date().toLocaleString(),
        itemName: medicine.name,
        itemType: "medicine" as const,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medicine Inventory</h1>
          <p className="text-muted-foreground">
            Blockchain-verified pharmaceutical inventory management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Package className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">2,847</div>
            <div className="text-sm text-muted-foreground">Total Medicines</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">2,652</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">150</div>
            <div className="text-sm text-muted-foreground">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">45</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary" />
            <span>Inventory Overview</span>
          </CardTitle>
          <CardDescription>
            Search and filter your medicine inventory with blockchain verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines or manufacturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medicine Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Pack Size</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Composition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">{medicine.name}</TableCell>
                    <TableCell>{medicine.price}</TableCell>
                    <TableCell>{medicine.manufacturer}</TableCell>
                    <TableCell>{medicine.packSize}</TableCell>
                    <TableCell>{medicine.stock.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(medicine.availability)}</TableCell>
                    <TableCell className="max-w-48 truncate">{medicine.composition}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBlockchainVerification(medicine)}
                        className="flex items-center space-x-1"
                      >
                        <Shield className="w-3 h-3" />
                        <span>Verify</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No medicines found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain Verification Modal */}
      <BlockchainVerificationModal
        isOpen={blockchainModal.isOpen}
        onClose={() => setBlockchainModal({ isOpen: false })}
        data={blockchainModal.data}
      />
    </div>
  );
}