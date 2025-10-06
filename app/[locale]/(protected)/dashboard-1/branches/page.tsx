import React, { useMemo } from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Building2,
  MapPin, 
  Phone,
  User,
  Fuel,
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  AlertCircle
} from "lucide-react";
import { mockBranches } from "@/lib/data/mock-eer-data";

const BranchesPage = () => {
  const branches = useMemo(() => mockBranches, []);

  const getStatusColor = useMemo(() => (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  }, []);

  const getEfficiencyColor = useMemo(() => (rating: number) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'info';
    if (rating >= 3.5) return 'warning';
    return 'destructive';
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Branch Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage all filling station branches and monitor their performance
          </p>
        </div>
        <Button asChild>
          <Link href="/branches/add">
            <Plus className="h-4 w-4 mr-2" />
            Add New Branch
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
            <p className="text-xs text-muted-foreground">
              Across multiple locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {branches.filter(b => b.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Operational branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <div className="h-2 w-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {branches.filter(b => b.status === 'maintenance').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Under maintenance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(branches.reduce((acc, b) => acc + b.monthlyMetrics.efficiency.rating, 0) / branches.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search branches..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Branches Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{branch.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {branch.location.address}, {branch.location.city}
                  </CardDescription>
                </div>
                <Badge color={getStatusColor(branch.status)}>
                  {branch.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Manager & Contact */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{branch.manager}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{branch.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {branch.openingHours.is24Hours ? "24/7" : 
                     `${branch.openingHours.open} - ${branch.openingHours.close}`}
                  </span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Monthly Revenue
                  </p>
                  <p className="text-lg font-bold">
                    ₦{(branch.monthlyMetrics.sales.totalRevenue / 1000).toFixed(0)}k
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Efficiency Rating
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">
                      {branch.monthlyMetrics.efficiency.rating}/5.0
                    </p>
                    <Badge color={getEfficiencyColor(branch.monthlyMetrics.efficiency.rating)} className="text-xs">
                      {branch.monthlyMetrics.efficiency.rating >= 4.5 ? 'Excellent' :
                       branch.monthlyMetrics.efficiency.rating >= 4.0 ? 'Good' :
                       branch.monthlyMetrics.efficiency.rating >= 3.5 ? 'Average' : 'Poor'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Fuel Stock Status */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Fuel Stock Status</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Petrol</span>
                      <span>{((branch.currentStock.petrol / branch.capacity.petrol) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={(branch.currentStock.petrol / branch.capacity.petrol) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Diesel</span>
                      <span>{((branch.currentStock.diesel / branch.capacity.diesel) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={(branch.currentStock.diesel / branch.capacity.diesel) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>

              {/* Energy Consumption */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Energy Consumption</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Total</span>
                  <span className="font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {(branch.monthlyMetrics.energyConsumption.total / 1000).toFixed(1)}k kWh
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Per Liter Sold</span>
                  <span className="font-medium">
                    {branch.monthlyMetrics.efficiency.energyPerLiter} kWh/L
                  </span>
                </div>
              </div>

              {/* Low Stock Alert */}
              {(branch.currentStock.petrol / branch.capacity.petrol < 0.3 || 
                branch.currentStock.diesel / branch.capacity.diesel < 0.3) && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-xs text-yellow-700 dark:text-yellow-300">
                    Low fuel stock - Refill recommended
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/branches/${branch.id}`}>
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/branches/${branch.id}/edit`}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table View Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Branches Table View</CardTitle>
          <CardDescription>
            Detailed table view of all branches with key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Energy Usage</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {branch.location.city}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(branch.status)}>
                      {branch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{branch.manager}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${(branch.monthlyMetrics.sales.totalRevenue / 1000).toFixed(0)}k
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{branch.monthlyMetrics.efficiency.rating}/5.0</span>
                      <Badge color={getEfficiencyColor(branch.monthlyMetrics.efficiency.rating)} className="text-xs">
                        {branch.monthlyMetrics.efficiency.rating >= 4.5 ? 'A+' :
                         branch.monthlyMetrics.efficiency.rating >= 4.0 ? 'A' :
                         branch.monthlyMetrics.efficiency.rating >= 3.5 ? 'B' : 'C'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {(branch.monthlyMetrics.energyConsumption.total / 1000).toFixed(1)}k kWh
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs">
                        Petrol: {((branch.currentStock.petrol / branch.capacity.petrol) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs">
                        Diesel: {((branch.currentStock.diesel / branch.capacity.diesel) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/branches/${branch.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/branches/${branch.id}/edit`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchesPage;