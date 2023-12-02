const express = require('express');
const Consul = require('consul');

const app = express();
const port = 3002; // Farklı bir port kullanabilirsiniz

const productRouter = express.Router();

app.use(express.json());
app.use('/products', productRouter);

const consul = new Consul();

// Urun servisi için sağlamlık kontrolü (health check)
consul.agent.check.register({
  id: 'product-service',
  name: 'Product Service',
  http: `http://localhost:${port}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});

 app.get('/product/:productId', (req, res) => {
  productRouter.get('/:productId', (req, res) => {  
  res.send(`product info retrieved: ${req.params.productId}`);
})});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Product service working on ${port}.`);
});

// List all products
productRouter.get('/', (req, res) => {
  // Implementation for listing products
});

// Get a specific product
productRouter.get('/:productId', (req, res) => {
  // Implementation for getting a single product
});

// Create a new product
productRouter.post('/', (req, res) => {
  // Implementation for creating a new product
});

// Update a product
productRouter.put('/:productId', (req, res) => {
  // Implementation for updating a product
});

// Delete a product
productRouter.delete('/:productId', (req, res) => {
  // Implementation for deleting a product
}); 
