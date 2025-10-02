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
import { Plus, Fuel } from "lucide-react";
import { toast } from "sonner";

interface AddTankDialogProps {
  branchId?: string;
  onAddTank?: (tankData: {
    tank_name: string;
    capacity_litres: number;
    product_id: string;
    current_stock?: number;
  }) => void;
}

// Mock product data - in real app this would come from API
const availableProducts = [
  { id: "1", name: "Premium Motor Spirit (PMS)", price: 617 },
  { id: "2", name: "Automotive Gas Oil (AGO)", price: 750 },
  { id: "3", name: "Dual Purpose Kerosene (DPK)", price: 650 },
  { id: "4", name: "Low Pour Fuel Oil (LPFO)", price: 450 },
];

export default function AddTankDialog({ branchId, onAddTank }: AddTankDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tank_name: "",
    capacity_litres: "",
    product_id: "",
    current_stock: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tank_name.trim() || !formData.capacity_litres || !formData.product_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    const capacity = parseInt(formData.capacity_litres);
    const currentStock = formData.current_stock ? parseInt(formData.current_stock) : 0;

    if (capacity <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    if (currentStock > capacity) {
      toast.error("Current stock cannot exceed tank capacity");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAddTank?.({
        tank_name: formData.tank_name,
        capacity_litres: capacity,
        product_id: formData.product_id,
        current_stock: currentStock,
      });
      
      toast.success(`Tank "${formData.tank_name}" has been added successfully!`);
      
      // Reset form
      setFormData({
        tank_name: "",
        capacity_litres: "",
        product_id: "",
        current_stock: "",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add tank. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tank
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-orange-600" />
            Add Storage Tank
          </DialogTitle>
          <DialogDescription>
            Add a new storage tank to this branch. Each tank stores a specific fuel product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tank_name" className="text-sm font-medium">
                Tank Name *
              </Label>
              <Input
                id="tank_name"
                placeholder="e.g., Tank A1, Underground Tank 1"
                value={formData.tank_name}
                onChange={(e) => setFormData(prev => ({ ...prev, tank_name: e.target.value }))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product_id" className="text-sm font-medium">
                Fuel Product *
              </Label>
              <Select value={formData.product_id} onValueChange={(value) => setFormData(prev => ({ ...prev, product_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel product" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (₦{product.price}/L)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity_litres" className="text-sm font-medium">
                Tank Capacity (Litres) *
              </Label>
              <Input
                id="capacity_litres"
                type="number"
                placeholder="e.g., 50000"
                value={formData.capacity_litres}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity_litres: e.target.value }))}
                className="w-full"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current_stock" className="text-sm font-medium">
                Initial Stock (Litres)
              </Label>
              <Input
                id="current_stock"
                type="number"
                placeholder="e.g., 25000 (optional)"
                value={formData.current_stock}
                onChange={(e) => setFormData(prev => ({ ...prev, current_stock: e.target.value }))}
                className="w-full"
                min="0"
                max={formData.capacity_litres || undefined}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty if tank is initially empty
              </p>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Tank"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}