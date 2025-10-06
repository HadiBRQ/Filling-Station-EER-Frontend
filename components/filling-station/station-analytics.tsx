"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Users,
  Fuel,
  MapPin,
  Calendar,
  Target
} from "lucide-react";

import { BranchWithRelations } from "@/lib/type";

interface StationAnalyticsProps {
  stationId: string;
  stationName: string;
  branches: BranchWithRelations[];
}

export default function StationAnalytics({ stationId, stationName, branches }: StationAnalyticsProps) {
  // Calculate analytics data
  const totalTanks = branches.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0);
  const totalStaff = branches.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0);
  const totalCapacity = branches.reduce((acc: number, branch) => 
    acc + (branch.tanks?.reduce((tankAcc: number, tank) => tankAcc + tank.capacity_litres, 0) || 0), 0
  );
  const totalCurrentStock = branches.reduce((acc: number, branch) => 
    acc + (branch.tanks?.reduce((tankAcc: number, tank) => 
      tankAcc + (tank.latest_inventory?.current_stock_litres || 0), 0) || 0), 0
  );

  const stockUtilization = totalCapacity > 0 ? (totalCurrentStock / totalCapacity) * 100 : 0;
  const averageStaffPerBranch = branches.length > 0 ? totalStaff / branches.length : 0;
  const averageTanksPerBranch = branches.length > 0 ? totalTanks / branches.length : 0;

  // Product distribution
  const productStats = branches.reduce((acc: Record<string, { count: number; capacity: number; stock: number }>, branch) => {
    branch.tanks?.forEach((tank) => {
      const productName = tank.product.product_name;
      if (!acc[productName]) {
        acc[productName] = { count: 0, capacity: 0, stock: 0 };
      }
      acc[productName].count++;
      acc[productName].capacity += tank.capacity_litres;
      acc[productName].stock += tank.latest_inventory?.current_stock_litres || 0;
    });
    return acc;
  }, {} as Record<string, { count: number; capacity: number; stock: number }>);

  // Performance metrics (simulated)
  const performanceMetrics = {
    dailySales: 245000, // Litres per day
    monthlyRevenue: 1250000000, // Naira
    customerFootfall: 1250, // Daily average
    efficiency: 94.5, // Operational efficiency
    growthRate: 12.3, // Year over year
    staffProductivity: 89.2
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Sales</p>
                <p className="text-2xl font-bold text-green-600">
                  {performanceMetrics.dailySales.toLocaleString()}L
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+8.2% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₦{(performanceMetrics.monthlyRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-xs text-blue-600">+{performanceMetrics.growthRate}% YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Traffic</p>
                <p className="text-2xl font-bold text-purple-600">
                  {performanceMetrics.customerFootfall.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <Activity className="h-3 w-3 text-purple-500 mr-1" />
              <span className="text-xs text-purple-600">Daily average</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {performanceMetrics.efficiency}%
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-orange-500 mr-1" />
              <span className="text-xs text-orange-600">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stock Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-blue-600" />
              Stock Utilization Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Utilization</span>
                <span className="text-sm text-muted-foreground">{stockUtilization.toFixed(1)}%</span>
              </div>
              <Progress value={stockUtilization} className="h-3" />
              
              <div className="space-y-3">
                {Object.entries(productStats).map(([product, stats]) => {
                  const utilization = stats.capacity > 0 ? (stats.stock / stats.capacity) * 100 : 0;
                  return (
                    <div key={product} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{product}</span>
                        <span>{utilization.toFixed(1)}%</span>
                      </div>
                      <Progress value={utilization} className="h-1" />
                      <div className="text-xs text-muted-foreground">
                        {stats.stock.toLocaleString()}L / {stats.capacity.toLocaleString()}L ({stats.count} tanks)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Branch Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branches.map((branch, index) => {
                const branchCapacity = branch.tanks?.reduce((acc: number, tank) => acc + tank.capacity_litres, 0) || 0;
                const branchStock = branch.tanks?.reduce((acc: number, tank) => 
                  acc + (tank.latest_inventory?.current_stock_litres || 0), 0) || 0;
                const branchUtilization = branchCapacity > 0 ? (branchStock / branchCapacity) * 100 : 0;
                
                // Simulated performance score
                const performanceScore = 70 + (index * 8) + Math.random() * 20;
                
                return (
                  <div key={branch.branch_id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{branch.branch_name}</p>
                        <p className="text-xs text-muted-foreground">{branch.lga}</p>
                      </div>
                      <Badge 
                        color={performanceScore > 85 ? "success" : performanceScore > 70 ? "warning" : "destructive"}
                      >
                        {performanceScore.toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Stock Utilization</span>
                        <span>{branchUtilization.toFixed(1)}%</span>
                      </div>
                      <Progress value={branchUtilization} className="h-1" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{branch.tanks?.length || 0} tanks</span>
                        <span>{branch.staff?.length || 0} staff</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Operational Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Resource Allocation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Branches</span>
                  <span className="font-medium">{branches.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Staff/Branch</span>
                  <span className="font-medium">{averageStaffPerBranch.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Tanks/Branch</span>
                  <span className="font-medium">{averageTanksPerBranch.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Capacity</span>
                  <span className="font-medium">{totalCapacity.toLocaleString()}L</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Performance Indicators</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staff Productivity</span>
                    <span>{performanceMetrics.staffProductivity}%</span>
                  </div>
                  <Progress value={performanceMetrics.staffProductivity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Operational Efficiency</span>
                    <span>{performanceMetrics.efficiency}%</span>
                  </div>
                  <Progress value={performanceMetrics.efficiency} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stock Optimization</span>
                    <span>{stockUtilization.toFixed(1)}%</span>
                  </div>
                  <Progress value={stockUtilization} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Growth Metrics</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">YoY Growth: +{performanceMetrics.growthRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Customer Retention: 94.2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Target Achievement: 108%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Uptime: 99.7%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Optimize High-Performance Branches</p>
                <p className="text-xs text-muted-foreground">
                  Scale successful operations to underperforming locations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <Fuel className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Stock Rebalancing</p>
                <p className="text-xs text-muted-foreground">
                  Redistribute inventory based on demand patterns
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <Users className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Staff Development</p>
                <p className="text-xs text-muted-foreground">
                  Implement training programs for productivity gains
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Expand Analytics</p>
                <p className="text-xs text-muted-foreground">
                  Deploy real-time monitoring for better insights
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}