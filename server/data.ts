import type { InventoryItem, Tire, Vehicle, WorkOrder, WorkOrderStatus } from '../shared/types.js';

export const vehicles: Vehicle[] = [
  { id: 'veh-001', registration: 'LT-241-AA', make: 'Toyota', model: 'Hilux', year: 2021, mileageKm: 68420, status: 'Available' },
  { id: 'veh-002', registration: 'LT-318-BB', make: 'Mitsubishi', model: 'Fuso Canter', year: 2020, mileageKm: 112760, status: 'In workshop' },
  { id: 'veh-003', registration: 'LT-509-CC', make: 'Isuzu', model: 'NPR', year: 2022, mileageKm: 54130, status: 'On mission' },
  { id: 'veh-004', registration: 'LT-672-DD', make: 'Toyota', model: 'Land Cruiser', year: 2019, mileageKm: 93480, status: 'Available' }
];

export const workOrders: WorkOrder[] = [
  { id: 'wo-1001', vehicleId: 'veh-002', title: 'Front brake inspection', priority: 'High', status: 'In progress', openedAt: '2026-09-12' },
  { id: 'wo-1002', vehicleId: 'veh-004', title: 'Preventive service — 90,000 km', priority: 'Medium', status: 'Open', openedAt: '2026-09-14' },
  { id: 'wo-1003', vehicleId: 'veh-001', title: 'Replace right rear shock absorber', priority: 'Medium', status: 'Waiting parts', openedAt: '2026-09-15' }
];

export const inventory: InventoryItem[] = [
  { id: 'part-001', sku: 'BRK-PAD-01', name: 'Front brake pad set', stock: 3, reorderPoint: 4, unit: 'set' },
  { id: 'part-002', sku: 'OIL-15W40', name: 'Engine oil 15W-40', stock: 38, reorderPoint: 12, unit: 'L' },
  { id: 'part-003', sku: 'FLT-OIL-02', name: 'Oil filter', stock: 9, reorderPoint: 6, unit: 'unit' },
  { id: 'part-004', sku: 'SHK-RR-04', name: 'Rear shock absorber', stock: 0, reorderPoint: 2, unit: 'unit' },
  { id: 'part-005', sku: 'BLT-ALT-03', name: 'Alternator belt', stock: 5, reorderPoint: 3, unit: 'unit' }
];

export const tires: Tire[] = [
  { id: 'tire-001', serial: 'DEMO-T-1001', brand: 'Bridgestone', size: '265/65 R17', vehicleId: 'veh-001', position: 'Front left', treadDepthMm: 6.8, status: 'Mounted' },
  { id: 'tire-002', serial: 'DEMO-T-1002', brand: 'Bridgestone', size: '265/65 R17', vehicleId: 'veh-001', position: 'Front right', treadDepthMm: 3.1, status: 'Inspect' },
  { id: 'tire-003', serial: 'DEMO-T-1003', brand: 'Michelin', size: '215/75 R17.5', vehicleId: 'veh-002', position: 'Rear left outer', treadDepthMm: 7.4, status: 'Mounted' },
  { id: 'tire-004', serial: 'DEMO-T-1004', brand: 'Michelin', size: '215/75 R17.5', vehicleId: null, position: null, treadDepthMm: 9.2, status: 'In stock' }
];

const order: WorkOrderStatus[] = ['Open', 'In progress', 'Waiting parts', 'Done'];

export function advanceWorkOrder(id: string): WorkOrder | undefined {
  const workOrder = workOrders.find((item) => item.id === id);
  if (!workOrder) return undefined;

  const index = order.indexOf(workOrder.status);
  workOrder.status = order[Math.min(index + 1, order.length - 1)];
  return workOrder;
}
