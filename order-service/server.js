const express = require('express');
const Consul = require('consul');

const app = express();
const port = 3003; // Farklı bir port kullanabilirsiniz

const orderRouter = express.Router();

app.use(express.json());
app.use('/orders', orderRouter);

const consul = new Consul();

// Urun servisi için sağlamlık kontrolü (health check)
consul.agent.check.register({
  id: 'order-service',
  name: 'order Service',
  http: `http://localhost:${port}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});

app.listen(port, () => {
  console.log(`order service working on ${port}.`);
});


app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// List all orders
productRouter.get('/', (req, res) => {
  // Implementation for listing products
});

// Get a specific product
productRouter.get('/:orderId', (req, res) => {
  // Implementation for getting a single product
});

// Create a new product
productRouter.post('/', (req, res) => {
  // Implementation for creating a new product
});

// Update a product
productRouter.put('/:orderId', (req, res) => {
  // Implementation for updating a product
});

// Delete a product
productRouter.delete('/:orderId', (req, res) => {
  // Implementation for deleting a product
});


