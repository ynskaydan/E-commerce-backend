const express = require('express');
const consul = require('consul');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from my microservice!');
});

// Consul'a kayıt işlemi
const consulClient = consul();
consulClient.agent.service.register({
  name: 'microservices',
  port,
  check: {
    http: `http://localhost:${port}/`,
    interval: '10s',
    timeout: '5s',
  },
}, (error) => {
  if (error) throw error;
  console.log('Microservice registered with Consul');
});

// Uygulamayı başlat
app.listen(port, () => {
  console.log(`Microservice is running on port ${port}`);
});
