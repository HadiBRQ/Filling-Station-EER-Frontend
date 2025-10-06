"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Fuel, Save, X } from "lucide-react";
import { TankWithProduct } from "@/lib/type";

interface InventoryUpdateFormProps {
  tank: TankWithProduct;
  onUpdate?: (tankId: string, newReading: number, notes?: string) => void;
}

export default function InventoryUpdateForm({ tank, onUpdate }: InventoryUpdateFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(
    tank.latest_inventory?.current_stock_litres.toString() || ""
  );
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStockNumber = parseFloat(currentStock) || 0;
  const stockPercentage = tank.capacity_litres > 0 
    ? (currentStockNumber / tank.capacity_litres) * 100 
    : 0;

  const getStockStatus = (percentage: number) => {
    if (percentage < 20) return { status: "Low Stock", variant: "destructive" as const, color: "text-red-600" };
    if (percentage < 50) return { status: "Medium Stock", variant: "warning" as const, color: "text-yellow-600" };
    return { status: "Good Stock", variant: "secondary" as const, color: "text-green-600" };
  };

  const stockStatus = getStockStatus(stockPercentage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStockNumber < 0 || currentStockNumber > tank.capacity_litres) {
      alert(`Stock level must be between 0 and ${tank.capacity_litres.toLocaleString()}L`);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onUpdate) {
      onUpdate(tank.tank_id, currentStockNumber, notes);
    }
    
    setIsSubmitting(false);
    setIsOpen(false);
    setNotes("");
    
    // Show success message
    alert("Inventory reading updated successfully!");
  };

  const handleCancel = () => {
    setCurrentStock(tank.latest_inventory?.current_stock_litres.toString() || "");
    setNotes("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <Fuel className="mr-2 h-4 w-4" />
          Update Reading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Tank Inventory</DialogTitle>
          <DialogDescription>
            Record a new reading for {tank.tank_name || `Tank ${tank.tank_id}`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tank Info */}
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{tank.product.product_name}</span>
                  <Badge color={stockStatus.variant as any}>
                    {stockStatus.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Capacity: {tank.capacity_litres.toLocaleString()}L
                </div>
                {tank.latest_inventory && (
                  <div className="text-xs text-muted-foreground">
                    Last reading: {tank.latest_inventory.current_stock_litres.toLocaleString()}L
                    ({tank.latest_inventory.measured_at.toLocaleDateString()})
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Stock Input */}
          <div className="space-y-2">
            <Label htmlFor="currentStock">Current Stock (Litres)</Label>
            <Input
              id="currentStock"
              type="number"
              min="0"
              max={tank.capacity_litres}
              step="0.1"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              placeholder="Enter current stock level"
              required
            />
            <div className="text-xs text-muted-foreground">
              Maximum capacity: {tank.capacity_litres.toLocaleString()}L
            </div>
          </div>

          {/* Stock Level Preview */}
          {currentStock && (
            <Card className={`border ${
              stockPercentage < 20 ? 'border-red-200 bg-red-50' :
              stockPercentage < 50 ? 'border-yellow-200 bg-yellow-50' :
              'border-green-200 bg-green-50'
            }`}>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stockStatus.color}`}>
                    {stockPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentStockNumber.toLocaleString()}L / {tank.capacity_litres.toLocaleString()}L
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any observations or comments..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !currentStock}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Reading"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}