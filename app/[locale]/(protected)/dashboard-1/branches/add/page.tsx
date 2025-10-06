import React from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Building2, MapPin, User, Phone, Clock, Fuel, Zap } from "lucide-react";

const AddBranchPage = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/branches">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Add New Branch
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new filling station branch with location and capacity details
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Enter the basic details for the new branch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input 
                  id="branchName"
                  placeholder="e.g., Downtown Hub, Highway Express"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchCode">Branch Code</Label>
                <Input 
                  id="branchCode"
                  placeholder="e.g., DTH-001, HWY-002"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Details
            </CardTitle>
            <CardDescription>
              Specify the exact location of the branch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Textarea 
                id="address"
                placeholder="Enter the complete street address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city"
                  placeholder="e.g., Houston"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos State</SelectItem>
                    <SelectItem value="abuja">FCT Abuja</SelectItem>
                    <SelectItem value="rivers">Rivers State</SelectItem>
                    <SelectItem value="ogun">Ogun State</SelectItem>
                    <SelectItem value="kano">Kano State</SelectItem>
                    <SelectItem value="oyo">Oyo State</SelectItem>
                    <SelectItem value="delta">Delta State</SelectItem>
                    <SelectItem value="kaduna">Kaduna State</SelectItem>
                    <SelectItem value="anambra">Anambra State</SelectItem>
                    <SelectItem value="edo">Edo State</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input 
                  id="zipCode"
                  placeholder="e.g., 77001"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input 
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 29.7604"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input 
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g., -95.3698"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Management Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Management & Contact
            </CardTitle>
            <CardDescription>
              Assign manager and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="manager">Branch Manager *</Label>
                <Input 
                  id="manager"
                  placeholder="e.g., John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="e.g., +1-555-0123"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="e.g., manager@greenfuel.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
            <CardDescription>
              Set the branch operating schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="is24Hours" />
              <Label htmlFor="is24Hours">Open 24/7</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="openTime">Opening Time</Label>
                <Input 
                  id="openTime"
                  type="time"
                  defaultValue="06:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeTime">Closing Time</Label>
                <Input 
                  id="closeTime"
                  type="time"
                  defaultValue="22:00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fuel Capacity & Infrastructure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Fuel Capacity & Infrastructure
            </CardTitle>
            <CardDescription>
              Configure fuel storage capacity and pump infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="petrolCapacity">Petrol Capacity (Liters) *</Label>
                <Input 
                  id="petrolCapacity"
                  type="number"
                  placeholder="e.g., 15000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dieselCapacity">Diesel Capacity (Liters) *</Label>
                <Input 
                  id="dieselCapacity"
                  type="number"
                  placeholder="e.g., 12000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electricChargers">Electric Chargers</Label>
                <Input 
                  id="electricChargers"
                  type="number"
                  placeholder="e.g., 8"
                  defaultValue="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="petrolPumps">Petrol Pumps *</Label>
                <Input 
                  id="petrolPumps"
                  type="number"
                  placeholder="e.g., 6"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dieselPumps">Diesel Pumps *</Label>
                <Input 
                  id="dieselPumps"
                  type="number"
                  placeholder="e.g., 4"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalParkingSpots">Parking Spots</Label>
                <Input 
                  id="totalParkingSpots"
                  type="number"
                  placeholder="e.g., 20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy & Environmental Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Energy & Environmental Settings
            </CardTitle>
            <CardDescription>
              Configure energy monitoring and environmental targets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="solarPanels">Solar Panel Capacity (kW)</Label>
                <Input 
                  id="solarPanels"
                  type="number"
                  placeholder="e.g., 50"
                  defaultValue="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="energyTarget">Monthly Energy Target (kWh)</Label>
                <Input 
                  id="energyTarget"
                  type="number"
                  placeholder="e.g., 15000"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="carbonReduction">Carbon Reduction Target (%)</Label>
                <Input 
                  id="carbonReduction"
                  type="number"
                  placeholder="e.g., 15"
                  defaultValue="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteReduction">Waste Reduction Target (%)</Label>
                <Input 
                  id="wasteReduction"
                  type="number"
                  placeholder="e.g., 20"
                  defaultValue="10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="greenCertified" />
              <Label htmlFor="greenCertified">Apply for Green Energy Certification</Label>
            </div>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Features</CardTitle>
            <CardDescription>
              Optional services and amenities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="carWash" />
                <Label htmlFor="carWash">Car Wash Service</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="convenienceStore" />
                <Label htmlFor="convenienceStore">Convenience Store</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="restaurant" />
                <Label htmlFor="restaurant">Restaurant/Café</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="restrooms" />
                <Label htmlFor="restrooms">Public Restrooms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="atm" />
                <Label htmlFor="atm">ATM Machine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="wifi" />
                <Label htmlFor="wifi">Free WiFi</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/branches">Cancel</Link>
          </Button>
          <Button type="submit">
            Create Branch
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBranchPage;