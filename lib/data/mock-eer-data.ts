// Mock data for EER Filling Station Dashboard
import { FillingStation, Branch, DashboardStats, Alert, EnergyReport, Staff } from '../types/eer';

export const mockFillingStation: FillingStation = {
  id: 'station-001',
  name: 'Total Energies Nigeria',
  location: {
    address: 'Plot 1, Tafawa Balewa Square',
    city: 'Lagos',
    state: 'Lagos State',
    coordinates: {
      lat: 6.4541,
      lng: 3.3947
    }
  },
  owner: 'Total Energies Marketing Nigeria Plc',
  establishedDate: '1956-10-01',
  totalBranches: 12,
  totalCapacity: 150000, // liters
  monthlyRevenue: 2850000,
  energyEfficiencyRating: 'A+'
};

export const mockBranches: Branch[] = [
  {
    id: 'branch-001',
    stationId: 'station-001',
    name: 'Total Victoria Island',
    location: {
      address: '15 Ahmadu Bello Way, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4281, lng: 3.4219 }
    },
    status: 'active',
    manager: 'Adebayo Ogundimu',
    phoneNumber: '+234-801-234-5678',
    openingHours: {
      open: '06:00',
      close: '22:00',
      is24Hours: false
    },
    capacity: {
      petrol: 15000,
      diesel: 12000,
      electric: 8
    },
    currentStock: {
      petrol: 12500,
      diesel: 9800
    },
    pumps: {
      petrolPumps: 6,
      dieselPumps: 4,
      electricChargers: 8
    },
    monthlyMetrics: {
      energyConsumption: {
        electricity: 15420,
        fuel: 25000,
        total: 40420
      },
      sales: {
        petrol: {
          volume: 45000,
          revenue: 157500
        },
        diesel: {
          volume: 32000,
          revenue: 128000
        },
        electric: {
          sessions: 1250,
          energy: 3750,
          revenue: 18750
        },
        totalRevenue: 304250
      },
      efficiency: {
        energyPerLiter: 0.34,
        revenuePerKwh: 7.53,
        wastage: 2.1,
        rating: 4.7
      },
      customer: {
        totalVisits: 8750,
        averageTransactionValue: 34.77,
        peakHours: ['07:00-09:00', '17:00-19:00']
      },
      environmental: {
        carbonFootprint: 12500,
        renewableEnergyUsage: 25,
        wasteReduction: 15
      }
    },
    lastUpdated: '2024-10-02T10:30:00Z'
  },
  {
    id: 'branch-002',
    stationId: 'station-001',
    name: 'Total Lekki-Epe Expressway',
    location: {
      address: 'KM 25, Lekki-Epe Expressway, Ajah',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4698, lng: 3.5852 }
    },
    status: 'active',
    manager: 'Chioma Okwu',
    phoneNumber: '+234-802-345-6789',
    openingHours: {
      open: '00:00',
      close: '23:59',
      is24Hours: true
    },
    capacity: {
      petrol: 20000,
      diesel: 18000,
      electric: 12
    },
    currentStock: {
      petrol: 16800,
      diesel: 14200
    },
    pumps: {
      petrolPumps: 8,
      dieselPumps: 6,
      electricChargers: 12
    },
    monthlyMetrics: {
      energyConsumption: {
        electricity: 22150,
        fuel: 38000,
        total: 60150
      },
      sales: {
        petrol: {
          volume: 68000,
          revenue: 238000
        },
        diesel: {
          volume: 52000,
          revenue: 208000
        },
        electric: {
          sessions: 2100,
          energy: 6300,
          revenue: 31500
        },
        totalRevenue: 477500
      },
      efficiency: {
        energyPerLiter: 0.28,
        revenuePerKwh: 7.94,
        wastage: 1.8,
        rating: 4.9
      },
      customer: {
        totalVisits: 12400,
        averageTransactionValue: 38.51,
        peakHours: ['06:00-08:00', '12:00-14:00', '18:00-20:00']
      },
      environmental: {
        carbonFootprint: 18200,
        renewableEnergyUsage: 30,
        wasteReduction: 20
      }
    },
    lastUpdated: '2024-10-02T10:45:00Z'
  },
  {
    id: 'branch-003',
    stationId: 'station-001',
    name: 'Total Ikeja GRA',
    location: {
      address: '45 Obafemi Awolowo Way, Ikeja GRA',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.5833, lng: 3.3583 }
    },
    status: 'maintenance',
    manager: 'Emeka Nwankwo',
    phoneNumber: '+234-803-456-7890',
    openingHours: {
      open: '06:00',
      close: '21:00',
      is24Hours: false
    },
    capacity: {
      petrol: 12000,
      diesel: 10000,
      electric: 6
    },
    currentStock: {
      petrol: 8500,
      diesel: 6200
    },
    pumps: {
      petrolPumps: 5,
      dieselPumps: 3,
      electricChargers: 6
    },
    monthlyMetrics: {
      energyConsumption: {
        electricity: 11200,
        fuel: 18500,
        total: 29700
      },
      sales: {
        petrol: {
          volume: 28000,
          revenue: 98000
        },
        diesel: {
          volume: 20000,
          revenue: 80000
        },
        electric: {
          sessions: 680,
          energy: 2040,
          revenue: 10200
        },
        totalRevenue: 188200
      },
      efficiency: {
        energyPerLiter: 0.38,
        revenuePerKwh: 6.34,
        wastage: 3.2,
        rating: 4.2
      },
      customer: {
        totalVisits: 5200,
        averageTransactionValue: 36.19,
        peakHours: ['08:00-10:00', '16:00-18:00']
      },
      environmental: {
        carbonFootprint: 9800,
        renewableEnergyUsage: 15,
        wasteReduction: 10
      }
    },
    lastUpdated: '2024-10-02T09:15:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalBranches: 12,
  activeBranches: 11,
  totalRevenue: 2850000,
  totalEnergyConsumption: 485200,
  totalFuelSold: 1250000,
  averageEfficiencyRating: 4.6,
  monthlyGrowth: {
    revenue: 12.5,
    efficiency: 8.2,
    branches: 2
  },
  alerts: [
    {
      id: 'alert-001',
      type: 'low_stock',
      severity: 'medium',
      title: 'Low Diesel Stock',
      message: 'Suburban Center branch diesel level below 70%',
      branchId: 'branch-003',
      branchName: 'Suburban Center',
      timestamp: '2024-10-02T08:30:00Z',
      resolved: false
    },
    {
      id: 'alert-002',
      type: 'maintenance',
      severity: 'high',
      title: 'Scheduled Maintenance',
      message: 'Suburban Center undergoing pump maintenance',
      branchId: 'branch-003',
      branchName: 'Suburban Center',
      timestamp: '2024-10-01T14:00:00Z',
      resolved: false
    },
    {
      id: 'alert-003',
      type: 'efficiency',
      severity: 'low',
      title: 'Efficiency Improvement',
      message: 'Downtown Hub efficiency increased by 5%',
      branchId: 'branch-001',
      branchName: 'Downtown Hub',
      timestamp: '2024-10-01T10:15:00Z',
      resolved: true
    }
  ]
};

