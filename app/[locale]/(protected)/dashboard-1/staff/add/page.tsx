import React from "react";
import { Link } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Users, User, MapPin, Briefcase, Clock, CreditCard, Shield } from "lucide-react";
import { mockBranches, mockStaff } from "@/lib/data/mock-eer-data";
import type { StaffRole, Department } from "@/lib/types/eer";

const AddStaffPage = () => {
  const branches = mockBranches;
  const existingManagers = mockStaff.filter(s => 
    s.employment.role === 'station-manager' || s.employment.role === 'assistant-manager'
  );

  const staffRoles: { value: StaffRole; label: string; description: string }[] = [
    { value: 'station-manager', label: 'Station Manager', description: 'Overall branch management and operations' },
    { value: 'assistant-manager', label: 'Assistant Manager', description: 'Support station manager in daily operations' },
    { value: 'shift-supervisor', label: 'Shift Supervisor', description: 'Supervise staff during specific shifts' },
    { value: 'fuel-attendant', label: 'Fuel Attendant', description: 'Handle fuel dispensing and customer service' },
    { value: 'cashier', label: 'Cashier', description: 'Process payments and handle transactions' },
    { value: 'security-guard', label: 'Security Guard', description: 'Ensure safety and security of premises' },
    { value: 'maintenance-technician', label: 'Maintenance Technician', description: 'Equipment maintenance and repairs' },
    { value: 'customer-service', label: 'Customer Service', description: 'Handle customer inquiries and complaints' },
    { value: 'inventory-clerk', label: 'Inventory Clerk', description: 'Manage stock and inventory records' },
    { value: 'admin-officer', label: 'Admin Officer', description: 'Administrative support and documentation' }
  ];

  const departments: { value: Department; label: string }[] = [
    { value: 'management', label: 'Management' },
    { value: 'operations', label: 'Operations' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'security', label: 'Security' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'administration', label: 'Administration' },
    { value: 'finance', label: 'Finance' }
  ];

  const nigerianStates = [
    'Lagos State', 'FCT Abuja', 'Rivers State', 'Ogun State', 'Kano State',
    'Oyo State', 'Delta State', 'Kaduna State', 'Anambra State', 'Edo State',
    'Imo State', 'Akwa Ibom State', 'Osun State', 'Ondo State', 'Enugu State'
  ];

  const banks = [
    'First Bank Nigeria', 'GTBank', 'Access Bank', 'UBA', 'Zenith Bank',
    'Fidelity Bank', 'Union Bank', 'Sterling Bank', 'Stanbic IBTC', 'FCMB'
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/staff">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Staff
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Add New Staff Member
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new staff member profile with role assignment and branch allocation
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Basic personal details of the staff member
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName"
                  placeholder="e.g., Adebayo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName"
                  placeholder="e.g., Ogundimu"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="e.g., adebayo.ogundimu@totalenergies.ng"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input 
                  id="phoneNumber"
                  type="tel"
                  placeholder="e.g., +234-801-234-5678"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idCardNumber">National ID Number *</Label>
                <Input 
                  id="idCardNumber"
                  placeholder="e.g., A12345678"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
            <CardDescription>
              Residential address and emergency contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Textarea 
                id="street"
                placeholder="e.g., 25 Allen Avenue, Ikeja"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city"
                  placeholder="e.g., Lagos"
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
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(' ', '-')}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t pt-6 space-y-4">
              <h4 className="font-semibold">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <Input 
                    id="emergencyContactName"
                    placeholder="e.g., Folake Ogundimu"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
                  <Input 
                    id="emergencyContactPhone"
                    type="tel"
                    placeholder="e.g., +234-802-345-6789"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Employment Details
            </CardTitle>
            <CardDescription>
              Job role, department, and branch assignment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary (₦) *</Label>
                <Input 
                  id="salary"
                  type="number"
                  placeholder="e.g., 150000"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="branchId">Assigned Branch</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">No Branch Assignment</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name} - {branch.location.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supervisorId">Supervisor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supervisor (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Supervisor</SelectItem>
                    {existingManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.personalInfo.firstName} {manager.personalInfo.lastName} - {manager.employment.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Work Schedule
            </CardTitle>
            <CardDescription>
              Define working hours and shift patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shiftType">Shift Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning Shift</SelectItem>
                    <SelectItem value="afternoon">Afternoon Shift</SelectItem>
                    <SelectItem value="night">Night Shift</SelectItem>
                    <SelectItem value="rotating">Rotating Shifts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input 
                  id="startTime"
                  type="time"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input 
                  id="endTime"
                  type="time"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Working Days *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day.toLowerCase()} />
                    <Label htmlFor={day.toLowerCase()} className="text-sm">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Bank Account Details
            </CardTitle>
            <CardDescription>
              Salary payment and financial information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input 
                  id="accountNumber"
                  placeholder="e.g., 0123456789"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank.toLowerCase().replace(/\s+/g, '-')}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input 
                  id="accountName"
                  placeholder="e.g., Adebayo Ogundimu"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Permissions
            </CardTitle>
            <CardDescription>
              Define what the staff member can access in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="canManageBranch" />
                  <Label htmlFor="canManageBranch" className="text-sm">
                    Can Manage Branch Operations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="canViewReports" />
                  <Label htmlFor="canViewReports" className="text-sm">
                    Can View Reports & Analytics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="canManageStaff" />
                  <Label htmlFor="canManageStaff" className="text-sm">
                    Can Manage Staff
                  </Label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="canManageInventory" />
                  <Label htmlFor="canManageInventory" className="text-sm">
                    Can Manage Inventory
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="canProcessSales" />
                  <Label htmlFor="canProcessSales" className="text-sm">
                    Can Process Sales
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="canAccessFinancials" />
                  <Label htmlFor="canAccessFinancials" className="text-sm">
                    Can Access Financial Data
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/staff">Cancel</Link>
          </Button>
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit">
            Create Staff Member
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffPage;