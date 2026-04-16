const express = require('express');
const dotenv = require('dotenv');
const { testConnection } = require('./config/db');
const { createTable } = require('./models/schoolModel');
const schoolRoutes = require('./routes/schoolRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', schoolRoutes);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({
    message: 'School Management API is running.',
    endpoints: {
      addSchool: 'POST /api/addSchool',
      listSchools: 'GET /api/listSchools?latitude=&longitude=',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

const start = async () => {
  await testConnection();
  await createTable();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
