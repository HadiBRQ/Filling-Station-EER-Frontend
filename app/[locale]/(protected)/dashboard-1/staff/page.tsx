import React, { useMemo } from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  UserCheck,
  Building2,
  Phone,
  Mail,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  ArrowRightLeft,
  Shield
} from "lucide-react";
import { mockStaff, mockBranches } from "@/lib/data/mock-eer-data";

const StaffPage = () => {
  const staff = useMemo(() => mockStaff, []);
  const branches = useMemo(() => mockBranches, []);

  const getRoleColor = useMemo(() => (role: string) => {
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

  const getStatusColor = useMemo(() => (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'suspended': return 'warning';
      case 'terminated': return 'destructive';
      default: return 'default';
    }
  }, []);

  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getBranchName = (branchId?: string) => {
    if (!branchId) return 'Unassigned';
    const branch = branches.find(b => b.id === branchId);
    return branch?.name || 'Unknown Branch';
  };

  const getInitials = useMemo(() => (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  const managers = useMemo(() => staff.filter(s => 
    s.employment.role === 'station-manager' || s.employment.role === 'assistant-manager'
  ), [staff]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Staff Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage staff members, assign roles, and track performance across all branches
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/staff/assignments">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Staff Assignments
            </Link>
          </Button>
          <Button asChild>
            <Link href="/staff/add">
              <Plus className="h-4 w-4 mr-2" />
              Add New Staff
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {managers.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Station & Assistant Managers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {staff.filter(s => s.employment.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(staff.reduce((acc, s) => acc + s.performance.rating, 0) / staff.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              +2
            </div>
            <p className="text-xs text-muted-foreground">
              New hires
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search staff by name, role, or employee ID..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Role
            </Button>
            <Button variant="outline">
              <Building2 className="h-4 w-4 mr-2" />
              Filter by Branch
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manager Quick View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Station Managers
          </CardTitle>
          <CardDescription>
            Quick overview of all station managers and their assigned branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {managers.map((manager) => (
              <Card key={manager.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(manager.personalInfo.firstName, manager.personalInfo.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">
                        {manager.personalInfo.firstName} {manager.personalInfo.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {manager.employeeId}
                      </div>
                    </div>
                    <Badge color={getRoleColor(manager.employment.role)}>
                      {formatRole(manager.employment.role)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{getBranchName(manager.employment.branchId)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{manager.personalInfo.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Rating: {manager.performance.rating}/5.0</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/staff/${manager.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/staff/${manager.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff Members</CardTitle>
          <CardDescription>
            Complete list of all staff with detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(employee.personalInfo.firstName, employee.personalInfo.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {employee.employeeId}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {employee.personalInfo.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={getRoleColor(employee.employment.role)}>
                      {formatRole(employee.employment.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {getBranchName(employee.employment.branchId)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(employee.employment.status)}>
                      {employee.employment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {employee.performance.rating}/5.0
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(employee.employment.hireDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatRole(employee.schedule.shiftType)}</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.schedule.startTime} - {employee.schedule.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/staff/${employee.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/staff/${employee.id}/edit`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;