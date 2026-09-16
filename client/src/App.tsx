import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import type { DashboardSummary, InventoryItem, Tire, Vehicle, WorkOrder } from '../../shared/types';

type Tab = 'fleet' | 'workshop' | 'inventory' | 'tires';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'fleet', label: 'Fleet' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'tires', label: 'Tires' }
];

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'good' | 'warn' | 'bad' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export default function App() {
  const [tab, setTab] = useState<Tab>('fleet');
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      const [summaryData, vehicleData, orderData, inventoryData, tireData] = await Promise.all([
        api.summary(),
        api.vehicles(),
        api.workOrders(),
        api.inventory(),
        api.tires()
      ]);
      setSummary(summaryData);
      setVehicles(vehicleData);
      setWorkOrders(orderData);
      setInventory(inventoryData);
      setTires(tireData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load demo data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const vehicleById = useMemo(() => new Map(vehicles.map((vehicle) => [vehicle.id, vehicle])), [vehicles]);

  async function advance(id: string) {
    try {
      const updated = await api.advanceWorkOrder(id);
      setWorkOrders((current) => current.map((item) => (item.id === id ? updated : item)));
      setSummary(await api.summary());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update work order');
    }
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">FM</div>
          <div>
            <strong>Fleet ERP</strong>
            <span>Public demo</span>
          </div>
        </div>

        <nav>
          {tabs.map((item) => (
            <button key={item.id} className={tab === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setTab(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          Synthetic data only.
          <br />No production records are included.
        </div>
      </aside>

      <main>
        <header className="page-header">
          <div>
            <p className="eyebrow">Operations overview</p>
            <h1>Fleet Management ERP</h1>
            <p className="subtitle">A compact public build focused on fleet, workshop, stock and tire workflows.</p>
          </div>
          <Badge tone="good">Demo dataset</Badge>
        </header>

        {error && <div className="alert">{error}</div>}

        {loading || !summary ? (
          <div className="loading">Loading demo data…</div>
        ) : (
          <>
            <section className="kpis">
              <article><span>Vehicles</span><strong>{summary.vehicles}</strong><small>{summary.availableVehicles} available</small></article>
              <article><span>Open work orders</span><strong>{summary.openWorkOrders}</strong><small>across the workshop queue</small></article>
              <article><span>Low stock</span><strong>{summary.lowStockItems}</strong><small>items at or below reorder point</small></article>
              <article><span>Tire alerts</span><strong>{summary.tiresToInspect}</strong><small>inspection required</small></article>
            </section>

            <section className="panel">
              {tab === 'fleet' && (
                <>
                  <div className="panel-heading"><div><p className="eyebrow">Fleet</p><h2>Vehicles</h2></div><span>{vehicles.length} records</span></div>
                  <div className="table-wrap"><table><thead><tr><th>Registration</th><th>Vehicle</th><th>Year</th><th>Mileage</th><th>Status</th></tr></thead><tbody>
                    {vehicles.map((vehicle) => <tr key={vehicle.id}><td className="mono">{vehicle.registration}</td><td>{vehicle.make} {vehicle.model}</td><td>{vehicle.year}</td><td>{vehicle.mileageKm.toLocaleString()} km</td><td><Badge tone={vehicle.status === 'Available' ? 'good' : vehicle.status === 'In workshop' ? 'warn' : 'neutral'}>{vehicle.status}</Badge></td></tr>)}
                  </tbody></table></div>
                </>
              )}

              {tab === 'workshop' && (
                <>
                  <div className="panel-heading"><div><p className="eyebrow">Workshop</p><h2>Work orders</h2></div><span>Click advance to move a demo order through its lifecycle</span></div>
                  <div className="cards">
                    {workOrders.map((order) => {
                      const vehicle = vehicleById.get(order.vehicleId);
                      return <article className="work-card" key={order.id}><div className="work-card-top"><span className="mono">{order.id}</span><Badge tone={order.priority === 'High' ? 'bad' : order.priority === 'Medium' ? 'warn' : 'neutral'}>{order.priority}</Badge></div><h3>{order.title}</h3><p>{vehicle ? `${vehicle.registration} · ${vehicle.make} ${vehicle.model}` : order.vehicleId}</p><div className="work-card-bottom"><Badge tone={order.status === 'Done' ? 'good' : 'neutral'}>{order.status}</Badge><button disabled={order.status === 'Done'} onClick={() => void advance(order.id)}>{order.status === 'Done' ? 'Completed' : 'Advance status'}</button></div></article>;
                    })}
                  </div>
                </>
              )}

              {tab === 'inventory' && (
                <>
                  <div className="panel-heading"><div><p className="eyebrow">Inventory</p><h2>Spare parts</h2></div><span>{inventory.filter((item) => item.stock <= item.reorderPoint).length} require attention</span></div>
                  <div className="table-wrap"><table><thead><tr><th>SKU</th><th>Part</th><th>Stock</th><th>Reorder point</th><th>State</th></tr></thead><tbody>
                    {inventory.map((item) => { const low = item.stock <= item.reorderPoint; return <tr key={item.id}><td className="mono">{item.sku}</td><td>{item.name}</td><td>{item.stock} {item.unit}</td><td>{item.reorderPoint} {item.unit}</td><td><Badge tone={low ? 'warn' : 'good'}>{low ? 'Reorder' : 'OK'}</Badge></td></tr>; })}
                  </tbody></table></div>
                </>
              )}

              {tab === 'tires' && (
                <>
                  <div className="panel-heading"><div><p className="eyebrow">Tires</p><h2>Tire tracking</h2></div><span>Mounting and inspection view</span></div>
                  <div className="table-wrap"><table><thead><tr><th>Serial</th><th>Brand / size</th><th>Vehicle</th><th>Position</th><th>Tread</th><th>Status</th></tr></thead><tbody>
                    {tires.map((tire) => { const vehicle = tire.vehicleId ? vehicleById.get(tire.vehicleId) : undefined; return <tr key={tire.id}><td className="mono">{tire.serial}</td><td>{tire.brand} · {tire.size}</td><td>{vehicle?.registration ?? 'Stock'}</td><td>{tire.position ?? '—'}</td><td>{tire.treadDepthMm.toFixed(1)} mm</td><td><Badge tone={tire.status === 'Inspect' ? 'warn' : tire.status === 'Mounted' ? 'good' : 'neutral'}>{tire.status}</Badge></td></tr>; })}
                  </tbody></table></div>
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
