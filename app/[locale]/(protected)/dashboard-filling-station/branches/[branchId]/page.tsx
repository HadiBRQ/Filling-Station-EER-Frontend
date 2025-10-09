"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Droplet,
  Users,
  Package,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { branches, staff, tankInventories } from "@/lib/filling-station-data";

export default function BranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = params?.branchId as string;

  // Find the branch in mock data
  const branch = useMemo(() => {
    return branches.find((b: any) => b.branch_id === branchId);
  }, [branchId]);

  // Calculate branch statistics
  const branchStats = useMemo(() => {
    if (!branch) return null;

    const branchStaff = staff.filter(
      (s: any) => s.branch_id === branchId
    );
    const branchInventory = tankInventories.filter(
      (i: any) => {
        // Find the tank for this inventory
        return i.branch_id === branchId;
      }
    );

    // Since we don't have transactions, we'll calculate based on inventory
    const totalVolume = branchInventory.reduce(
      (sum: number, i: any) => sum + (i.current_quantity || 0),
      0
    );
    const totalCapacity = branchInventory.reduce(
      (sum: number, i: any) => sum + (i.max_capacity || 0),
      0
    );

    // Estimate revenue based on inventory (placeholder calculation)
    const estimatedRevenue = totalVolume * 650; // Average price per liter

    return {
      totalStaff: branchStaff.length,
      totalInventoryItems: branchInventory.length,
      totalTransactions: 0, // Not available in current data
      totalRevenue: estimatedRevenue,
      totalVolume,
      totalCapacity,
      averageTransactionValue: 0, // Not available
    };
  }, [branch, branchId]);

  if (!branch) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h3 className="text-lg font-medium mb-2">Branch Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The branch with ID "{branchId}" could not be found.
            </p>
            <Link href="/dashboard-filling-station/branches">
              <Button>View All Branches</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{branch.branch_name}</h1>
            <p className="text-muted-foreground">Branch Details & Overview</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard-filling-station/branches/${branchId}/inventory`}>
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Manage Inventory
            </Button>
          </Link>
        </div>
      </div>

      {/* Branch Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Branch Information</span>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {branch.physical_address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {branch.lga}
                </p>
              </div>
            </div>

            {/* Manager */}
            {branch.manager_id && (
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Branch Manager</p>
                  <p className="text-sm text-muted-foreground">
                    Manager ID: {branch.manager_id}
                  </p>
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Established</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(branch.created_at).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Operating Hours - Placeholder */}
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Operating Hours</p>
                <p className="text-sm text-muted-foreground">
                  24/7 Operations
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      {branchStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Revenue */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">
                    ₦{branchStats.totalRevenue.toLocaleString("en-NG")}
                  </h3>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Volume */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume Sold</p>
                  <h3 className="text-2xl font-bold">
                    {branchStats.totalVolume.toLocaleString("en-NG")} L
                  </h3>
                </div>
                <Droplet className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Transactions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Transactions
                  </p>
                  <h3 className="text-2xl font-bold">
                    {branchStats.totalTransactions.toLocaleString("en-NG")}
                  </h3>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          {/* Total Staff */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Staff</p>
                  <h3 className="text-2xl font-bold">
                    {branchStats.totalStaff}
                  </h3>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          {/* Inventory Items */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Inventory Items
                  </p>
                  <h3 className="text-2xl font-bold">
                    {branchStats.totalInventoryItems}
                  </h3>
                </div>
                <Package className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          {/* Average Transaction */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg Transaction
                  </p>
                  <h3 className="text-2xl font-bold">
                    ₦
                    {branchStats.averageTransactionValue.toLocaleString("en-NG", {
                      maximumFractionDigits: 0,
                    })}
                  </h3>
                </div>
                <DollarSign className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={`/dashboard-filling-station/branches/${branchId}/inventory`}>
              <Button variant="outline" className="w-full">
                <Package className="mr-2 h-4 w-4" />
                View Inventory
              </Button>
            </Link>
            <Link href="/dashboard-filling-station/staff">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                View Staff
              </Button>
            </Link>
            <Link href="/dashboard-filling-station/branches">
              <Button variant="outline" className="w-full">
                <Building2 className="mr-2 h-4 w-4" />
                All Branches
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
