const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();

// 1. Middleware
app.use(express.json());

// 2. UPDATED CORS:
// Allowing all origins is the safest way to ensure your 
// Render Frontend can talk to your Render Backend.
app.use(cors());

// 3. MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in Environment Variables!");
    process.exit(1); 
}

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch(err => {
        console.log("❌ Connection Error:", err);
        // Important: Exit the process if DB fails so Render knows the build failed
        process.exit(1); 
    });

// 4. Routes
app.use('/api/auth', authRoutes);

// Root route to check if server is alive
app.get('/', (req, res) => {
    res.send("Auth Project Backend is running on Render!");
});

// 5. PORT LOGIC:
// Render uses 'process.env.PORT'. Adding '0.0.0.0' helps Render 
// route traffic correctly to your app.
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
