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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin } from "lucide-react";
import { toast } from "sonner";

interface AddBranchDialogProps {
  stationId?: string;
  onAddBranch?: (branchData: {
    branch_name: string;
    physical_address: string;
    lga: string;
    state: string;
  }) => void;
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

export default function AddBranchDialog({ stationId, onAddBranch }: AddBranchDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    branch_name: "",
    physical_address: "",
    lga: "",
    state: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.branch_name.trim() || !formData.physical_address.trim() || 
        !formData.lga.trim() || !formData.state) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAddBranch?.(formData);
      
      toast.success(`Branch "${formData.branch_name}" has been created successfully!`);
      
      // Reset form
      setFormData({
        branch_name: "",
        physical_address: "",
        lga: "",
        state: "",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create branch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Add New Branch
          </DialogTitle>
          <DialogDescription>
            Create a new branch for this station. Each branch will have its own inventory and staff.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="branch_name" className="text-sm font-medium">
                Branch Name *
              </Label>
              <Input
                id="branch_name"
                placeholder="e.g., Victoria Island Branch"
                value={formData.branch_name}
                onChange={(e) => setFormData(prev => ({ ...prev, branch_name: e.target.value }))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="physical_address" className="text-sm font-medium">
                Physical Address *
              </Label>
              <Textarea
                id="physical_address"
                placeholder="Enter the complete physical address"
                value={formData.physical_address}
                onChange={(e) => setFormData(prev => ({ ...prev, physical_address: e.target.value }))}
                className="w-full"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State *
                </Label>
                <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lga" className="text-sm font-medium">
                  LGA *
                </Label>
                <Input
                  id="lga"
                  placeholder="Local Government Area"
                  value={formData.lga}
                  onChange={(e) => setFormData(prev => ({ ...prev, lga: e.target.value }))}
                  className="w-full"
                />
              </div>
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
              {loading ? "Creating..." : "Create Branch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}