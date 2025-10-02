import { Company, Station, Branch, Staff, Product, Tank, TankInventory, CompanyWithStations, StationWithBranches, BranchWithRelations, TankWithProduct } from "./type";

// Mock Products
export const products: Product[] = [
  {
    product_id: "prod-1",
    product_name: "Petrol (PMS)",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01")
  },
  {
    product_id: "prod-2",
    product_name: "Diesel (AGO)",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01")
  },
  {
    product_id: "prod-3",
    product_name: "Kerosene (DPK)",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01")
  },
  {
    product_id: "prod-4",
    product_name: "Gas (LPG)",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01")
  }
];

// Mock Staff
export const staff: Staff[] = [
  // Victoria Island Branch Staff
  {
    staff_id: "staff-1",
    branch_id: "branch-1",
    full_name: "Adebayo Johnson",
    phone_number: "+234-801-234-5678",
    email: "adebayo.johnson@macrooil.com",
    role: "Manager",
    created_at: new Date("2018-06-15"),
    updated_at: new Date("2024-09-01")
  },
  {
    staff_id: "staff-2",
    branch_id: "branch-1",
    full_name: "Sarah Okafor",
    phone_number: "+234-802-345-6789",
    email: "sarah.okafor@macrooil.com",
    role: "Attendant",
    created_at: new Date("2019-01-20"),
    updated_at: new Date("2024-08-15")
  },
  // Lekki Phase 1 Branch Staff
  {
    staff_id: "staff-3",
    branch_id: "branch-2",
    full_name: "Michael Okechukwu",
    phone_number: "+234-803-456-7890",
    email: "michael.okechukwu@macrooil.com",
    role: "Manager",
    created_at: new Date("2019-03-25"),
    updated_at: new Date("2024-09-05")
  },
  {
    staff_id: "staff-4",
    branch_id: "branch-2",
    full_name: "Grace Eze",
    phone_number: "+234-804-567-8901",
    email: "grace.eze@macrooil.com",
    role: "Accountant",
    created_at: new Date("2019-05-10"),
    updated_at: new Date("2024-08-20")
  },
  // Ikeja GRA Branch Staff
  {
    staff_id: "staff-5",
    branch_id: "branch-3",
    full_name: "David Olumide",
    phone_number: "+234-805-678-9012",
    email: "david.olumide@macrooil.com",
    role: "Manager",
    created_at: new Date("2019-08-20"),
    updated_at: new Date("2024-09-10")
  },
  {
    staff_id: "staff-6",
    branch_id: "branch-3",
    full_name: "Fatima Abdullahi",
    phone_number: "+234-806-789-0123",
    email: "fatima.abdullahi@macrooil.com",
    role: "Supervisor",
    created_at: new Date("2020-01-15"),
    updated_at: new Date("2024-08-25")
  },
  // Abuja Central Branch Staff
  {
    staff_id: "staff-7",
    branch_id: "branch-4",
    full_name: "Ibrahim Musa",
    phone_number: "+234-807-890-1234",
    email: "ibrahim.musa@macrooil.com",
    role: "Manager",
    created_at: new Date("2020-02-20"),
    updated_at: new Date("2024-09-12")
  },
  {
    staff_id: "staff-8",
    branch_id: "branch-4",
    full_name: "Blessing Chukwu",
    phone_number: "+234-808-901-2345",
    email: "blessing.chukwu@macrooil.com",
    role: "Attendant",
    created_at: new Date("2020-06-01"),
    updated_at: new Date("2024-08-30")
  },
  // Gwarinpa Branch Staff
  {
    staff_id: "staff-9",
    branch_id: "branch-5",
    full_name: "Chiamaka Nwankwo",
    phone_number: "+234-809-012-3456",
    email: "chiamaka.nwankwo@macrooil.com",
    role: "Manager",
    created_at: new Date("2020-11-10"),
    updated_at: new Date("2024-09-15")
  },
  {
    staff_id: "staff-10",
    branch_id: "branch-5",
    full_name: "Yusuf Garba",
    phone_number: "+234-810-123-4567",
    email: "yusuf.garba@macrooil.com",
    role: "Security",
    created_at: new Date("2021-02-01"),
    updated_at: new Date("2024-08-28")
  },
  // Kano Branch Staff
  {
    staff_id: "staff-11",
    branch_id: "branch-6",
    full_name: "Aminu Bello",
    phone_number: "+234-811-234-5678",
    email: "aminu.bello@macrooil.com",
    role: "Manager",
    created_at: new Date("2021-08-15"),
    updated_at: new Date("2024-09-18")
  },
  {
    staff_id: "staff-12",
    branch_id: "branch-6",
    full_name: "Hadiza Muhammad",
    phone_number: "+234-812-345-6789",
    email: "hadiza.muhammad@macrooil.com",
    role: "Accountant",
    created_at: new Date("2021-09-20"),
    updated_at: new Date("2024-08-22")
  },
  // Port Harcourt Branch Staff
  {
    staff_id: "staff-13",
    branch_id: "branch-7",
    full_name: "Emeka Okonkwo",
    phone_number: "+234-813-456-7890",
    email: "emeka.okonkwo@macrooil.com",
    role: "Manager",
    created_at: new Date("2022-01-25"),
    updated_at: new Date("2024-09-20")
  },
  {
    staff_id: "staff-14",
    branch_id: "branch-7",
    full_name: "Precious Udo",
    phone_number: "+234-814-567-8901",
    email: "precious.udo@macrooil.com",
    role: "Attendant",
    created_at: new Date("2022-03-10"),
    updated_at: new Date("2024-08-18")
  },
  {
    staff_id: "staff-15",
    branch_id: "branch-7",
    full_name: "Godspower James",
    phone_number: "+234-815-678-9012",
    email: "godspower.james@macrooil.com",
    role: "Supervisor",
    created_at: new Date("2022-05-15"),
    updated_at: new Date("2024-09-02")
  }
];

