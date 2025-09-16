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
import { Users, Search, Star, MapPin, Calendar, Sparkles } from "lucide-react";

// Sample data
const suppliers = [
  {
    id: 1,
    name: "MedSupply Corporation",
    rating: 4.8,
    location: "New York, NY",
    trustScore: 98,
    lastContract: "2024-01-15",
    specialties: ["Antibiotics", "Pain Management"],
    totalContracts: 45,
    onTimeDeliver: 96,
    isRecommended: true,
  },
  {
    id: 2,
    name: "Global HealthCorp",
    rating: 4.6,
    location: "Los Angeles, CA",
    trustScore: 95,
    lastContract: "2024-01-10",
    specialties: ["Diabetes Care", "Cardiovascular"],
    totalContracts: 38,
    onTimeDeliver: 94,
    isRecommended: true,
  },
  {
    id: 3,
    name: "PharmaTech Solutions",
    rating: 4.2,
    location: "Chicago, IL",
    trustScore: 87,
    lastContract: "2023-12-20",
    specialties: ["Generic Medicines", "Vaccines"],
    totalContracts: 22,
    onTimeDeliver: 89,
    isRecommended: false,
  },
  {
    id: 4,
    name: "BioMedical Partners",
    rating: 4.7,
    location: "Boston, MA",
    trustScore: 93,
    lastContract: "2024-01-08",
    specialties: ["Specialty Drugs", "Oncology"],
    totalContracts: 31,
    onTimeDeliver: 92,
    isRecommended: true,
  },
  {
    id: 5,
    name: "Unity Pharmaceuticals",
    rating: 4.1,
    location: "Houston, TX",
    trustScore: 82,
    lastContract: "2023-11-30",
    specialties: ["Emergency Medicine", "Surgery"],
    totalContracts: 18,
    onTimeDeliver: 85,
    isRecommended: false,
  },
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const recommendedSuppliers = filteredSuppliers.filter(s => s.isRecommended);
  const otherSuppliers = filteredSuppliers.filter(s => !s.isRecommended);

  const getTrustScoreBadge = (score: number) => {
    if (score >= 95) return <Badge className="bg-success-light text-success">Excellent</Badge>;
    if (score >= 85) return <Badge className="bg-warning-light text-warning">Good</Badge>;
    return <Badge variant="secondary">Fair</Badge>;
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-warning fill-warning"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
          <p className="text-muted-foreground">
            AI-driven supplier recommendations and trust analytics
          </p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add New Supplier
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="text-sm text-muted-foreground">Active Suppliers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">3</div>
            <div className="text-sm text-muted-foreground">AI Recommended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">4.6</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">92%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Recommended Suppliers */}
      {recommendedSuppliers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>AI Recommended Suppliers</span>
            </CardTitle>
            <CardDescription>
              Top-performing suppliers based on trust score, delivery performance, and contract history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>Last Contract</TableHead>
                    <TableHead>Specialties</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendedSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="bg-primary/5">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span>{supplier.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(supplier.rating)}
                          <span className="ml-2 text-sm font-medium">{supplier.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{supplier.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getTrustScoreBadge(supplier.trustScore)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(supplier.lastContract).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{supplier.onTimeDeliver}% On-Time</div>
                          <div className="text-muted-foreground">{supplier.totalContracts} contracts</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-secondary" />
            <span>All Suppliers</span>
          </CardTitle>
          <CardDescription>
            Complete supplier directory with performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Last Contract</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getRatingStars(supplier.rating)}
                        <span className="ml-2 text-sm font-medium">{supplier.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{supplier.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTrustScoreBadge(supplier.trustScore)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(supplier.lastContract).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {supplier.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{supplier.onTimeDeliver}% On-Time</div>
                        <div className="text-muted-foreground">{supplier.totalContracts} contracts</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}