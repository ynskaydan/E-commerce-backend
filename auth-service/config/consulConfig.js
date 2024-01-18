const Consul = require('consul');
require('dotenv').config();
const consulClient = new Consul();
ip = process.env.SERVER_IP;
port = process.env.SERVER_PORT;

const consulRegister = async () => {
    consulClient.agent.check.register({
        id: 'auth-service',
        name: 'Auth Service',
        http: `http://${ip}:${port}/health`,
        interval: '10s',
        timeout: '5s',
        deregistercriticalserviceafter: '30s',
      }, (err) => {
        if (err) {
            console.error('Failed to register service with consul:', err);
        } else {
            console.log('Service registered with consul');
        }
    });
};

module.exports = consulRegister;

