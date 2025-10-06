"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Building2,
  Calendar,
  User
} from "lucide-react";
import { getMainCompanyData } from "@/lib/filling-station-data";

interface QuickActionsDialogProps {
  action: 'staff' | 'inventory' | 'branches' | 'stations';
  children: React.ReactNode;
}

export default function QuickActionsDialog({ action, children }: QuickActionsDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const companyData = getMainCompanyData();
  
  const getDialogContent = () => {
    switch (action) {
      case 'staff':
        const allStaff = companyData.stations?.flatMap(station => 
          station.branches?.flatMap(branch => branch.staff || []) || []
        ) || [];
        
        const filteredStaff = allStaff.filter(staff =>
          staff.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
          title: "Staff Management",
          description: `Overview of all ${allStaff.length} staff members across MACROOIL network`,
          content: (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {filteredStaff.slice(0, 20).map((staff) => (
                  <Card key={staff.staff_id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{staff.full_name}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {staff.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {staff.phone_number}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge color="secondary">{staff.role}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Staff ID: {staff.staff_id}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {filteredStaff.length > 20 && (
                <p className="text-center text-sm text-muted-foreground">
                  Showing 20 of {filteredStaff.length} results
                </p>
              )}
            </div>
          )
        };

      case 'branches':
        const allBranches = companyData.stations?.flatMap(station => 
          station.branches?.map(branch => ({ ...branch, station_name: station.station_name })) || []
        ) || [];
        
        const filteredBranches = allBranches.filter(branch =>
          branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.station_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
          title: "Branch Operations",
          description: `Monitor all ${allBranches.length} branch locations across the network`,
          content: (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search branches by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {filteredBranches.slice(0, 15).map((branch) => (
                  <Card key={branch.branch_id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{branch.branch_name}</p>
                          <p className="text-sm text-muted-foreground">{branch.lga}</p>
                          <p className="text-xs text-muted-foreground">{branch.station_name}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex gap-2">
                          <Badge color="secondary">{branch.tanks?.length || 0} Tanks</Badge>
                          <Badge color="default">{branch.staff?.length || 0} Staff</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {branch.manager ? `Mgr: ${branch.manager.full_name.split(' ')[0]}` : 'No Manager'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        };

      case 'stations':
        const station = companyData.stations?.[0]; // Single station
        
        if (!station) {
          return {
            title: "Station Overview",
            description: "No station data available",
            content: <div className="text-center text-muted-foreground">No station configured</div>
          };
        }

        const totalBranches = station.branches?.length || 0;
        const totalTanks = station.branches?.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0) || 0;
        const totalStaff = station.branches?.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0) || 0;

        return {
          title: "Station Overview",
          description: `Complete overview of MACROOIL Nigeria with ${totalBranches} branches`,
          content: (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{station.station_name}</p>
                      <Badge color="default">{station.station_code}</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-sm font-medium">{totalBranches}</p>
                    <p className="text-xs text-muted-foreground">Branches</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-sm font-medium">{totalTanks}</p>
                    <p className="text-xs text-muted-foreground">Tanks</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-sm font-medium">{totalStaff}</p>
                    <p className="text-xs text-muted-foreground">Staff</p>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-2">
                <h4 className="font-medium">Branch Locations</h4>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {station.branches?.map((branch) => (
                    <div key={branch.branch_id} className="p-2 border rounded text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{branch.branch_name}</span>
                        <Badge color="secondary" className="text-xs">{branch.lga}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{branch.physical_address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: "Quick Overview",
          description: "Dashboard information",
          content: <div>No data available</div>
        };
    }
  };

  const dialogData = getDialogContent();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{dialogData.title}</DialogTitle>
          <DialogDescription>{dialogData.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {dialogData.content}
        </div>
      </DialogContent>
    </Dialog>
  );
}