// Mock Tank Inventories
export const tankInventories: TankInventory[] = [
  // Victoria Island Branch Inventories
  {
    inventory_id: "inv-001",
    tank_id: "tank-001",
    current_stock_litres: 38500,
    measured_at: new Date("2024-10-02T06:00:00"),
    recorded_by: "staff-1",
    notes: "Morning dip reading - Good stock level"
  },
  {
    inventory_id: "inv-002",
    tank_id: "tank-002",
    current_stock_litres: 28750,
    measured_at: new Date("2024-10-02T06:15:00"),
    recorded_by: "staff-1",
    notes: "Morning dip reading - Normal consumption"
  },
  {
    inventory_id: "inv-003",
    tank_id: "tank-003",
    current_stock_litres: 16200,
    measured_at: new Date("2024-10-02T06:30:00"),
    recorded_by: "staff-2",
    notes: "Morning dip reading - Steady demand"
  },
  
  // Lekki Phase 1 Branch Inventories
  {
    inventory_id: "inv-004",
    tank_id: "tank-004",
    current_stock_litres: 42800,
    measured_at: new Date("2024-10-02T07:00:00"),
    recorded_by: "staff-3",
    notes: "Morning reading - High demand area"
  },
  {
    inventory_id: "inv-005",
    tank_id: "tank-005",
    current_stock_litres: 45200,
    measured_at: new Date("2024-10-02T07:15:00"),
    recorded_by: "staff-3",
    notes: "Morning reading - Recently refilled"
  },
  {
    inventory_id: "inv-006",
    tank_id: "tank-006",
    current_stock_litres: 35600,
    measured_at: new Date("2024-10-02T07:30:00"),
    recorded_by: "staff-4",
    notes: "Morning reading - Good stock"
  },
  
  // Ikeja GRA Branch Inventories
  {
    inventory_id: "inv-007",
    tank_id: "tank-007",
    current_stock_litres: 26400,
    measured_at: new Date("2024-10-02T08:00:00"),
    recorded_by: "staff-5",
    notes: "Morning reading - Normal level"
  },
  {
    inventory_id: "inv-008",
    tank_id: "tank-008",
    current_stock_litres: 3750,
    measured_at: new Date("2024-10-02T08:15:00"),
    recorded_by: "staff-6",
    notes: "Morning reading - LOW STOCK ALERT - Needs immediate refill"
  },
  {
    inventory_id: "inv-009",
    tank_id: "tank-009",
    current_stock_litres: 12800,
    measured_at: new Date("2024-10-02T08:30:00"),
    recorded_by: "staff-5",
    notes: "Morning reading - Good LPG stock"
  },
  
  // Abuja Central Branch Inventories
  {
    inventory_id: "inv-010",
    tank_id: "tank-010",
    current_stock_litres: 52300,
    measured_at: new Date("2024-10-02T09:00:00"),
    recorded_by: "staff-7",
    notes: "Morning reading - Excellent stock level"
  },
  {
    inventory_id: "inv-011",
    tank_id: "tank-011",
    current_stock_litres: 38900,
    measured_at: new Date("2024-10-02T09:15:00"),
    recorded_by: "staff-8",
    notes: "Morning reading - Good diesel stock"
  },
  
  // Gwarinpa Branch Inventories
  {
    inventory_id: "inv-012",
    tank_id: "tank-012",
    current_stock_litres: 31200,
    measured_at: new Date("2024-10-02T09:30:00"),
    recorded_by: "staff-9",
    notes: "Morning reading - Steady consumption"
  },
  {
    inventory_id: "inv-013",
    tank_id: "tank-013",
    current_stock_litres: 5400,
    measured_at: new Date("2024-10-02T09:45:00"),
    recorded_by: "staff-10",
    notes: "Morning reading - LOW STOCK - Schedule delivery"
  },
  
  // Kano Branch Inventories
  {
    inventory_id: "inv-014",
    tank_id: "tank-014",
    current_stock_litres: 36800,
    measured_at: new Date("2024-10-02T10:00:00"),
    recorded_by: "staff-11",
    notes: "Morning reading - Good stock level"
  },
  {
    inventory_id: "inv-015",
    tank_id: "tank-015",
    current_stock_litres: 29500,
    measured_at: new Date("2024-10-02T10:15:00"),
    recorded_by: "staff-12",
    notes: "Morning reading - Normal consumption pattern"
  },
  {
    inventory_id: "inv-016",
    tank_id: "tank-016",
    current_stock_litres: 17800,
    measured_at: new Date("2024-10-02T10:30:00"),
    recorded_by: "staff-11",
    notes: "Morning reading - Kerosene demand steady"
  },
  
  // Port Harcourt Branch Inventories
  {
    inventory_id: "inv-017",
    tank_id: "tank-017",
    current_stock_litres: 48200,
    measured_at: new Date("2024-10-02T11:00:00"),
    recorded_by: "staff-13",
    notes: "Morning reading - High traffic location"
  },
  {
    inventory_id: "inv-018",
    tank_id: "tank-018",
    current_stock_litres: 44700,
    measured_at: new Date("2024-10-02T11:15:00"),
    recorded_by: "staff-14",
    notes: "Morning reading - Good diesel stock"
  },
  {
    inventory_id: "inv-019",
    tank_id: "tank-019",
    current_stock_litres: 21500,
    measured_at: new Date("2024-10-02T11:30:00"),
    recorded_by: "staff-15",
    notes: "Morning reading - LPG demand increasing"
  }
];

