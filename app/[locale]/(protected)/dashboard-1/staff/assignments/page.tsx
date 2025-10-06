import React from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Building2,
  Users,
  ArrowLeft,
  UserPlus,
  ArrowRightLeft,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2
} from "lucide-react";
import { mockStaff, mockBranches } from "@/lib/data/mock-eer-data";

const StaffAssignmentsPage = () => {
  const staff = React.useMemo(() => mockStaff, []);
  const branches = React.useMemo(() => mockBranches, []);

  const getInitials = React.useMemo(() => (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  const getRoleColor = React.useMemo(() => (role: string) => {
    switch (role) {
      case 'station-manager': return 'destructive';
      case 'assistant-manager': return 'warning';
      case 'shift-supervisor': return 'info';
      case 'fuel-attendant': return 'secondary';
      case 'cashier': return 'secondary';
      case 'security-guard': return 'default';
      case 'maintenance-technician': return 'success';
      default: return 'default';
    }
  }, []);

  const formatRole = React.useMemo(() => (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }, []);

  const getBranchStaff = React.useMemo(() => (branchId: string) => {
    return staff.filter(s => s.employment.branchId === branchId);
  }, [staff]);

  const getUnassignedStaff = React.useMemo(() => () => {
    return staff.filter(s => !s.employment.branchId);
  }, [staff]);

  const getBranchManager = React.useMemo(() => (branchId: string) => {
    return staff.find(s => 
      s.employment.branchId === branchId && 
      (s.employment.role === 'station-manager' || s.employment.role === 'assistant-manager')
    );
  }, [staff]);

  const unassignedStaff = React.useMemo(() => getUnassignedStaff(), [getUnassignedStaff]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/staff">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ArrowRightLeft className="h-8 w-8 text-primary" />
              Staff Assignments
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage staff assignments across all Total Energies branches
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Staff to Branch</DialogTitle>
                <DialogDescription>
                  Select a staff member and assign them to a branch
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Staff Member</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {unassignedStaff.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.personalInfo.firstName} {member.personalInfo.lastName} - {formatRole(member.employment.role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name} - {branch.location.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Assign Staff</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button asChild>
            <Link href="/staff/add">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Staff
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.filter(s => s.employment.branchId).length}</div>
            <p className="text-xs text-muted-foreground">
              Staff assigned to branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {unassignedStaff.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting assignment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branches Covered</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {branches.filter(b => getBranchStaff(b.id).length > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {branches.length} branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers Assigned</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {branches.filter(b => getBranchManager(b.id)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Branches with managers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Unassigned Staff */}
      {unassignedStaff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Users className="h-5 w-5" />
              Unassigned Staff ({unassignedStaff.length})
            </CardTitle>
            <CardDescription>
              Staff members who need to be assigned to a branch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unassignedStaff.map((member) => (
                <Card key={member.id} className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-100 text-orange-700">
                          {getInitials(member.personalInfo.firstName, member.personalInfo.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">
                          {member.personalInfo.firstName} {member.personalInfo.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {member.employeeId}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Badge color={getRoleColor(member.employment.role)}>
                        {formatRole(member.employment.role)}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Hired: {new Date(member.employment.hireDate).toLocaleDateString()}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="w-full">
                            <Building2 className="h-3 w-3 mr-1" />
                            Assign to Branch
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Assign {member.personalInfo.firstName} {member.personalInfo.lastName}
                            </DialogTitle>
                            <DialogDescription>
                              Select a branch for this {formatRole(member.employment.role)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Branch</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                  {branches.map((branch) => (
                                    <SelectItem key={branch.id} value={branch.id}>
                                      <div>
                                        <div className="font-medium">{branch.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {branch.location.city} • {getBranchStaff(branch.id).length} staff
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Assign</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Branch Assignments */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Branch Assignments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {branches.map((branch) => {
            const branchStaff = getBranchStaff(branch.id);
            const manager = getBranchManager(branch.id);
            
            return (
              <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{branch.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {branch.location.address}, {branch.location.city}
                      </CardDescription>
                    </div>
                    <Badge color={branch.status === 'active' ? 'success' : 'warning'}>
                      {branch.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Branch Manager */}
                  {manager ? (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-red-100 text-red-700">
                            {getInitials(manager.personalInfo.firstName, manager.personalInfo.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {manager.personalInfo.firstName} {manager.personalInfo.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatRole(manager.employment.role)}
                          </div>
                        </div>
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ No manager assigned to this branch
                      </div>
                    </div>
                  )}

                  {/* Staff Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Staff Members</span>
                    <Badge color="info">{branchStaff.length} assigned</Badge>
                  </div>

                  {/* Staff List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {branchStaff.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-2 border rounded-lg">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {getInitials(member.personalInfo.firstName, member.personalInfo.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {member.personalInfo.firstName} {member.personalInfo.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatRole(member.employment.role)}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" asChild>
                            <Link href={`/staff/${member.id}`}>
                              <Edit className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Remove Staff Assignment</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to remove {member.personalInfo.firstName} {member.personalInfo.lastName} from {branch.name}?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">Remove</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                    {branchStaff.length === 0 && (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        No staff assigned to this branch
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Add Staff
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Staff to {branch.name}</DialogTitle>
                          <DialogDescription>
                            Select a staff member to assign to this branch
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Staff Member</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select staff member" />
                              </SelectTrigger>
                              <SelectContent>
                                {unassignedStaff.map((member) => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.personalInfo.firstName} {member.personalInfo.lastName} - {formatRole(member.employment.role)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Add to Branch</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/branches/${branch.id}`}>
                        <Building2 className="h-3 w-3 mr-1" />
                        View Branch
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StaffAssignmentsPage;