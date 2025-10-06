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
import { Edit } from "lucide-react";
import { toast } from "sonner";

interface EditStationDialogProps {
  station: {
    station_id: string;
    station_name: string;
    station_code: string;
  };
  onEditStation?: (stationId: string, stationData: {
    station_name: string;
    station_code: string;
  }) => void;
}

export default function EditStationDialog({ station, onEditStation }: EditStationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    station_name: station.station_name,
    station_code: station.station_code,
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
      
      onEditStation?.(station.station_id, formData);
      
      toast.success(`Station "${formData.station_name}" has been updated successfully!`);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update station. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = formData.station_name !== station.station_name || 
                    formData.station_code !== station.station_code;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-blue-600" />
            Edit Station
          </DialogTitle>
          <DialogDescription>
            Update the station information. Changes will be applied immediately.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_station_name" className="text-sm font-medium">
                Station Name *
              </Label>
              <Input
                id="edit_station_name"
                value={formData.station_name}
                onChange={(e) => setFormData(prev => ({ ...prev, station_name: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_station_code" className="text-sm font-medium">
                Station Code *
              </Label>
              <Input
                id="edit_station_code"
                value={formData.station_code}
                onChange={(e) => setFormData(prev => ({ ...prev, station_code: e.target.value.toUpperCase() }))}
                className="w-full"
              />
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
            <Button type="submit" disabled={loading || !hasChanges}>
              {loading ? "Updating..." : "Update Station"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}