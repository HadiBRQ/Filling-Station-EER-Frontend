"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Plus, Search, Edit, Trash2, Users, Fuel } from "lucide-react";
import { getMainCompanyData } from "@/lib/filling-station-data";
import AddStationDialog from "@/components/filling-station/add-station-dialog";
import EditStationDialog from "@/components/filling-station/edit-station-dialog";
import DeleteConfirmationDialog from "@/components/filling-station/delete-confirmation-dialog";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const companyData = getMainCompanyData();
  const [stations, setStations] = useState(companyData.stations || []);
  
  const filteredStations = stations.filter(station =>
    station.station_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.station_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStation = (stationData: { station_name: string; station_code: string }) => {
    const newStation = {
      station_id: `ST-${Date.now()}`,
      ...stationData,
      company_id: "COMP-001",
      created_at: new Date(),
      updated_at: new Date(),
      branches: [],
    };
    
    setStations(prev => [...prev, newStation]);
  };

  const handleEditStation = (stationId: string, stationData: { station_name: string; station_code: string }) => {
    setStations(prev => prev.map(station => 
      station.station_id === stationId 
        ? { ...station, ...stationData, updated_at: new Date() }
        : station
    ));
  };

  const handleDeleteStation = (stationId: string) => {
    setStations(prev => prev.filter(station => station.station_id !== stationId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Station Overview</h1>
          <p className="text-muted-foreground">
            Monitor the central MACROOIL station with {companyData.stations?.[0]?.branches?.length || 0} branches nationwide
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Building2 className="mr-2 h-4 w-4" />
            Station Settings
          </Button>
          <AddStationDialog onAddStation={handleAddStation} />
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stations by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStations.map((station) => {
          const totalBranches = station.branches?.length || 0;
          const totalTanks = station.branches?.reduce((acc, branch) => acc + (branch.tanks?.length || 0), 0) || 0;
          const totalStaff = station.branches?.reduce((acc, branch) => acc + (branch.staff?.length || 0), 0) || 0;

          return (
            <Card key={station.station_id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{station.station_name}</CardTitle>
                    <Badge color="default" className="mt-1">
                      {station.station_code}
                    </Badge>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditStationDialog 
                      station={station} 
                      onEditStation={handleEditStation}
                    />
                    <DeleteConfirmationDialog
                      title="Delete Station"
                      description={`Are you sure you want to delete "${station.station_name}"? This action cannot be undone and will also delete all associated branches, tanks, and inventory records.`}
                      itemName={station.station_name}
                      onConfirm={() => handleDeleteStation(station.station_id)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-muted/50 rounded">
                      <MapPin className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                      <p className="text-sm font-medium">{totalBranches}</p>
                      <p className="text-xs text-muted-foreground">Branches</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <Fuel className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-sm font-medium">{totalTanks}</p>
                      <p className="text-xs text-muted-foreground">Tanks</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <Users className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                      <p className="text-sm font-medium">{totalStaff}</p>
                      <p className="text-xs text-muted-foreground">Staff</p>
                    </div>
                  </div>

                  {/* Branches List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Branches</h4>
                    {station.branches?.slice(0, 3).map((branch) => (
                      <div key={branch.branch_id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                        <div>
                          <p className="font-medium">{branch.branch_name}</p>
                          <p className="text-xs text-muted-foreground">{branch.lga}</p>
                        </div>
                        <div className="text-right">
                          <Badge color="secondary" className="text-xs">
                            {branch.manager?.full_name.split(' ')[0]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {(station.branches?.length || 0) > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{(station.branches?.length || 0) - 3} more branches
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/filling-station/stations/${station.station_id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/filling-station/stations/${station.station_id}/branches`} className="flex-1">
                      <Button className="w-full">
                        Manage Branches
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStations.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No additional stations found</h3>
            <p className="text-muted-foreground mb-4">
              MACROOIL operates as a single unified station with multiple branches. Create additional branches instead.
            </p>
            <Link href="/filling-station/branches">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Manage Branches
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Summary Card - Single Station Overview */}
      <Card>
        <CardHeader>
          <CardTitle>MACROOIL Network Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">1</p>
              <p className="text-sm text-muted-foreground">Unified Station</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {stations.reduce((acc: number, station) => acc + (station.branches?.length || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Branches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {stations.reduce((acc: number, station) => 
                  acc + (station.branches?.reduce((branchAcc: number, branch) => branchAcc + (branch.tanks?.length || 0), 0) || 0), 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Total Tanks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {stations.reduce((acc: number, station) => 
                  acc + (station.branches?.reduce((branchAcc: number, branch) => branchAcc + (branch.staff?.length || 0), 0) || 0), 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}