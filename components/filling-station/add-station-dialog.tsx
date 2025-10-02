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
import { Plus, Building2 } from "lucide-react";
import { toast } from "sonner";

interface AddStationDialogProps {
  onAddStation?: (stationData: {
    station_name: string;
    station_code: string;
  }) => void;
}

export default function AddStationDialog({ onAddStation }: AddStationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    station_name: "",
    station_code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.station_name.trim() || !formData.station_code.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAddStation?.(formData);
      
      toast.success(`Station "${formData.station_name}" has been created successfully!`);
      
      // Reset form
      setFormData({
        station_name: "",
        station_code: "",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create station. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Station
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Add New Station
          </DialogTitle>
          <DialogDescription>
            Create a new filling station for MACROOIL. This will be the parent entity for all branches.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="station_name" className="text-sm font-medium">
                Station Name *
              </Label>
              <Input
                id="station_name"
                placeholder="e.g., MACROOIL Victoria Island"
                value={formData.station_name}
                onChange={(e) => setFormData(prev => ({ ...prev, station_name: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="station_code" className="text-sm font-medium">
                Station Code *
              </Label>
              <Input
                id="station_code"
                placeholder="e.g., MO-VI-001"
                value={formData.station_code}
                onChange={(e) => setFormData(prev => ({ ...prev, station_code: e.target.value.toUpperCase() }))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Use format: MO-[LOCATION]-[NUMBER] (e.g., MO-VI-001)
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
              {loading ? "Creating..." : "Create Station"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}