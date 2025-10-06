"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Fuel, 
  DollarSign,
  Leaf,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { 
  mockEnergyReport, 
  mockBranches, 
  energyConsumptionData, 
  revenueByBranchData, 
  efficiencyTrendData 
} from "@/lib/data/mock-eer-data";

// Simple chart components (you can replace with ApexCharts later)
const SimpleBarChart = ({ data, title }: { data: any; title: string }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium">{title}</h4>
    <div className="space-y-2">
      {data.datasets[0].data.map((value: number, index: number) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-xs text-muted-foreground">
            {data.labels[index]}
          </div>
          <div className="flex-1 bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(value / Math.max(...data.datasets[0].data)) * 100}%` }}
            />
          </div>
          <div className="w-16 text-xs font-medium text-right">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SimpleLineChart = ({ data, title }: { data: any; title: string }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium">{title}</h4>
    <div className="h-32 flex items-end justify-between gap-2">
      {data.datasets[0].data.map((value: number, index: number) => (
        <div key={index} className="flex flex-col items-center gap-2 flex-1">
          <div 
            className="w-full bg-primary rounded-t-sm transition-all duration-500"
            style={{ 
              height: `${(value / Math.max(...data.datasets[0].data)) * 100}%`,
              minHeight: '4px'
            }}
          />
          <div className="text-xs text-muted-foreground">
            {data.labels[index]}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedBranch, setSelectedBranch] = useState("all");
  
  const report = useMemo(() => mockEnergyReport, []);
  const branches = useMemo(() => mockBranches, []);

  // Calculate some summary metrics with memoization
  const totalRevenue = useMemo(() => 
    branches.reduce((acc, branch) => acc + branch.monthlyMetrics.sales.totalRevenue, 0), 
    [branches]
  );
  
  const totalEnergyConsumption = useMemo(() => 
    branches.reduce((acc, branch) => acc + branch.monthlyMetrics.energyConsumption.total, 0), 
    [branches]
  );
  
  const averageEfficiency = useMemo(() => 
    branches.reduce((acc, branch) => acc + branch.monthlyMetrics.efficiency.rating, 0) / branches.length, 
    [branches]
  );
  
  const totalCarbonFootprint = useMemo(() => 
    branches.reduce((acc, branch) => acc + branch.monthlyMetrics.environmental.carbonFootprint, 0), 
    [branches]
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Energy Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive energy consumption and efficiency analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Time Range and Branch Selection */}
      <div className="flex gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Branch</label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy Usage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalEnergyConsumption / 1000).toFixed(0)}k kWh
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              -5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{report.cost.electricity.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDown className="h-3 w-3 text-green-500" />
              Saved ₦{report.savings.total} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {report.efficiency.overall}%
              <Badge color="success">Excellent</Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              +2.3% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalCarbonFootprint / 1000).toFixed(1)}t CO₂
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDown className="h-3 w-3 text-green-500" />
              -8.1% reduced emissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="consumption" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consumption">Energy Consumption</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
        </TabsList>

        {/* Energy Consumption Tab */}
        <TabsContent value="consumption" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption Trend</CardTitle>
                <CardDescription>
                  Monthly energy usage across all branches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleLineChart 
                  data={energyConsumptionData} 
                  title="Energy Usage (kWh)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consumption Breakdown</CardTitle>
                <CardDescription>
                  Energy usage by category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fuel Pumps</span>
                    <span className="font-medium">{report.consumption.electricity.pumps.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Air Conditioning</span>
                    <span className="font-medium">{report.consumption.electricity.airConditioning.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EV Charging</span>
                    <span className="font-medium">{report.consumption.electricity.charging.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lighting</span>
                    <span className="font-medium">{report.consumption.electricity.lighting.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other</span>
                    <span className="font-medium">{report.consumption.electricity.other.toLocaleString()} kWh</span>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>{report.consumption.electricity.total.toLocaleString()} kWh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Branch Comparison</CardTitle>
              <CardDescription>
                Energy consumption by branch location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">{branch.location.city}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {(branch.monthlyMetrics.energyConsumption.total / 1000).toFixed(1)}k kWh
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {branch.monthlyMetrics.efficiency.energyPerLiter} kWh/L
                      </div>
                    </div>
                    <Badge 
                      color={
                        branch.monthlyMetrics.efficiency.rating >= 4.5 ? 'success' :
                        branch.monthlyMetrics.efficiency.rating >= 4.0 ? 'info' :
                        branch.monthlyMetrics.efficiency.rating >= 3.5 ? 'warning' : 'destructive'
                      }
                    >
                      {branch.monthlyMetrics.efficiency.rating}/5.0
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Efficiency Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trend</CardTitle>
                <CardDescription>
                  Overall energy efficiency over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleLineChart 
                  data={efficiencyTrendData} 
                  title="Efficiency Rating (%)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency by Category</CardTitle>
                <CardDescription>
                  Performance metrics by operational area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EV Charging</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${report.efficiency.byCategory.charging}%` }}
                        />
                      </div>
                      <span className="font-medium">{report.efficiency.byCategory.charging}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fuel Pumping</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${report.efficiency.byCategory.pumping}%` }}
                        />
                      </div>
                      <span className="font-medium">{report.efficiency.byCategory.pumping}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lighting</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${report.efficiency.byCategory.lighting}%` }}
                        />
                      </div>
                      <span className="font-medium">{report.efficiency.byCategory.lighting}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Climate Control</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${report.efficiency.byCategory.comfort}%` }}
                        />
                      </div>
                      <span className="font-medium">{report.efficiency.byCategory.comfort}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Analysis Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Branch</CardTitle>
                <CardDescription>
                  Monthly revenue comparison across branches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleBarChart 
                  data={revenueByBranchData} 
                  title="Monthly Revenue (₦)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Energy Efficiency</CardTitle>
                <CardDescription>
                  Correlation between efficiency and profitability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Efficiency: {branch.monthlyMetrics.efficiency.rating}/5.0
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ₦{(branch.monthlyMetrics.sales.totalRevenue / 1000).toFixed(0)}k
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₦{branch.monthlyMetrics.efficiency.revenuePerKwh}/kWh
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Environmental Tab */}
        <TabsContent value="environmental" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint</CardTitle>
                <CardDescription>
                  CO₂ emissions by branch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Renewable: {branch.monthlyMetrics.environmental.renewableEnergyUsage}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {(branch.monthlyMetrics.environmental.carbonFootprint / 1000).toFixed(1)}t CO₂
                      </div>
                      <Badge 
                        color={
                          branch.monthlyMetrics.environmental.wasteReduction >= 15 ? 'success' :
                          branch.monthlyMetrics.environmental.wasteReduction >= 10 ? 'info' : 'warning'
                        }
                      >
                        -{branch.monthlyMetrics.environmental.wasteReduction}% waste
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renewable Energy</CardTitle>
                <CardDescription>
                  Solar and wind energy generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Solar Generation</span>
                    <span className="font-medium">{report.generation.solar.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wind Generation</span>
                    <span className="font-medium">{report.generation.wind.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Grid Consumption</span>
                    <span className="font-medium">{(report.consumption.electricity.total - report.generation.total).toLocaleString()} kWh</span>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center font-medium">
                    <span>Renewable Percentage</span>
                    <span>{((report.generation.total / report.consumption.electricity.total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;