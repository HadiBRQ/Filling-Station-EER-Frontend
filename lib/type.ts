export type color = "default" | "primary" | "secondary" | "success" | "info" | "warning" | "destructive"
export type InputColor = "default" | "primary" | "secondary" | "success" | "info" | "warning" | "destructive"
export type shadow = "sm" | "md" | "lg" | "xl"
export type size = "default" | "sm" | "md" | "lg"
export type rounded = "sm" | "md" | "lg" | "full"
export type radius = "sm" | "md" | "lg" | "xl" | "none"


// config 
export type layoutType = "vertical" | "horizontal" | "semi-box" | "compact";
export type contentType = "wide" | "boxed";
export type skinType = "default" | "bordered";
export type sidebarType = 'classic' | 'draggable' | 'two-column' | 'compact'
export type navBarType = 'floating' | 'sticky' | 'hidden' | 'default'
export type headerColorType = 'default' | 'coloured' | 'transparent'

// Filling Station Types
export interface Company {
  company_id: string;
  company_name: string;
  ceo_user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Station {
  station_id: string;
  company_id: string;
  station_name: string;
  station_code: string;
  created_at: Date;
  updated_at: Date;
}

export interface Branch {
  branch_id: string;
  station_id: string;
  branch_name: string;
  lga: string;
  physical_address: string;
  manager_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Staff {
  staff_id: string;
  branch_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: 'Manager' | 'Attendant' | 'Accountant' | 'Security' | 'Supervisor';
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  product_id: string;
  product_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tank {
  tank_id: string;
  branch_id: string;
  product_id: string;
  capacity_litres: number;
  tank_name?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TankInventory {
  inventory_id: string;
  tank_id: string;
  current_stock_litres: number;
  measured_at: Date;
  recorded_by?: string;
  notes?: string;
}

// Extended types for UI components
export interface BranchWithRelations extends Branch {
  manager?: Staff;
  tanks?: TankWithProduct[];
  staff?: Staff[];
}

export interface TankWithProduct extends Tank {
  product: Product;
  latest_inventory?: TankInventory;
}

export interface StationWithBranches extends Station {
  branches?: BranchWithRelations[];
}

export interface CompanyWithStations extends Company {
  stations?: StationWithBranches[];
}