export const mockEnergyReport: EnergyReport = {
  period: {
    start: '2024-09-01',
    end: '2024-09-30',
    type: 'monthly'
  },
  stationId: 'station-001',
  consumption: {
    electricity: {
      lighting: 12500,
      pumps: 35000,
      airConditioning: 18000,
      charging: 15000,
      other: 8500,
      total: 89000
    },
    fuel: 125000,
    totalEquivalent: 214000
  },
  generation: {
    solar: 15000,
    wind: 3000,
    total: 18000
  },
  efficiency: {
    overall: 78.5,
    byCategory: {
      pumping: 85.2,
      lighting: 72.1,
      comfort: 68.9,
      charging: 92.4
    }
  },
  cost: {
    electricity: 8900,
    fuel: 3750,
    maintenance: 2100,
    total: 14750
  },
  savings: {
    renewable: 1800,
    efficiency: 1250,
    total: 3050
  }
};

// Chart data
export const energyConsumptionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Electricity (kWh)',
      data: [85000, 88000, 92000, 89000, 94000, 96000, 98000, 95000, 89000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2
    },
    {
      label: 'Fuel Equivalent (kWh)',
      data: [120000, 125000, 118000, 132000, 128000, 135000, 142000, 138000, 125000],
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 2
    }
  ]
};

export const revenueByBranchData = {
  labels: mockBranches.map(branch => branch.name),
  datasets: [
    {
      label: 'Monthly Revenue (₦)',
      data: mockBranches.map(branch => branch.monthlyMetrics.sales.totalRevenue),
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 101, 101, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(16, 185, 129)',
        'rgb(245, 101, 101)',
        'rgb(251, 191, 36)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 1
    }
  ]
};

export const efficiencyTrendData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Energy Efficiency (%)',
      data: [76.2, 78.1, 77.8, 78.5],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
      tension: 0.4
    }
  ]
};

