"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Trash2,
  Search,
  Filter,
  Crown,
  Shield,
  Calculator,
  Wrench
} from "lucide-react";
import { 
  staff, 
  branches, 
  getBranchWithRelations 
} from "@/lib/filling-station-data";
import { Staff } from "@/lib/type";
import { useState } from "react";

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");

  // Filter staff based on search and filters
  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = staffMember.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.phone_number.includes(searchTerm);
    
    const matchesRole = filterRole === "all" || staffMember.role === filterRole;
    const matchesBranch = filterBranch === "all" || staffMember.branch_id === filterBranch;
    
    return matchesSearch && matchesRole && matchesBranch;
  });

  const getRoleIcon = (role: Staff['role']) => {
    switch (role) {
      case 'Manager': return Crown;
      case 'Supervisor': return Shield;
      case 'Accountant': return Calculator;
      case 'Attendant': return Users;
      case 'Security': return Shield;
      default: return Users;
    }
  };

  const getRoleColor = (role: Staff['role']) => {
    switch (role) {
      case 'Manager': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      case 'Supervisor': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'Accountant': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'Attendant': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'Security': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  // Calculate statistics
  const roleStats = staff.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const branchStats = staff.reduce((acc, member) => {
    acc[member.branch_id] = (acc[member.branch_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff members across all branches
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <Crown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{roleStats.Manager || 0}</div>
            <p className="text-xs text-muted-foreground">
              Branch managers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendants</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{roleStats.Attendant || 0}</div>
            <p className="text-xs text-muted-foreground">
              Fuel attendants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accountants</CardTitle>
            <Calculator className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{roleStats.Accountant || 0}</div>
            <p className="text-xs text-muted-foreground">
              Finance staff
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Other Roles</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(roleStats.Supervisor || 0) + (roleStats.Security || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Support staff
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Roles</option>
                <option value="Manager">Managers</option>
                <option value="Supervisor">Supervisors</option>
                <option value="Attendant">Attendants</option>
                <option value="Accountant">Accountants</option>
                <option value="Security">Security</option>
              </select>
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((staffMember) => {
          const branch = branches.find(b => b.branch_id === staffMember.branch_id);
          const RoleIcon = getRoleIcon(staffMember.role);
          const roleColor = getRoleColor(staffMember.role);
          
          return (
            <Card key={staffMember.staff_id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${roleColor}`}>
                      <RoleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{staffMember.full_name}</CardTitle>
                      <Badge color="default" className="mt-1">
                        {staffMember.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{staffMember.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate">{staffMember.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{branch?.branch_name}</span>
                    </div>
                  </div>

                  {/* Branch Info */}
                  {branch && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">{branch.branch_name}</p>
                      <p className="text-xs text-muted-foreground">{branch.lga}</p>
                      <p className="text-xs text-muted-foreground">{branch.physical_address}</p>
                    </div>
                  )}

                  {/* Employment Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <p>Joined</p>
                      <p className="font-medium text-foreground">
                        {staffMember.created_at.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p>Updated</p>
                      <p className="font-medium text-foreground">
                        {staffMember.updated_at.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Special Manager Badge */}
                  {branch && branch.manager_id === staffMember.staff_id && (
                    <Badge color="secondary" className="w-full justify-center">
                      <Crown className="mr-1 h-3 w-3" />
                      Branch Manager
                    </Badge>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      Edit Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No staff found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterRole !== "all" || filterBranch !== "all" 
                ? "No staff members match your current filters." 
                : "No staff members are registered yet."
              }
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("all");
                  setFilterBranch("all");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Staff Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Branch Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution by Branch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branches.map((branch) => {
              const branchStaffCount = branchStats[branch.branch_id] || 0;
              const branchData = getBranchWithRelations(branch.branch_id);
              const manager = branchData?.manager;
              
              return (
                <div key={branch.branch_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{branch.branch_name}</p>
                    <p className="text-sm text-muted-foreground">{branch.lga}</p>
                    {manager && (
                      <p className="text-xs text-muted-foreground">
                        Manager: {manager.full_name}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge color="secondary" className="text-lg px-3 py-1">
                      {branchStaffCount}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      staff member{branchStaffCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}