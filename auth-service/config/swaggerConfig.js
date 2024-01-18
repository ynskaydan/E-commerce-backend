const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'its documentation for authentication and authorization service',
    },
  },
  apis: ['./routes/authRoutes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
