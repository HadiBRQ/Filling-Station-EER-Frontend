import React from "react";
import { Link } from "@/components/navigation";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Shield,
  Clock,
  CreditCard,
  Edit,
  UserX,
  Key,
  Award,
  TrendingUp
} from "lucide-react";
import { mockStaff, mockBranches } from "@/lib/data/mock-eer-data";

interface StaffDetailsPageProps {
  params: {
    id: string;
    locale: string;
  };
}

const StaffDetailsPage = ({ params }: StaffDetailsPageProps) => {
  const { id } = params;
  const staff = mockStaff.find(s => s.id === id);
  
  if (!staff) {
    notFound();
  }

  const branch = mockBranches.find(b => b.id === staff.employment.branchId);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
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
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'suspended': return 'warning';
      case 'terminated': return 'destructive';
      default: return 'default';
    }
  };

  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatPermission = (permission: string) => {
    return permission.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

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
          
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl font-bold">
                {getInitials(staff.personalInfo.firstName, staff.personalInfo.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {staff.personalInfo.firstName} {staff.personalInfo.lastName}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge color={getRoleColor(staff.employment.role)}>
                  {formatRole(staff.employment.role)}
                </Badge>
                <Badge color={getStatusColor(staff.employment.status)}>
                  {staff.employment.status}
                </Badge>
                <span className="text-muted-foreground">ID: {staff.employeeId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Reset Password
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            <UserX className="h-4 w-4 mr-2" />
            Deactivate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-base">{staff.personalInfo.firstName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-base">{staff.personalInfo.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="text-base">{new Date(staff.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="text-base">-</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">National ID</label>
                  <p className="text-base">{staff.documents.idCardNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Marital Status</label>
                  <p className="text-base">-</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{staff.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{staff.personalInfo.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p>{staff.personalInfo.address.street}</p>
                    <p className="text-muted-foreground">{staff.personalInfo.address.city}, {staff.personalInfo.address.state}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Employment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                  <p className="text-base font-mono">{staff.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <p className="text-base capitalize">{staff.employment.department.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p className="text-base">{formatRole(staff.employment.role)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Employment Status</label>
                  <Badge color={getStatusColor(staff.employment.status)}>
                    {staff.employment.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Hire Date</label>
                  <p className="text-base flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(staff.employment.hireDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Salary</label>
                  <p className="text-base font-semibold">₦{staff.employment.salary.toLocaleString()}/month</p>
                </div>
              </div>

              {branch && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Assigned Branch</label>
                    <Card className="mt-2 p-3 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{branch.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {branch.location.city}, {branch.location.state}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/branches/${branch.id}`}>
                            View Branch
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Work Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Work Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shift Pattern</label>
                  <p className="text-base capitalize">{staff.schedule.shiftType.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Working Days</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {staff.schedule.workingDays.map((day: string) => (
                      <Badge key={day} color="info" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Time</label>
                  <p className="text-base">{staff.schedule.startTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Time</label>
                  <p className="text-base">{staff.schedule.endTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Bank Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                  <p className="text-base">{staff.documents.bankAccountDetails.bankName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                  <p className="text-base font-mono">{staff.documents.bankAccountDetails.accountNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Name</label>
                  <p className="text-base">{staff.documents.bankAccountDetails.accountName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sort Code</label>
                  <p className="text-base font-mono">-</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Award 
                          key={star} 
                          className={`h-4 w-4 ${star <= staff.performance.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{staff.performance.rating}/5</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Punctuality</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "95%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Productivity</span>
                                        <span className="font-medium">88%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Service</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "92%" }}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">96%</div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </CardContent>
          </Card>

          {/* System Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(staff.permissions).filter(([key, value]) => value).map(([permission]) => (
                  <div key={permission} className="flex items-center justify-between">
                    <span className="text-sm">{formatPermission(permission)}</span>
                    <Badge color="success" className="text-xs">Granted</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Employee Details
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="h-4 w-4 mr-2" />
                Change Branch Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Modify Permissions
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Update Work Schedule
              </Button>
              <Separator />
              <Button className="w-full justify-start border-red-600 text-red-600 hover:bg-red-600 hover:text-white" variant="outline">
                <UserX className="h-4 w-4 mr-2" />
                Suspend Employee
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsPage;