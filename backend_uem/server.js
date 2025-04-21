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

const allowedOrigins = [
  "https://uos-event-management.vercel.app",   // your frontend (client) domain
  "https://uos-event-management-git-main-mbilal-21s-projects.vercel.app"  ,
  "https://uos-event-management-nfbgmsqgi-mbilal-21s-projects.vercel.app"     // if you have another frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



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
