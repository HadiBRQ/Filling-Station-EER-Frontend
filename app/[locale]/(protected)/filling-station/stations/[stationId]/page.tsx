"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  MapPin, 
  Users, 
  Fuel, 
  Phone, 
  Mail, 
  Edit, 
  Plus,
  ArrowLeft,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { getStationWithBranches } from "@/lib/filling-station-data";
import StationAnalytics from "@/components/filling-station/station-analytics";
import AddBranchDialog from "@/components/filling-station/add-branch-dialog";
import EditStationDialog from "@/components/filling-station/edit-station-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function StationDetailPage() {
  const params = useParams();
  const stationId = params.stationId as string;
  
  const [stationData, setStationData] = useState(getStationWithBranches(stationId));

  if (!stationData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Station Not Found</h1>
        <p className="text-muted-foreground mb-4">The requested station could not be found.</p>
        <Link href="/filling-station/stations">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stations
          </Button>
        </Link>
      </div>
    );
  }

  const station = stationData;

  const handleEditStation = (stationId: string, updatedData: { station_name: string; station_code: string }) => {
    setStationData(prev => prev ? { ...prev, ...updatedData, updated_at: new Date() } : prev);
  };

  const handleAddBranch = (branchData: {
    branch_name: string;
    physical_address: string;
    lga: string;
    state: string;
  }) => {
    const newBranch = {
      branch_id: `BR-${Date.now()}`,
      ...branchData,
      station_id: stationId,
      created_at: new Date(),
      updated_at: new Date(),
      tanks: [],
      staff: [],
      manager: undefined,
    };

    setStationData(prev => prev ? {
      ...prev,
      branches: [...(prev.branches || []), newBranch]
    } : prev);

    toast.success(`Branch "${branchData.branch_name}" has been added successfully!`);
  };

  const calculateStockPercentage = (currentStock: number, capacity: number): number => {
    return (currentStock / capacity) * 100;
  };

  const totalTanks = station.branches?.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0) || 0;
  const totalStaff = station.branches?.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0) || 0;
  const lowStockTanks = station.branches?.reduce((acc, branch) => {
    const branchLowStock = branch.tanks?.filter(tank => {
      const stockPercentage = tank.latest_inventory 
        ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
        : 0;
      return stockPercentage < 20;
    }) || [];
    return acc + branchLowStock.length;
  }, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/filling-station/stations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{station.station_name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge color="default">{station.station_code}</Badge>
              <Badge color="secondary">
                {station.branches?.length} Branch{(station.branches?.length || 0) !== 1 ? 'es' : ''}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <EditStationDialog 
            station={station} 
            onEditStation={handleEditStation}
          />
          <AddBranchDialog 
            stationId={station.station_id}
            onAddBranch={handleAddBranch}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branches</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{station.branches?.length}</div>
            <p className="text-xs text-muted-foreground">
              Physical locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Tanks</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTanks}</div>
            <p className="text-xs text-muted-foreground">
              Across all branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              All branches combined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lowStockTanks > 0 ? 'text-orange-600' : 'text-green-600'}`}>
              {lowStockTanks}
            </div>
            <p className="text-xs text-muted-foreground">
              Tanks need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Station Info */}
      <Card>
        <CardHeader>
          <CardTitle>Station Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Station Name</p>
              <p className="text-lg">{station.station_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Station Code</p>
              <p className="text-lg">{station.station_code}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created Date</p>
              <p className="text-lg">{station.created_at.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-lg">{station.updated_at.toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Station Analytics */}
      <StationAnalytics 
        stationId={station.station_id}
        stationName={station.station_name}
        branches={station.branches || []}
      />

      {/* Branches */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Branches</h2>
          <AddBranchDialog 
            stationId={station.station_id}
            onAddBranch={handleAddBranch}
          />
        </div>

        {station.branches?.map((branch) => (
          <Card key={branch.branch_id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{branch.branch_name}</CardTitle>
                  <p className="text-muted-foreground">{branch.physical_address}</p>
                  <Badge color="default" className="mt-1">{branch.lga}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Branch Manager */}
                {branch.manager && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Branch Manager</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{branch.manager.full_name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {branch.manager.phone_number}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {branch.manager.email}
                          </span>
                        </div>
                      </div>
                      <Badge>{branch.manager.role}</Badge>
                    </div>
                  </div>
                )}

                {/* Branch Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <Fuel className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-lg font-bold">{branch.tanks?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Storage Tanks</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-lg font-bold">{branch.staff?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Staff Members</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-lg font-bold">Active</p>
                    <p className="text-sm text-muted-foreground">Branch Status</p>
                  </div>
                </div>

                {/* Tank Overview */}
                {branch.tanks && branch.tanks.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Tank Overview</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      {branch.tanks.map((tank) => {
                        const stockPercentage = tank.latest_inventory 
                          ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
                          : 0;
                        
                        return (
                          <div key={tank.tank_id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{tank.tank_name || `Tank ${tank.tank_id}`}</p>
                                <p className="text-sm text-muted-foreground">{tank.product.product_name}</p>
                              </div>
                              <Badge color={stockPercentage < 20 ? "destructive" : stockPercentage < 50 ? "warning" : "secondary"}>
                                {stockPercentage.toFixed(1)}%
                              </Badge>
                            </div>
                            <Progress value={stockPercentage} className="mb-2" />
                            <p className="text-xs text-muted-foreground">
                              {tank.latest_inventory?.current_stock_litres.toLocaleString() || 0}L / {tank.capacity_litres.toLocaleString()}L
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/filling-station/branches/${branch.branch_id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Branch Details
                    </Button>
                  </Link>
                  <Link href={`/filling-station/branches/${branch.branch_id}/inventory`} className="flex-1">
                    <Button className="w-full">
                      Manage Inventory
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!station.branches || station.branches.length === 0) && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No branches found</h3>
            <p className="text-muted-foreground mb-4">
              This station doesn&apos;t have any branches yet. Add your first branch to get started.
            </p>
            <AddBranchDialog 
              stationId={station.station_id}
              onAddBranch={handleAddBranch}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}