// Mock Staff Data
export const mockStaff: Staff[] = [
  {
    id: 'staff-001',
    stationId: 'station-001',
    employeeId: 'TEN-001',
    personalInfo: {
      firstName: 'Adebayo',
      lastName: 'Ogundimu',
      email: 'adebayo.ogundimu@totalenergies.ng',
      phoneNumber: '+234-801-234-5678',
      dateOfBirth: '1985-03-15',
      address: {
        street: '25 Allen Avenue, Ikeja',
        city: 'Lagos',
        state: 'Lagos State'
      },
      emergencyContact: {
        name: 'Folake Ogundimu',
        relationship: 'Spouse',
        phoneNumber: '+234-802-345-6789'
      }
    },
    employment: {
      role: 'station-manager',
      department: 'management',
      hireDate: '2019-01-15',
      employmentType: 'full-time',
      salary: 250000,
      branchId: 'branch-001',
      status: 'active'
    },
    permissions: {
      canManageBranch: true,
      canViewReports: true,
      canManageStaff: true,
      canManageInventory: true,
      canProcessSales: true,
      canAccessFinancials: true
    },
    performance: {
      rating: 4.8,
      lastReviewDate: '2024-08-15',
      nextReviewDate: '2025-02-15',
      goals: ['Increase branch efficiency by 10%', 'Reduce operational costs', 'Implement new POS system'],
      achievements: ['Best Manager Q2 2024', 'Zero safety incidents', 'Customer satisfaction 95%']
    },
    schedule: {
      shiftType: 'morning',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      startTime: '07:00',
      endTime: '19:00'
    },
    documents: {
      idCardNumber: 'A12345678',
      bankAccountDetails: {
        accountNumber: '0123456789',
        bankName: 'First Bank Nigeria',
        accountName: 'Adebayo Ogundimu'
      }
    },
    createdAt: '2019-01-15T08:00:00Z',
    updatedAt: '2024-09-15T10:30:00Z'
  },
  {
    id: 'staff-002',
    stationId: 'station-001',
    employeeId: 'TEN-002',
    personalInfo: {
      firstName: 'Chioma',
      lastName: 'Okwu',
      email: 'chioma.okwu@totalenergies.ng',
      phoneNumber: '+234-802-345-6789',
      dateOfBirth: '1990-07-22',
      address: {
        street: '12 Lekki Phase 1, Lekki',
        city: 'Lagos',
        state: 'Lagos State'
      },
      emergencyContact: {
        name: 'Chukwudi Okwu',
        relationship: 'Brother',
        phoneNumber: '+234-803-456-7890'
      }
    },
    employment: {
      role: 'station-manager',
      department: 'management',
      hireDate: '2020-03-10',
      employmentType: 'full-time',
      salary: 240000,
      branchId: 'branch-002',
      status: 'active'
    },
    permissions: {
      canManageBranch: true,
      canViewReports: true,
      canManageStaff: true,
      canManageInventory: true,
      canProcessSales: true,
      canAccessFinancials: true
    },
    performance: {
      rating: 4.9,
      lastReviewDate: '2024-07-20',
      nextReviewDate: '2025-01-20',
      goals: ['Digital transformation', 'Staff development program', 'Environmental compliance'],
      achievements: ['Highest revenue Q3 2024', 'Staff retention 98%', 'Green certification']
    },
    schedule: {
      shiftType: 'rotating',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      startTime: '06:00',
      endTime: '18:00'
    },
    documents: {
      idCardNumber: 'B98765432',
      bankAccountDetails: {
        accountNumber: '9876543210',
        bankName: 'GTBank',
        accountName: 'Chioma Okwu'
      }
    },
    createdAt: '2020-03-10T09:00:00Z',
    updatedAt: '2024-09-10T14:15:00Z'
  },
  {
    id: 'staff-003',
    stationId: 'station-001',
    employeeId: 'TEN-003',
    personalInfo: {
      firstName: 'Emeka',
      lastName: 'Nwankwo',
      email: 'emeka.nwankwo@totalenergies.ng',
      phoneNumber: '+234-803-456-7890',
      dateOfBirth: '1987-11-08',
      address: {
        street: '8 GRA Phase 2, Ikeja',
        city: 'Lagos',
        state: 'Lagos State'
      },
      emergencyContact: {
        name: 'Ngozi Nwankwo',
        relationship: 'Wife',
        phoneNumber: '+234-804-567-8901'
      }
    },
    employment: {
      role: 'assistant-manager',
      department: 'management',
      hireDate: '2021-06-01',
      employmentType: 'full-time',
      salary: 180000,
      branchId: 'branch-003',
      supervisorId: 'staff-001',
      status: 'active'
    },
    permissions: {
      canManageBranch: true,
      canViewReports: true,
      canManageStaff: false,
      canManageInventory: true,
      canProcessSales: true,
      canAccessFinancials: false
    },
    performance: {
      rating: 4.5,
      lastReviewDate: '2024-06-01',
      nextReviewDate: '2024-12-01',
      goals: ['Complete management training', 'Improve inventory turnover', 'Customer service excellence'],
      achievements: ['Promoted from shift supervisor', 'Inventory accuracy 99%', 'Staff trainer certification']
    },
    schedule: {
      shiftType: 'afternoon',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'sunday'],
      startTime: '12:00',
      endTime: '22:00'
    },
    documents: {
      idCardNumber: 'C11223344',
      bankAccountDetails: {
        accountNumber: '1122334455',
        bankName: 'Access Bank',
        accountName: 'Emeka Nwankwo'
      }
    },
    createdAt: '2021-06-01T10:00:00Z',
    updatedAt: '2024-08-20T11:45:00Z'
  },
  {
    id: 'staff-004',
    stationId: 'station-001',
    employeeId: 'TEN-004',
    personalInfo: {
      firstName: 'Fatima',
      lastName: 'Aliyu',
      email: 'fatima.aliyu@totalenergies.ng',
      phoneNumber: '+234-805-678-9012',
      dateOfBirth: '1995-02-14',
      address: {
        street: '15 Surulere Street, Surulere',
        city: 'Lagos',
        state: 'Lagos State'
      },
      emergencyContact: {
        name: 'Ibrahim Aliyu',
        relationship: 'Father',
        phoneNumber: '+234-806-789-0123'
      }
    },
    employment: {
      role: 'shift-supervisor',
      department: 'operations',
      hireDate: '2022-09-12',
      employmentType: 'full-time',
      salary: 150000,
      branchId: 'branch-001',
      supervisorId: 'staff-001',
      status: 'active'
    },
    permissions: {
      canManageBranch: false,
      canViewReports: true,
      canManageStaff: false,
      canManageInventory: true,
      canProcessSales: true,
      canAccessFinancials: false
    },
    performance: {
      rating: 4.3,
      lastReviewDate: '2024-05-12',
      nextReviewDate: '2024-11-12',
      goals: ['Leadership development', 'Fuel quality management', 'Safety compliance'],
      achievements: ['Employee of the month June 2024', 'Safety champion', 'Customer service award']
    },
    schedule: {
      shiftType: 'night',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '22:00',
      endTime: '06:00'
    },
    documents: {
      idCardNumber: 'D55667788',
      bankAccountDetails: {
        accountNumber: '5566778899',
        bankName: 'UBA',
        accountName: 'Fatima Aliyu'
      }
    },
    createdAt: '2022-09-12T08:30:00Z',
    updatedAt: '2024-09-01T15:20:00Z'
  },
  {
    id: 'staff-005',
    stationId: 'station-001',
    employeeId: 'TEN-005',
    personalInfo: {
      firstName: 'Olumide',
      lastName: 'Johnson',
      email: 'olumide.johnson@totalenergies.ng',
      phoneNumber: '+234-807-890-1234',
      dateOfBirth: '1993-12-03',
      address: {
        street: '22 Maryland Estate, Maryland',
        city: 'Lagos',
        state: 'Lagos State'
      },
      emergencyContact: {
        name: 'Bukola Johnson',
        relationship: 'Sister',
        phoneNumber: '+234-808-901-2345'
      }
    },
    employment: {
      role: 'fuel-attendant',
      department: 'operations',
      hireDate: '2023-01-20',
      employmentType: 'full-time',
      salary: 120000,
      branchId: 'branch-002',
      supervisorId: 'staff-002',
      status: 'active'
    },
    permissions: {
      canManageBranch: false,
      canViewReports: false,
      canManageStaff: false,
      canManageInventory: false,
      canProcessSales: true,
      canAccessFinancials: false
    },
    performance: {
      rating: 4.1,
      lastReviewDate: '2024-04-20',
      nextReviewDate: '2024-10-20',
      goals: ['Customer service improvement', 'Fuel handling certification', 'Sales target achievement'],
      achievements: ['Quick service award', 'Zero spillage record', 'Customer feedback 4.8/5']
    },
    schedule: {
      shiftType: 'morning',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      startTime: '06:00',
      endTime: '14:00'
    },
    documents: {
      idCardNumber: 'E99887766',
      bankAccountDetails: {
        accountNumber: '9988776655',
        bankName: 'Zenith Bank',
        accountName: 'Olumide Johnson'
      }
    },
    createdAt: '2023-01-20T07:45:00Z',
    updatedAt: '2024-08-15T09:10:00Z'
  }
];