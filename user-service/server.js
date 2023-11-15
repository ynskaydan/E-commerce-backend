
const express = require('express');
const consul = require('consul');

require('dotenv').config({ path: 'service.env' });
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));


const consulClient = new consul();

consulClient.agent.check.register({
  id: 'user-service',
  name: 'User Service',
  http: `http://localhost:${PORT}/health`,
  interval: '10s',
  timeout: '5s',
  deregistercriticalserviceafter: '30s',
});


app.get('/health', (req, res) => {
  res.sendStatus(200);
  console.log("Selam");
});



