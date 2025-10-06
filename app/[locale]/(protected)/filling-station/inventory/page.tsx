"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Fuel, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Search,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { 
  getMainCompanyData, 
  tanks, 
  products,
  getTankWithProduct,
  tankInventories 
} from "@/lib/filling-station-data";
import InventoryUpdateForm from "@/components/filling-station/inventory-update-form";
import { useState } from "react";

export default function InventoryManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const companyData = getMainCompanyData();
  
  // Get all tanks with their current inventory
  const allTanks = tanks.map(tank => getTankWithProduct(tank.tank_id)!);
  
  // Filter tanks based on search and filters
  const filteredTanks = allTanks.filter(tank => {
    const matchesSearch = tank.tank_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tank.product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProduct = filterProduct === "all" || tank.product_id === filterProduct;
    
    const stockPercentage = tank.latest_inventory 
      ? (tank.latest_inventory.current_stock_litres / tank.capacity_litres) * 100
      : 0;
    
    let matchesStatus = true;
    if (filterStatus === "low") matchesStatus = stockPercentage < 20;
    else if (filterStatus === "medium") matchesStatus = stockPercentage >= 20 && stockPercentage < 50;
    else if (filterStatus === "high") matchesStatus = stockPercentage >= 50;
    
    return matchesSearch && matchesProduct && matchesStatus;
  });

  const calculateStockPercentage = (currentStock: number, capacity: number): number => {
    return (currentStock / capacity) * 100;
  };

  const getStockStatus = (percentage: number): { status: string; variant: any; color: string } => {
    if (percentage < 20) return { status: "Low Stock", variant: "destructive", color: "text-red-600" };
    if (percentage < 50) return { status: "Medium Stock", variant: "warning", color: "text-yellow-600" };
    return { status: "Good Stock", variant: "secondary", color: "text-green-600" };
  };

  // Calculate statistics
  const totalCapacity = allTanks.reduce((acc, tank) => acc + tank.capacity_litres, 0);
  const totalCurrentStock = allTanks.reduce((acc, tank) => 
    acc + (tank.latest_inventory?.current_stock_litres || 0), 0
  );
  const averageStockLevel = totalCapacity > 0 ? (totalCurrentStock / totalCapacity) * 100 : 0;
  const lowStockTanks = allTanks.filter(tank => {
    const percentage = tank.latest_inventory 
      ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
      : 0;
    return percentage < 20;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage fuel inventory across all locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Record Reading
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">
              Across {allTanks.length} tanks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCurrentStock.toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">
              {averageStockLevel.toFixed(1)}% average level
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lowStockTanks.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {lowStockTanks.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Tanks need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Space</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalCapacity - totalCurrentStock).toLocaleString()}L</div>
            <p className="text-xs text-muted-foreground">
              For new deliveries
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
                placeholder="Search tanks by name or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterProduct}
                onChange={(e) => setFilterProduct(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Products</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="low">Low Stock (&lt;20%)</option>
                <option value="medium">Medium Stock (20-50%)</option>
                <option value="high">Good Stock (&gt;50%)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tanks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTanks.map((tank) => {
          const stockPercentage = tank.latest_inventory 
            ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres)
            : 0;
          const stockStatus = getStockStatus(stockPercentage);
          
          return (
            <Card key={tank.tank_id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{tank.tank_name || `Tank ${tank.tank_id}`}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tank.product.product_name}</p>
                  </div>
                  <Badge color={stockStatus.variant as any} className={stockStatus.color}>
                    {stockStatus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stock Level */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Stock Level</span>
                      <span className="text-sm font-bold">{stockPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={stockPercentage} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {tank.latest_inventory?.current_stock_litres.toLocaleString() || 0}L / {tank.capacity_litres.toLocaleString()}L
                    </p>
                  </div>

                  {/* Last Reading */}
                  {tank.latest_inventory && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Last Reading</span>
                      </div>
                      <p className="text-sm">
                        {tank.latest_inventory.measured_at.toLocaleDateString()} at{' '}
                        {tank.latest_inventory.measured_at.toLocaleTimeString()}
                      </p>
                      {tank.latest_inventory.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {tank.latest_inventory.notes}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View History
                    </Button>
                    <InventoryUpdateForm 
                      tank={tank}
                      onUpdate={(tankId, newReading, notes) => {
                        console.log(`Updated tank ${tankId} with reading ${newReading}L`, notes);
                        // In a real app, this would update the data source
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTanks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Fuel className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No tanks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterProduct !== "all" || filterStatus !== "all" 
                ? "No tanks match your current filters." 
                : "No tanks are available for inventory management."
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterProduct("all");
                setFilterStatus("all");
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alert Summary */}
      {lowStockTanks.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertTriangle className="h-5 w-5" />
              Immediate Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              {lowStockTanks.length} tank{lowStockTanks.length !== 1 ? 's' : ''} 
              {lowStockTanks.length === 1 ? ' is' : ' are'} running low on fuel and need immediate restocking.
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {lowStockTanks.slice(0, 4).map((tank) => (
                <div key={tank.tank_id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded">
                  <span className="text-sm font-medium">
                    {tank.tank_name || `Tank ${tank.tank_id}`} - {tank.product.product_name}
                  </span>
                  <Badge color="destructive" className="text-xs">
                    {tank.latest_inventory 
                      ? calculateStockPercentage(tank.latest_inventory.current_stock_litres, tank.capacity_litres).toFixed(1)
                      : '0'
                    }%
                  </Badge>
                </div>
              ))}
            </div>
            {lowStockTanks.length > 4 && (
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                +{lowStockTanks.length - 4} more tanks need attention
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}