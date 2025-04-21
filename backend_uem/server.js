const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const eventRoutes = require('./routes/eventRoutes');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrationRoutes');
const auth = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.ORIGIN_URL || "http://localhost:3001", // Replace with your frontend URL
    credentials: true // Only if using cookies
}));
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events', registrationRoutes);
app.use('/api', auth);
app.get('/', (req, res) => {
    res.send('Hello from Express and MongoDB!');
  });
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  
  
});
