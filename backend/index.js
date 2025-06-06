const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true                // allow cookies/token headers
}));

app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