// Mock Tanks
export const tanks: Tank[] = [
  // Victoria Island Branch Tanks
  {
    tank_id: "tank-001",
    branch_id: "branch-1",
    product_id: "prod-1",
    capacity_litres: 45000,
    tank_name: "VI-PMS-Tank-A",
    created_at: new Date("2018-06-01"),
    updated_at: new Date("2024-09-15")
  },
  {
    tank_id: "tank-002",
    branch_id: "branch-1",
    product_id: "prod-2",
    capacity_litres: 35000,
    tank_name: "VI-AGO-Tank-A",
    created_at: new Date("2018-06-01"),
    updated_at: new Date("2024-09-15")
  },
  {
    tank_id: "tank-003",
    branch_id: "branch-1",
    product_id: "prod-3",
    capacity_litres: 20000,
    tank_name: "VI-DPK-Tank-A",
    created_at: new Date("2018-06-01"),
    updated_at: new Date("2024-09-15")
  },
  // Lekki Phase 1 Branch Tanks
  {
    tank_id: "tank-004",
    branch_id: "branch-2",
    product_id: "prod-1",
    capacity_litres: 50000,
    tank_name: "LK1-PMS-Tank-A",
    created_at: new Date("2019-03-20"),
    updated_at: new Date("2024-09-18")
  },
  {
    tank_id: "tank-005",
    branch_id: "branch-2",
    product_id: "prod-1",
    capacity_litres: 50000,
    tank_name: "LK1-PMS-Tank-B",
    created_at: new Date("2019-03-20"),
    updated_at: new Date("2024-09-18")
  },
  {
    tank_id: "tank-006",
    branch_id: "branch-2",
    product_id: "prod-2",
    capacity_litres: 40000,
    tank_name: "LK1-AGO-Tank-A",
    created_at: new Date("2019-03-20"),
    updated_at: new Date("2024-09-18")
  },
  // Ikeja GRA Branch Tanks
  {
    tank_id: "tank-007",
    branch_id: "branch-3",
    product_id: "prod-1",
    capacity_litres: 30000,
    tank_name: "IK-PMS-Tank-A",
    created_at: new Date("2019-08-15"),
    updated_at: new Date("2024-09-20")
  },
  {
    tank_id: "tank-008",
    branch_id: "branch-3",
    product_id: "prod-2",
    capacity_litres: 25000,
    tank_name: "IK-AGO-Tank-A",
    created_at: new Date("2019-08-15"),
    updated_at: new Date("2024-09-20")
  },
  {
    tank_id: "tank-009",
    branch_id: "branch-3",
    product_id: "prod-4",
    capacity_litres: 15000,
    tank_name: "IK-LPG-Tank-A",
    created_at: new Date("2020-01-10"),
    updated_at: new Date("2024-09-20")
  },
  // Abuja Central Branch Tanks
  {
    tank_id: "tank-010",
    branch_id: "branch-4",
    product_id: "prod-1",
    capacity_litres: 60000,
    tank_name: "ABJ-PMS-Tank-A",
    created_at: new Date("2020-02-15"),
    updated_at: new Date("2024-09-22")
  },
  {
    tank_id: "tank-011",
    branch_id: "branch-4",
    product_id: "prod-2",
    capacity_litres: 45000,
    tank_name: "ABJ-AGO-Tank-A",
    created_at: new Date("2020-02-15"),
    updated_at: new Date("2024-09-22")
  },
  // Gwarinpa Branch Tanks
  {
    tank_id: "tank-012",
    branch_id: "branch-5",
    product_id: "prod-1",
    capacity_litres: 35000,
    tank_name: "GWA-PMS-Tank-A",
    created_at: new Date("2020-11-05"),
    updated_at: new Date("2024-09-25")
  },
  {
    tank_id: "tank-013",
    branch_id: "branch-5",
    product_id: "prod-2",
    capacity_litres: 30000,
    tank_name: "GWA-AGO-Tank-A",
    created_at: new Date("2020-11-05"),
    updated_at: new Date("2024-09-25")
  },
  // Kano Branch Tanks
  {
    tank_id: "tank-014",
    branch_id: "branch-6",
    product_id: "prod-1",
    capacity_litres: 40000,
    tank_name: "KN-PMS-Tank-A",
    created_at: new Date("2021-08-10"),
    updated_at: new Date("2024-09-28")
  },
  {
    tank_id: "tank-015",
    branch_id: "branch-6",
    product_id: "prod-2",
    capacity_litres: 35000,
    tank_name: "KN-AGO-Tank-A",
    created_at: new Date("2021-08-10"),
    updated_at: new Date("2024-09-28")
  },
  {
    tank_id: "tank-016",
    branch_id: "branch-6",
    product_id: "prod-3",
    capacity_litres: 20000,
    tank_name: "KN-DPK-Tank-A",
    created_at: new Date("2021-08-10"),
    updated_at: new Date("2024-09-28")
  },
  // Port Harcourt Branch Tanks
  {
    tank_id: "tank-017",
    branch_id: "branch-7",
    product_id: "prod-1",
    capacity_litres: 55000,
    tank_name: "PH-PMS-Tank-A",
    created_at: new Date("2022-01-20"),
    updated_at: new Date("2024-09-30")
  },
  {
    tank_id: "tank-018",
    branch_id: "branch-7",
    product_id: "prod-2",
    capacity_litres: 50000,
    tank_name: "PH-AGO-Tank-A",
    created_at: new Date("2022-01-20"),
    updated_at: new Date("2024-09-30")
  },
  {
    tank_id: "tank-019",
    branch_id: "branch-7",
    product_id: "prod-4",
    capacity_litres: 25000,
    tank_name: "PH-LPG-Tank-A",
    created_at: new Date("2022-01-20"),
    updated_at: new Date("2024-09-30")
  }
];

