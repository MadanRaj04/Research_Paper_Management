// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');  // Import routes from routes.js
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Route Registration
app.use('/api', routes);  // Use the /api/files path for file routes

// Root route
app.get('/', (req, res) => {
  res.send('📚 Research Paper Repository API is running.');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });
