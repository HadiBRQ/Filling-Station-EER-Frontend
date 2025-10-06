"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Fuel, 
  Phone, 
  Mail,
  Crown,
  Building2,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { 
  branches, 
  getBranchWithRelations,
  stations 
} from "@/lib/filling-station-data";
import { useState } from "react";
import Link from "next/link";

export default function BranchManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStation, setFilterStation] = useState("all");
  const [filterLGA, setFilterLGA] = useState("all");

  // Get all branches with their relations
  const allBranches = branches.map(branch => getBranchWithRelations(branch.branch_id)!);
  
  // Filter branches based on search and filters
  const filteredBranches = allBranches.filter(branch => {
    const matchesSearch = branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.physical_address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStation = filterStation === "all" || branch.station_id === filterStation;
    const matchesLGA = filterLGA === "all" || branch.lga === filterLGA;
    
    return matchesSearch && matchesStation && matchesLGA;
  });

  const calculateStockPercentage = (currentStock: number, capacity: number): number => {
    return (currentStock / capacity) * 100;
  };

  // Get unique LGAs for filter
  const uniqueLGAs = Array.from(new Set(branches.map(branch => branch.lga)));

  // Calculate statistics
  const totalBranches = branches.length;
  const totalStaff = allBranches.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0);
  const totalTanks = allBranches.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0);
  const branchesWithManagers = allBranches.filter(branch => branch.manager).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
          <p className="text-muted-foreground">
            Manage all branch locations and operations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Branch
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBranches}</div>
            <p className="text-xs text-muted-foreground">
              Across all stations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Managers</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{branchesWithManagers}</div>
            <p className="text-xs text-muted-foreground">
              {((branchesWithManagers / totalBranches) * 100).toFixed(0)}% coverage
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
              {(totalStaff / totalBranches).toFixed(1)} avg per branch
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
              {(totalTanks / totalBranches).toFixed(1)} avg per branch
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search branches by name, LGA, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStation}
                onChange={(e) => setFilterStation(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Stations</option>
                {stations.map((station) => (
                  <option key={station.station_id} value={station.station_id}>
                    {station.station_name}
                  </option>
                ))}
              </select>
              <select
                value={filterLGA}
                onChange={(e) => setFilterLGA(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All LGAs</option>
                {uniqueLGAs.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branches Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredBranches.map((branch) => {
          const station = stations.find(s => s.station_id === branch.station_id);
          const lowStockTanks = branch.tanks?.filter(tank => {
            const stockPercentage = tank.latest_inventory 
              ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
              : 0;
            return stockPercentage < 20;
          }) || [];
          
          return (
            <Card key={branch.branch_id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{branch.branch_name}</CardTitle>
                    <p className="text-muted-foreground">{station?.station_name}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge color="default">{branch.lga}</Badge>
                      {lowStockTanks.length > 0 && (
                        <Badge color="destructive" className="text-xs">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {lowStockTanks.length} Low Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Address */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{branch.physical_address}</p>
                  </div>

                  {/* Manager Info */}
                  {branch.manager ? (
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Branch Manager</span>
                      </div>
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
                  ) : (
                    <div className="p-3 border-2 border-dashed border-muted rounded-lg text-center">
                      <Crown className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">No manager assigned</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Assign Manager
                      </Button>
                    </div>
                  )}

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <Fuel className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                      <p className="text-sm font-bold">{branch.tanks?.length || 0}</p>
                      <p className="text-xs text-muted-foreground">Tanks</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                      <Users className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-sm font-bold">{branch.staff?.length || 0}</p>
                      <p className="text-xs text-muted-foreground">Staff</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 dark:bg-purple-950 rounded">
                      <Calendar className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                      <p className="text-sm font-bold">
                        {new Date().getFullYear() - branch.created_at.getFullYear()}y
                      </p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                  </div>

                  {/* Tank Status Overview */}
                  {branch.tanks && branch.tanks.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tank Status</h4>
                      <div className="space-y-2">
                        {branch.tanks.slice(0, 3).map((tank) => {
                          const stockPercentage = tank.latest_inventory 
                            ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
                            : 0;
                          
                          return (
                            <div key={tank.tank_id} className="flex items-center gap-2 text-xs">
                              <span className="w-20 truncate">{tank.product.product_name}</span>
                              <Progress value={stockPercentage} className="flex-1 h-2" />
                              <span className="w-12 text-right">{stockPercentage.toFixed(0)}%</span>
                            </div>
                          );
                        })}
                        {branch.tanks.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{branch.tanks.length - 3} more tanks
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/dashboard-filling-station/branches/${branch.branch_id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/dashboard-filling-station/branches/${branch.branch_id}/inventory`} className="flex-1">
                      <Button className="w-full">
                        Manage Inventory
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBranches.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No branches found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStation !== "all" || filterLGA !== "all" 
                ? "No branches match your current filters." 
                : "No branches are registered yet."
              }
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterStation("all");
                  setFilterLGA("all");
                }}
              >
                Clear Filters
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Branch
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary by Station */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Distribution by Station</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stations.map((station) => {
              const stationBranches = allBranches.filter(branch => branch.station_id === station.station_id);
              const stationStaff = stationBranches.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0);
              const stationTanks = stationBranches.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0);
              
              return (
                <div key={station.station_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{station.station_name}</p>
                    <p className="text-sm text-muted-foreground">{station.station_code}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                      <span>{stationStaff} staff</span>
                      <span>{stationTanks} tanks</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge color="secondary" className="text-lg px-3 py-1">
                      {stationBranches.length}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      branch{stationBranches.length !== 1 ? 'es' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}