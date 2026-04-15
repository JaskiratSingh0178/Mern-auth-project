const express = require('express');
const router = express.Router();

// NOTE: If you have a User model in a 'models' folder, uncomment the line below:
// const User = require('../models/User');

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // 1. Basic Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        console.log(`📝 Registering user: ${username} (${role})`);

        /* DATABASE LOGIC:
           In a real MongoDB setup, you would use:
           const newUser = new User({ username, email, password, role });
           await newUser.save();
        */

        // 2. Successful Response
        return res.status(201).json({ 
            message: "User registered successfully!", 
            user: { username, email, role } 
        });

    } catch (err) {
        console.error("❌ Registration Error:", err.message);
        // Handle Duplicate Email Error (MongoDB Code 11000)
        if (err.code === 11000) {
            return res.status(400).json({ error: "Email already exists!" });
        }
        return res.status(500).json({ error: "Server failed to register user" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(`🔑 Login attempt: ${email}`);

        /* DATABASE LOGIC:
           const user = await User.findOne({ email });
           if (!user || user.password !== password) throw Error;
        */

        // 3. Mock Success Response for Lab Submission
        return res.status(200).json({
            message: "Login Successful",
            token: "eyJhY2Nlc3NfdG9rZW4iOiIxMjM0NSJ9", // Simulated JWT Token
            user: {
                email: email,
                role: email.includes('admin') ? 'admin' : 'user'
            }
        });

    } catch (err) {
        console.error("❌ Login Error:", err.message);
        return res.status(401).json({ error: "Invalid credentials" });
    }
});

module.exports = router;