const express = require('express');
const Consul = require('consul');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/dbConfig');
const app = express();
const port = 3001; 
const consul = new Consul();

consul.agent.check.register({
  id: 'user-service',
  name: 'User Service',
  http: `http://localhost:${port}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});

connectDB();
app.use(express.json());
app.use('/users', userRoutes);


app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`User service working on ${port}.`);
});




