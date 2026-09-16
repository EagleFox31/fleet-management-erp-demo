import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inventory, tires, vehicles, workOrders, advanceWorkOrder } from './data.js';

const app = express();
const port = Number(process.env.PORT ?? 5000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: 'public-demo' });
});

app.get('/api/summary', (_req, res) => {
  res.json({
    vehicles: vehicles.length,
    availableVehicles: vehicles.filter((vehicle) => vehicle.status === 'Available').length,
    openWorkOrders: workOrders.filter((order) => order.status !== 'Done').length,
    lowStockItems: inventory.filter((item) => item.stock <= item.reorderPoint).length,
    tiresToInspect: tires.filter((tire) => tire.status === 'Inspect').length
  });
});

app.get('/api/vehicles', (_req, res) => res.json(vehicles));
app.get('/api/work-orders', (_req, res) => res.json(workOrders));
app.get('/api/inventory', (_req, res) => res.json(inventory));
app.get('/api/tires', (_req, res) => res.json(tires));

app.patch('/api/work-orders/:id/advance', (req, res) => {
  const updated = advanceWorkOrder(req.params.id);
  if (!updated) {
    return res.status(404).json({ message: 'Work order not found' });
  }
  return res.json(updated);
});

if (process.env.NODE_ENV === 'production') {
  const clientDir = path.resolve(__dirname, '../../dist-client');
  app.use(express.static(clientDir));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDir, 'index.html')));
}

app.listen(port, () => {
  console.log(`Fleet Management ERP public demo running on http://localhost:${port}`);
});
