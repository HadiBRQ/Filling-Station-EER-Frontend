"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Users, 
  Fuel, 
  AlertTriangle, 
  TrendingUp,
  BarChart3,
  Shield,
  Phone,
  Mail,
  Globe,
  Award
} from "lucide-react";
import { 
  getMainCompanyData, 
  getTotalTanks, 
  getTotalBranches, 
  getTotalStaff, 
  getLowStockTanks 
} from "@/lib/filling-station-data";
import InventoryManagementDialog from "@/components/filling-station/inventory-management-dialog";
import QuickActionsDialog from "@/components/filling-station/quick-actions-dialog";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function MacrooilDashboard() {
  const [companyData, setCompanyData] = useState(getMainCompanyData());
  const totalTanks = getTotalTanks();
  const totalBranches = getTotalBranches();
  const totalStaff = getTotalStaff();
  const [lowStockTanks, setLowStockTanks] = useState(getLowStockTanks());

  // Get all tanks for inventory management
  const allTanks = companyData.stations?.flatMap(station => 
    station.branches?.flatMap(branch => branch.tanks || []) || []
  ) || [];

  const handleInventoryUpdate = (tankId: string, newStock: number, transactionType: 'inbound' | 'outbound', quantity: number) => {
    // Update the company data with new stock levels
    const updatedCompanyData = { ...companyData };
    
    if (updatedCompanyData.stations) {
      updatedCompanyData.stations = updatedCompanyData.stations.map(station => ({
        ...station,
        branches: station.branches?.map(branch => ({
          ...branch,
          tanks: branch.tanks?.map(tank => 
            tank.tank_id === tankId 
              ? {
                  ...tank,
                  latest_inventory: tank.latest_inventory ? {
                    ...tank.latest_inventory,
                    current_stock_litres: newStock,
                  } : {
                    inventory_id: `INV-${Date.now()}`,
                    tank_id: tankId,
                    current_stock_litres: newStock,
                    measured_at: new Date(),
                    last_updated: new Date(),
                    recorded_by: 'System',
                    notes: `${transactionType} transaction of ${quantity}L`,
                  }
                }
              : tank
          )
        }))
      }));
    }
    
    setCompanyData(updatedCompanyData);

    // Update low stock tanks
    setLowStockTanks(getLowStockTanks());
  };

  const calculateStockPercentage = (currentStock: number, capacity: number): number => {
    return (currentStock / capacity) * 100;
  };

  const totalCapacity = companyData.stations?.reduce((stationAcc, station) => 
    stationAcc + (station.branches?.reduce((branchAcc, branch) => 
      branchAcc + (branch.tanks?.reduce((tankAcc, tank) => tankAcc + tank.capacity_litres, 0) || 0), 0) || 0), 0) || 0;

  const totalCurrentStock = companyData.stations?.reduce((stationAcc, station) => 
    stationAcc + (station.branches?.reduce((branchAcc, branch) => 
      branchAcc + (branch.tanks?.reduce((tankAcc, tank) => 
        tankAcc + (tank.latest_inventory?.current_stock_litres || 0), 0) || 0), 0) || 0), 0) || 0;

  const averageStockLevel = totalCapacity > 0 ? (totalCurrentStock / totalCapacity) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Company Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Fuel className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{companyData.company_name}</h1>
                  <p className="text-blue-100">
                    Nigeria&apos;s Premier Fuel Retail Network • Est. 2018
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge color="default" className="bg-white/20 text-white border-white/30">
                  <Building2 className="mr-1 h-3 w-3" />
                  1 Station
                </Badge>
                <Badge color="default" className="bg-white/20 text-white border-white/30">
                  <MapPin className="mr-1 h-3 w-3" />
                  {totalBranches} Branches
                </Badge>
                <Badge color="default" className="bg-white/20 text-white border-white/30">
                  <Award className="mr-1 h-3 w-3" />
                  ISO Certified
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="text-2xl font-bold">{averageStockLevel.toFixed(1)}%</span>
                <p className="text-blue-100 text-sm">Average Stock Level</p>
              </div>
              <div className="space-y-1 text-xs text-blue-100">
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>www.macrooil.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>+234-1-234-5678</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>info@macrooil.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Single Station</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="text-xs text-muted-foreground">
              Unified operations nationwide
            </p>
            <div className="mt-2">
              <Progress value={100} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalBranches}</div>
            <p className="text-xs text-muted-foreground">
              Serving customers nationwide
            </p>
            <div className="mt-2">
              <Progress value={95} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              Professional team members
            </p>
            <div className="mt-2">
              <Progress value={92} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Capacity</CardTitle>
            <Fuel className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalTanks}</div>
            <p className="text-xs text-muted-foreground">
              High-capacity storage tanks
            </p>
            <div className="mt-2">
              <Progress value={averageStockLevel} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Operational Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Fuel Capacity</span>
                    <span className="text-sm text-muted-foreground">{totalCapacity.toLocaleString()}L</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Stock Level</span>
                    <span className="text-sm text-muted-foreground">{totalCurrentStock.toLocaleString()}L</span>
                  </div>
                  <Progress value={averageStockLevel} className="h-2" />
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-3">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">Lagos</div>
                  <div className="text-sm text-muted-foreground">3 Branches</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-lg font-bold text-green-600">Abuja</div>
                  <div className="text-sm text-muted-foreground">2 Branches</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Others</div>
                  <div className="text-sm text-muted-foreground">2 Branches</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card className={`${lowStockTanks.length > 0 ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950' : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${lowStockTanks.length > 0 ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
              {lowStockTanks.length > 0 ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
              {lowStockTanks.length > 0 ? 'Critical Alerts' : 'All Systems Normal'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockTanks.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  {lowStockTanks.length} tank{lowStockTanks.length !== 1 ? 's' : ''} require immediate attention
                </p>
                <div className="space-y-2">
                  {lowStockTanks.slice(0, 3).map((tank) => {
                    const stockPercentage = tank.latest_inventory 
                      ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
                      : 0;
                    
                    return (
                      <div key={tank.tank_id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="text-sm">
                          <div className="font-medium">{tank.tank_name}</div>
                          <div className="text-xs text-muted-foreground">{tank.product.product_name}</div>
                        </div>
                        <Badge color="destructive" className="text-xs">
                          {stockPercentage.toFixed(1)}%
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <InventoryManagementDialog 
                  tanks={allTanks}
                  onUpdateInventory={handleInventoryUpdate}
                />
              </div>
            ) : (
              <div className="text-center py-4">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  All tanks are adequately stocked
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No immediate action required
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Network Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Branch Network</CardTitle>
            <Link href="/filling-station/branches">
              <Button variant="outline" size="sm">
                View All Branches
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companyData.stations?.[0]?.branches?.map((branch) => (
              <Card key={branch.branch_id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{branch.branch_name}</CardTitle>
                    <Badge color="secondary">{branch.lga}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      {branch.physical_address}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tanks</span>
                      <span className="font-medium">{branch.tanks?.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Staff</span>
                      <span className="font-medium">{branch.staff?.length}</span>
                    </div>
                    
                    {branch.manager && (
                      <div className="text-xs text-muted-foreground">
                        Manager: {branch.manager.full_name}
                      </div>
                    )}
                    
                    <Link href={`/filling-station/branches/${branch.branch_id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <TrendingUp className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuickActionsDialog action="inventory">
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200">
                  <Fuel className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Inventory Management</p>
                  <p className="text-sm text-muted-foreground">Monitor tank levels</p>
                </div>
              </div>
            </QuickActionsDialog>
            
            <QuickActionsDialog action="staff">
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Staff Management</p>
                  <p className="text-sm text-muted-foreground">Manage team members</p>
                </div>
              </div>
            </QuickActionsDialog>
            
            <QuickActionsDialog action="branches">
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Branch Operations</p>
                  <p className="text-sm text-muted-foreground">Manage locations</p>
                </div>
              </div>
            </QuickActionsDialog>
            
            <QuickActionsDialog action="stations">
              <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-200">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Network Overview</p>
                  <p className="text-sm text-muted-foreground">View station details</p>
                </div>
              </div>
            </QuickActionsDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}