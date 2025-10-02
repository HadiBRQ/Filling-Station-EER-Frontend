"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Fuel, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

interface Tank {
  tank_id: string;
  tank_name?: string;
  capacity_litres: number;
  product: {
    product_name: string;
  };
  latest_inventory?: {
    current_stock_litres: number;
  };
}

interface InventoryManagementDialogProps {
  tanks: Tank[];
  onUpdateInventory?: (tankId: string, newStock: number, transactionType: 'inbound' | 'outbound', quantity: number) => void;
}

export default function InventoryManagementDialog({ tanks, onUpdateInventory }: InventoryManagementDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTank, setSelectedTank] = useState<string>("");
  const [transactionType, setTransactionType] = useState<'inbound' | 'outbound'>('inbound');
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedTankData = tanks.find(tank => tank.tank_id === selectedTank);
  const currentStock = selectedTankData?.latest_inventory?.current_stock_litres || 0;
  const capacity = selectedTankData?.capacity_litres || 0;
  const availableSpace = capacity - currentStock;

  const calculateStockPercentage = (stock: number, cap: number): number => {
    return cap > 0 ? (stock / cap) * 100 : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTank || !quantity || parseInt(quantity) <= 0) {
      toast.error("Please fill in all required fields with valid values");
      return;
    }

    const quantityNum = parseInt(quantity);
    
    if (transactionType === 'inbound' && quantityNum > availableSpace) {
      toast.error(`Cannot add ${quantityNum}L. Only ${availableSpace}L space available.`);
      return;
    }

    if (transactionType === 'outbound' && quantityNum > currentStock) {
      toast.error(`Cannot remove ${quantityNum}L. Only ${currentStock}L available.`);
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newStock = transactionType === 'inbound' 
        ? currentStock + quantityNum 
        : currentStock - quantityNum;
      
      onUpdateInventory?.(selectedTank, newStock, transactionType, quantityNum);
      
      const action = transactionType === 'inbound' ? 'added to' : 'removed from';
      toast.success(`${quantityNum}L ${action} ${selectedTankData?.tank_name || `Tank ${selectedTankData?.tank_id}`} successfully!`);
      
      // Reset form
      setSelectedTank("");
      setTransactionType('inbound');
      setQuantity("");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Fuel className="mr-2 h-4 w-4" />
          Manage Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-blue-600" />
            Inventory Management
          </DialogTitle>
          <DialogDescription>
            Add or remove fuel from storage tanks. All transactions will be logged for audit purposes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tank_select" className="text-sm font-medium">
                Select Tank *
              </Label>
              <Select value={selectedTank} onValueChange={setSelectedTank}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tank" />
                </SelectTrigger>
                <SelectContent>
                  {tanks.map((tank) => {
                    const stockPercentage = calculateStockPercentage(
                      tank.latest_inventory?.current_stock_litres || 0,
                      tank.capacity_litres
                    );
                    
                    return (
                      <SelectItem key={tank.tank_id} value={tank.tank_id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{tank.tank_name || `Tank ${tank.tank_id}`} - {tank.product.product_name}</span>
                          <Badge 
                            color={stockPercentage < 20 ? "destructive" : stockPercentage < 50 ? "warning" : "secondary"}
                            className="ml-2"
                          >
                            {stockPercentage.toFixed(1)}%
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedTankData && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedTankData.tank_name || `Tank ${selectedTankData.tank_id}`}</span>
                  <Badge color="secondary">{selectedTankData.product.product_name}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Stock:</span>
                    <span className="font-medium">{currentStock.toLocaleString()}L</span>
                  </div>
                  <Progress 
                    value={calculateStockPercentage(currentStock, capacity)} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Capacity: {capacity.toLocaleString()}L</span>
                    <span>Available: {availableSpace.toLocaleString()}L</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="transaction_type" className="text-sm font-medium">
                Transaction Type *
              </Label>
              <Select value={transactionType} onValueChange={(value: 'inbound' | 'outbound') => setTransactionType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-green-600" />
                      <span>Inbound (Add Fuel)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="outbound">
                    <div className="flex items-center gap-2">
                      <Minus className="h-4 w-4 text-red-600" />
                      <span>Outbound (Remove Fuel)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                Quantity (Litres) *
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity in litres"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full"
                min="1"
                max={transactionType === 'inbound' ? availableSpace : currentStock}
              />
              {selectedTankData && (
                <p className="text-xs text-muted-foreground">
                  Max {transactionType === 'inbound' ? 'inbound' : 'outbound'}: {
                    transactionType === 'inbound' 
                      ? availableSpace.toLocaleString() 
                      : currentStock.toLocaleString()
                  }L
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !selectedTank}>
              {loading ? "Processing..." : `${transactionType === 'inbound' ? 'Add' : 'Remove'} Fuel`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}