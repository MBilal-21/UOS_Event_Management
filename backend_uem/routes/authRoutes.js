const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users'); // Make sure User schema is defined properly
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
// console.log("Jwt", process.env.JWT_SECRET);

// Replace with env var in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        semester,
        section,
        rollNumber
    } = req.body;

    // Validate all fields
    if (
        !firstName || !lastName || !email || !password || !confirmPassword ||
        !semester || !section || !rollNumber
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check password match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingRollNumber = await User.findOne({ rollNumber });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
        if (existingRollNumber) {
            return res.status(400).json({ message: "User already exists with this RollNumber" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            currentSemester:semester,
            section,
            rollNumber,
            isAdmin: false,
            createdAt: new Date(),
        });

        // Save to DB
        await newUser.save();

        return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
