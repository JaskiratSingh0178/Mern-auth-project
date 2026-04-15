const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());

// CORS FIX: Allows your React app (Port 3000) to talk to this Server (Port 5000)
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch(err => console.log("❌ Connection Error:", err));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Auth Project Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));