import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Fuel, 
  MapPin, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  Building2,
  DollarSign,
  BarChart3,
  Users,
  Calendar,
  Plus
} from "lucide-react";
import { mockDashboardStats, mockFillingStation, mockBranches } from "@/lib/data/mock-eer-data";

export default function DashboardPage() {
  const stats = React.useMemo(() => mockDashboardStats, []);
  const station = React.useMemo(() => mockFillingStation, []);
  const branches = React.useMemo(() => mockBranches, []);
  const activeBranches = React.useMemo(() => branches.filter(branch => branch.status === 'active'), [branches]);
  const maintenanceBranches = React.useMemo(() => branches.filter(branch => branch.status === 'maintenance'), [branches]);

  const getBadgeColor = React.useMemo(() => (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      default: return 'destructive';
    }
  }, []);

  const getAlertColor = React.useMemo(() => (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <Fuel className="h-10 w-10 text-primary" />
              {station.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Enterprise Energy Resource Dashboard - Managing {stats.totalBranches} filling stations
            </p>
            <div className="flex items-center gap-4 mt-3">
              <Badge color="success" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {station.location.city}, {station.location.state}
              </Badge>
              <Badge color="info">
                Rating: {station.energyEfficiencyRating}
              </Badge>
              <Badge color="secondary">
                Since {new Date(station.establishedDate).getFullYear()}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/branches/add">
                <Plus className="h-4 w-4 mr-2" />
                Add Branch
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{(stats.totalRevenue / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +{stats.monthlyGrowth.revenue}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activeBranches}/{stats.totalBranches}
            </div>
            <Progress value={(stats.activeBranches / stats.totalBranches) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalBranches - stats.activeBranches} under maintenance
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Consumption</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.totalEnergyConsumption / 1000).toFixed(0)}k kWh
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +{stats.monthlyGrowth.efficiency}% efficiency improved
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rating</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {stats.averageEfficiencyRating}/5.0
              <Badge color="success" className="text-xs">Excellent</Badge>
            </div>
            <Progress value={stats.averageEfficiencyRating * 20} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Latest system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.severity)}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  {alert.branchName && (
                    <Badge color="secondary" className="text-xs">
                      {alert.branchName}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today&apos;s Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fuel Sold</span>
                <span className="font-medium">{(stats.totalFuelSold / 1000).toFixed(0)}k L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Visits</span>
                <span className="font-medium">2,350</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Transaction</span>
                <span className="font-medium">₦15,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Peak Hours</span>
                <span className="font-medium">7-9 AM</span>
              </div>
            </div>
            <Button size="sm" className="w-full" asChild>
              <Link href="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Branch Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Branch Status Overview
              </CardTitle>
              <CardDescription>
                Real-time status of all filling station branches
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/branches">
                View All Branches
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch) => (
              <Card key={branch.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{branch.name}</CardTitle>
                    <Badge color={getBadgeColor(branch.status)}>
                      {branch.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {branch.location.city}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">
                      ₦{(branch.monthlyMetrics.sales.totalRevenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span className="font-medium">
                      {branch.monthlyMetrics.efficiency.rating}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Manager</span>
                    <span className="font-medium">{branch.manager}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
