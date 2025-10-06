// Types for EER Filling Station Dashboard

export interface FillingStation {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  owner: string;
  establishedDate: string;
  totalBranches: number;
  totalCapacity: number; // in liters
  monthlyRevenue: number;
  energyEfficiencyRating: 'A+' | 'A' | 'B' | 'C' | 'D';
}

export interface Branch {
  id: string;
  stationId: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'active' | 'maintenance' | 'inactive';
  manager: string;
  phoneNumber: string;
  openingHours: {
    open: string;
    close: string;
    is24Hours: boolean;
  };
  capacity: {
    petrol: number; // in liters
    diesel: number; // in liters
    electric: number; // number of charging stations
  };
  currentStock: {
    petrol: number;
    diesel: number;
  };
  pumps: {
    petrolPumps: number;
    dieselPumps: number;
    electricChargers: number;
  };
  monthlyMetrics: BranchMetrics;
  lastUpdated: string;
}

export interface BranchMetrics {
  energyConsumption: {
    electricity: number; // kWh
    fuel: number; // liters
    total: number; // kWh equivalent
  };
  sales: {
    petrol: {
      volume: number; // liters
      revenue: number; // currency
    };
    diesel: {
      volume: number;
      revenue: number;
    };
    electric: {
      sessions: number;
      energy: number; // kWh
      revenue: number;
    };
    totalRevenue: number;
  };
  efficiency: {
    energyPerLiter: number; // kWh per liter sold
    revenuePerKwh: number;
    wastage: number; // percentage
    rating: number; // 1-5 stars
  };
  customer: {
    totalVisits: number;
    averageTransactionValue: number;
    peakHours: string[];
  };
  environmental: {
    carbonFootprint: number; // kg CO2
    renewableEnergyUsage: number; // percentage
    wasteReduction: number; // percentage
  };
}

export interface EnergyReport {
  period: {
    start: string;
    end: string;
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  stationId: string;
  branchId?: string;
  consumption: {
    electricity: {
      lighting: number;
      pumps: number;
      airConditioning: number;
      charging: number;
      other: number;
      total: number;
    };
    fuel: number;
    totalEquivalent: number;
  };
  generation: {
    solar: number;
    wind: number;
    total: number;
  };
  efficiency: {
    overall: number;
    byCategory: {
      pumping: number;
      lighting: number;
      comfort: number;
      charging: number;
    };
  };
  cost: {
    electricity: number;
    fuel: number;
    maintenance: number;
    total: number;
  };
  savings: {
    renewable: number;
    efficiency: number;
    total: number;
  };
}

export interface DashboardStats {
  totalBranches: number;
  activeBranches: number;
  totalRevenue: number;
  totalEnergyConsumption: number;
  totalFuelSold: number;
  averageEfficiencyRating: number;
  monthlyGrowth: {
    revenue: number; // percentage
    efficiency: number; // percentage
    branches: number; // count
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'low_stock' | 'high_consumption' | 'maintenance' | 'efficiency' | 'revenue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  branchId?: string;
  branchName?: string;
  timestamp: string;
  resolved: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Form types
export interface AddBranchForm {
  name: string;
  address: string;
  city: string;
  state: string;
  manager: string;
  phoneNumber: string;
  isOpen24Hours: boolean;
  openTime?: string;
  closeTime?: string;
  petrolCapacity: number;
  dieselCapacity: number;
  electricChargers: number;
  petrolPumps: number;
  dieselPumps: number;
}

export interface UpdateBranchForm extends Partial<AddBranchForm> {
  id: string;
  status?: Branch['status'];
}

// Staff Management Types
export interface Staff {
  id: string;
  stationId: string;
  employeeId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: {
      street: string;
      city: string;
      state: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
  };
  employment: {
    role: StaffRole;
    department: Department;
    hireDate: string;
    employmentType: 'full-time' | 'part-time' | 'contract';
    salary: number;
    branchId?: string; // Optional, for branch assignment
    supervisorId?: string; // ID of their supervisor
    status: 'active' | 'inactive' | 'suspended' | 'terminated';
  };
  permissions: {
    canManageBranch: boolean;
    canViewReports: boolean;
    canManageStaff: boolean;
    canManageInventory: boolean;
    canProcessSales: boolean;
    canAccessFinancials: boolean;
  };
  performance: {
    rating: number; // 1-5 stars
    lastReviewDate: string;
    nextReviewDate: string;
    goals: string[];
    achievements: string[];
  };
  schedule: {
    shiftType: 'morning' | 'afternoon' | 'night' | 'rotating';
    workingDays: string[]; // ['monday', 'tuesday', etc.]
    startTime: string;
    endTime: string;
  };
  documents: {
    profilePhoto?: string;
    idCardNumber: string;
    bankAccountDetails: {
      accountNumber: string;
      bankName: string;
      accountName: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = 
  | 'station-manager' 
  | 'assistant-manager' 
  | 'shift-supervisor' 
  | 'fuel-attendant' 
  | 'cashier' 
  | 'security-guard' 
  | 'maintenance-technician' 
  | 'customer-service' 
  | 'inventory-clerk'
  | 'admin-officer';

export type Department = 
  | 'operations' 
  | 'management' 
  | 'maintenance' 
  | 'security' 
  | 'customer-service' 
  | 'administration' 
  | 'finance';

// Form types for staff
export interface AddStaffForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  role: StaffRole;
  department: Department;
  employmentType: 'full-time' | 'part-time' | 'contract';
  salary: number;
  branchId?: string;
  supervisorId?: string;
  shiftType: 'morning' | 'afternoon' | 'night' | 'rotating';
  workingDays: string[];
  startTime: string;
  endTime: string;
  idCardNumber: string;
  accountNumber: string;
  bankName: string;
  accountName: string;
}

export interface UpdateStaffForm extends Partial<AddStaffForm> {
  id: string;
  status?: Staff['employment']['status'];
}

export interface StaffAssignment {
  id: string;
  staffId: string;
  branchId: string;
  assignedDate: string;
  assignedBy: string; // Staff ID of who made the assignment
  isActive: boolean;
  role: StaffRole;
  notes?: string;
}