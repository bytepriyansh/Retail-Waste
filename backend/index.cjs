const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Placeholder inventory data
let inventory = [];

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Add product endpoint
app.post('/api/inventory', (req, res) => {
  const product = req.body;
  product.id = Date.now();
  inventory.push(product);
  res.status(201).json(product);
});

// Get all products endpoint
app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 