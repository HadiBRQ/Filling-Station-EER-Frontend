"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ArrowLeft,
  AlertCircle,
  Package,
  Droplet,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { branches, tankInventories, tanks, products } from "@/lib/filling-station-data";

export default function BranchInventoryPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = params?.branchId as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");

  // Find the branch
  const branch = useMemo(() => {
    return branches.find((b: any) => b.branch_id === branchId);
  }, [branchId]);

  // Get inventory for this branch with product details
  const branchInventory = useMemo(() => {
    return tankInventories
      .filter((inv: any) => {
        // Find the tank associated with this inventory
        const tank = tanks.find((t: any) => t.tank_id === inv.tank_id);
        return tank && tank.branch_id === branchId;
      })
      .map((inv: any) => {
        // Get tank and product details
        const tank = tanks.find((t: any) => t.tank_id === inv.tank_id);
        const product = products.find((p: any) => p.product_id === tank?.product_id);
        
        return {
          inventory_id: inv.inventory_id,
          tank_id: inv.tank_id,
          product_name: product?.product_name || "Unknown Product",
          product_type: product?.product_name || "Unknown",
          current_stock: inv.current_quantity,
          max_capacity: tank?.capacity_litres || 0,
          reorder_level: tank?.capacity_litres ? tank.capacity_litres * 0.2 : 0, // 20% threshold
          unit_price: 650, // Placeholder price per liter
          last_updated: inv.last_updated || new Date(),
        };
      });
  }, [branchId]);

  // Filter inventory
  const filteredInventory = useMemo(() => {
    return branchInventory.filter((item: any) => {
      const matchesSearch =
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "low" && item.current_stock <= item.reorder_level) ||
        (statusFilter === "normal" && item.current_stock > item.reorder_level);

      const matchesProduct =
        productFilter === "all" || item.product_type === productFilter;

      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [branchInventory, searchQuery, statusFilter, productFilter]);

  // Get unique product types
  const productTypes = useMemo(() => {
    const types = Array.from(
      new Set(branchInventory.map((i: any) => i.product_type as string))
    ).sort();
    return types;
  }, [branchInventory]);

  // Calculate inventory statistics
  const inventoryStats = useMemo(() => {
    const totalItems = branchInventory.length;
    const lowStockItems = branchInventory.filter(
      (i: any) => i.current_stock <= i.reorder_level
    ).length;
    const totalValue = branchInventory.reduce(
      (sum: number, i: any) => sum + i.current_stock * i.unit_price,
      0
    );
    const totalVolume = branchInventory.reduce(
      (sum: number, i: any) => sum + i.current_stock,
      0
    );

    return {
      totalItems,
      lowStockItems,
      totalValue,
      totalVolume,
    };
  }, [branchInventory]);

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
              The branch with ID &quot;{branchId}&quot; could not be found.
            </p>
            <Link href="/dashboard-filling-station/branches">
              <Button>View All Branches</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStockStatus = (item: any) => {
    if (item.current_stock <= item.reorder_level) {
      return {
        label: "Low Stock",
        color: "bg-red-500/10 text-red-500 border-red-500/20",
        icon: AlertTriangle,
      };
    }
    return {
      label: "In Stock",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
      icon: CheckCircle,
    };
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

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
            <h1 className="text-3xl font-bold">
              {branch.branch_name} - Inventory
            </h1>
            <p className="text-muted-foreground">
              Manage and track inventory levels
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard-filling-station/branches/${branchId}`}>
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Branch Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <h3 className="text-2xl font-bold">
                  {inventoryStats.totalItems}
                </h3>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <h3 className="text-2xl font-bold">
                  {inventoryStats.lowStockItems}
                </h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <h3 className="text-2xl font-bold">
                  {inventoryStats.totalVolume.toLocaleString("en-NG")} L
                </h3>
              </div>
              <Droplet className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <h3 className="text-2xl font-bold">
                  ₦{inventoryStats.totalValue.toLocaleString("en-NG")}
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
              </SelectContent>
            </Select>

            {/* Product Type Filter */}
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {productTypes.map((type: string) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Inventory Items ({filteredInventory.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Max Capacity</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No inventory items found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item: any) => {
                    const status = getStockStatus(item);
                    const stockPercentage = getStockPercentage(
                      item.current_stock,
                      item.max_capacity
                    );
                    const totalValue = item.current_stock * item.unit_price;

                    return (
                      <TableRow key={item.inventory_id}>
                        <TableCell className="font-medium">
                          {item.product_name}
                        </TableCell>
                        <TableCell>{item.product_type}</TableCell>
                        <TableCell>
                          {item.current_stock.toLocaleString("en-NG")} L
                        </TableCell>
                        <TableCell>
                          {item.max_capacity.toLocaleString("en-NG")} L
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{Math.round(stockPercentage)}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  stockPercentage <= 25
                                    ? "bg-red-500"
                                    : stockPercentage <= 50
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${stockPercentage}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₦{item.unit_price.toLocaleString("en-NG")}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₦{totalValue.toLocaleString("en-NG")}
                        </TableCell>
                        <TableCell>
                          <Badge className={status.color}>
                            <status.icon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
