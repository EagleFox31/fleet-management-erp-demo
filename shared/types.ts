export type VehicleStatus = 'Available' | 'In workshop' | 'On mission';
export type WorkOrderStatus = 'Open' | 'In progress' | 'Waiting parts' | 'Done';

export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  status: VehicleStatus;
}

export interface WorkOrder {
  id: string;
  vehicleId: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: WorkOrderStatus;
  openedAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorderPoint: number;
  unit: string;
}

export interface Tire {
  id: string;
  serial: string;
  brand: string;
  size: string;
  vehicleId: string | null;
  position: string | null;
  treadDepthMm: number;
  status: 'Mounted' | 'In stock' | 'Inspect';
}

export interface DashboardSummary {
  vehicles: number;
  availableVehicles: number;
  openWorkOrders: number;
  lowStockItems: number;
  tiresToInspect: number;
}