// Mock Branches
export const branches: Branch[] = [
  {
    branch_id: "branch-1",
    station_id: "station-1",
    branch_name: "MACROOIL Victoria Island",
    lga: "Victoria Island",
    physical_address: "Plot 1234, Tiamiyu Savage Street, Victoria Island, Lagos State",
    manager_id: "staff-1",
    created_at: new Date("2018-06-01"),
    updated_at: new Date("2024-09-15")
  },
  {
    branch_id: "branch-2",
    station_id: "station-1",
    branch_name: "MACROOIL Lekki Phase 1",
    lga: "Lekki",
    physical_address: "KM 25, Lekki-Epe Expressway, Lekki Phase 1, Lagos State",
    manager_id: "staff-3",
    created_at: new Date("2019-03-20"),
    updated_at: new Date("2024-09-18")
  },
  {
    branch_id: "branch-3",
    station_id: "station-1",
    branch_name: "MACROOIL Ikeja GRA",
    lga: "Ikeja",
    physical_address: "12A, Mobolaji Bank Anthony Way, Ikeja GRA, Lagos State",
    manager_id: "staff-5",
    created_at: new Date("2019-08-15"),
    updated_at: new Date("2024-09-20")
  },
  {
    branch_id: "branch-4",
    station_id: "station-1",
    branch_name: "MACROOIL Garki Branch",
    lga: "Municipal Area Council",
    physical_address: "Plot 456 Central Area, Garki, Abuja",
    manager_id: "staff-7",
    created_at: new Date("2020-02-15"),
    updated_at: new Date("2024-09-22")
  },
  {
    branch_id: "branch-5",
    station_id: "station-1",
    branch_name: "MACROOIL Wuse Branch",
    lga: "Municipal Area Council",
    physical_address: "1st Avenue, Gwarinpa Estate, Federal Capital Territory, Abuja",
    manager_id: "staff-9",
    created_at: new Date("2020-11-05"),
    updated_at: new Date("2024-09-25")
  },
  {
    branch_id: "branch-6",
    station_id: "station-1",
    branch_name: "MACROOIL Kano Branch",
    lga: "Kano Municipal",
    physical_address: "Independence Road, Fagge, Kano State",
    manager_id: "staff-11",
    created_at: new Date("2021-08-10"),
    updated_at: new Date("2024-09-28")
  },
  {
    branch_id: "branch-7",
    station_id: "station-1",
    branch_name: "MACROOIL Port Harcourt Branch",
    lga: "Port Harcourt",
    physical_address: "Aba Road, Port Harcourt, Rivers State",
    manager_id: "staff-13",
    created_at: new Date("2022-01-20"),
    updated_at: new Date("2024-09-30")
  }
];

