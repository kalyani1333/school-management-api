const express = require('express');
const cors = require('cors');

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'School Management API Running'
  });
});

app.use('/api', schoolRoutes);

module.exports = app;