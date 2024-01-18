const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/dbConfig');
const consulRegister = require('./config/consulConfig');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swaggerConfig');

consulRegister();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Auth service working on ${port}.`);
});




