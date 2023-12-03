const express = require('express');
const Consul = require('consul');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/dbConfig');
const app = express();
const port = 3002; 
const consul = new Consul();


consul.agent.check.register({
  id: 'product-service',
  name: 'Product Service',
  http: `http://localhost:${port}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});

connectDB();
app.use(express.json());
app.use('/products', productRoutes);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Product service working on ${port}.`);
});

