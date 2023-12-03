const express = require('express');
const Consul = require('consul');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/dbConfig');
const app = express();
const port = 3003; 

const consul = new Consul(); // Health check for order service
consul.agent.check.register({
  id: 'order-service',
  name: 'order Service',
  http: `http://localhost:${port}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});

connectDB();
app.use(express.json());
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Order service working on ${port}.`);
});


app.get('/health', (req, res) => {
  res.sendStatus(200);
});