// Mock Stations - Single Station with Multiple Branches
export const stations: Station[] = [
  {
    station_id: "station-1",
    company_id: "company-1",
    station_name: "MACROOIL NIGERIA",
    station_code: "MCR-NIG-001",
    created_at: new Date("2018-06-01"),
    updated_at: new Date("2024-09-15")
  }
];

// Mock Company
export const companies: Company[] = [
  {
    company_id: "company-1",
    company_name: "MACROOIL PETROLEUM LIMITED",
    ceo_user_id: "ceo-1",
    created_at: new Date("2018-03-15"),
    updated_at: new Date("2024-10-01")
  }
];

// Helper functions to get related data
export const getTankWithProduct = (tankId: string): TankWithProduct | undefined => {
  const tank = tanks.find(t => t.tank_id === tankId);
  if (!tank) return undefined;
  
  const product = products.find(p => p.product_id === tank.product_id);
  const latestInventory = tankInventories
    .filter(inv => inv.tank_id === tankId)
    .sort((a, b) => b.measured_at.getTime() - a.measured_at.getTime())[0];
  
  return {
    ...tank,
    product: product!,
    latest_inventory: latestInventory
  };
};

export const getBranchWithRelations = (branchId: string): BranchWithRelations | undefined => {
  const branch = branches.find(b => b.branch_id === branchId);
  if (!branch) return undefined;
  
  const manager = staff.find(s => s.staff_id === branch.manager_id);
  const branchStaff = staff.filter(s => s.branch_id === branchId);
  const branchTanks = tanks.filter(t => t.branch_id === branchId).map(tank => getTankWithProduct(tank.tank_id)!);
  
  return {
    ...branch,
    manager,
    staff: branchStaff,
    tanks: branchTanks
  };
};

