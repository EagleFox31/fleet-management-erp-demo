import type { DashboardSummary, InventoryItem, Tire, Vehicle, WorkOrder } from '../../shared/types';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  summary: () => request<DashboardSummary>('/api/summary'),
  vehicles: () => request<Vehicle[]>('/api/vehicles'),
  workOrders: () => request<WorkOrder[]>('/api/work-orders'),
  inventory: () => request<InventoryItem[]>('/api/inventory'),
  tires: () => request<Tire[]>('/api/tires'),
  advanceWorkOrder: (id: string) =>
    request<WorkOrder>(`/api/work-orders/${id}/advance`, { method: 'PATCH' })
};
