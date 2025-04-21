const express = require('express');
const Admin = require('../models/Admin');
const User = require('../models/users'); // Assuming admin is tied to user
const router = express.Router();
const verifyToken = require('../middleware/auth');// Middleware to verify token

// Create new admin
router.post('/create',verifyToken, async (req, res) => {
  const { userId, role, permissions } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newAdmin = new Admin({
      userId,
      role,
      permissions,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// The route to check if a user is an admin
// The route to check if a user is an admin
router.get('/check-admin/:id', async (req, res) => {
  const userId = req.params.id;

  // Early return if userId is not provided in the query string
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the admin record in the Admin collection
    const admin = await Admin.findOne({ userId : userId });
    console.log("Admin", admin);
    
    // If no admin record is found for the userId
    if (!admin) {
      return res.status(400).json({ message: 'User is not an admin' });
    }

    // If the user is found to be an admin
    return res.status(200).json({
      isAdmin: true,
      adminId: admin._id,
      permissions: admin.permissions
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    // Send a 500 error in case of any internal issues
    return res.status(500).json({ message: 'Server error while verifying admin status' });
  }
});


module.exports = router;