export const getStationWithBranches = (stationId: string): StationWithBranches | undefined => {
  const station = stations.find(s => s.station_id === stationId);
  if (!station) return undefined;
  
  const stationBranches = branches
    .filter(b => b.station_id === stationId)
    .map(branch => getBranchWithRelations(branch.branch_id)!);
  
  return {
    ...station,
    branches: stationBranches
  };
};

export const getCompanyWithStations = (companyId: string): CompanyWithStations | undefined => {
  const company = companies.find(c => c.company_id === companyId);
  if (!company) return undefined;
  
  const companyStations = stations
    .filter(s => s.company_id === companyId)
    .map(station => getStationWithBranches(station.station_id)!);
  
  return {
    ...company,
    stations: companyStations
  };
};

// Get all data for the main company
export const getMainCompanyData = (): CompanyWithStations => {
  return getCompanyWithStations("company-1")!;
};

// Statistics helpers
export const getTotalTanks = (): number => tanks.length;
export const getTotalBranches = (): number => branches.length;
export const getTotalStaff = (): number => staff.length;
export const getLowStockTanks = (threshold: number = 0.2): TankWithProduct[] => {
  return tanks
    .map(tank => getTankWithProduct(tank.tank_id)!)
    .filter(tank => {
      const stockPercentage = tank.latest_inventory 
        ? tank.latest_inventory.current_stock_litres / tank.capacity_litres 
        : 0;
      return stockPercentage < threshold;
    });
};