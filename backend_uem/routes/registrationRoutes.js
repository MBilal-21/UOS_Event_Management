const express = require('express');
const Registration = require('../models/Registration');
const User = require('../models/users');
// const Event = require('../models/Event');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// get the ticket
// routes/event.js or similar file

router.get('/get-ticket/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const registration = await Registration.findOne({ userId: userId });

    if (!registration) {
      return res.status(404).json({ message: 'You have not registered yet in Event' });
    }

    return res.status(200).json({
      message: 'Ticket received successfully.',
      registration,
    });

  } catch (error) {
    console.error('Error fetching ticket:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// ✅ Register user for an event
router.post('/register-seat', verifyToken, async (req, res) => {

  const { userId } = req.body;
  const qrCode = "null";

  try {
    const user = await User.findById(userId);
    const alreadyRegister = await Registration.find( {userId: userId} )
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (alreadyRegister.length > 0 ) {
      // console.log("alreadyRegister = ",alreadyRegister);
      return res.status(400).json({ message: 'User Already Booked the Ticket' });
    }

    const newRegistration = new Registration({
      userId,
      qrCode,
    });

    await newRegistration.save();

    res.status(201).json({
      message: 'User registered for event successfully',
      registration: newRegistration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Confirm registration (update payment status)
router.post('/confirm-seat/:id', verifyToken, async (req, res) => {
  try {
    const registrationId = req.params.id;

    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (registration.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Payment is already confirmed.' });
    }

    registration.paymentStatus = 'completed';
    registration.qrCode = registrationId; 
    await registration.save();

    return res.status(200).json({
      message: 'Payment confirmed successfully.',
      registration,
    });
  } catch (error) {
    console.error('Error confirming registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Verify user details
router.get('/verify-user-details/:id', verifyToken, async (req, res) => {
  const registrationId = req.params.id;

  try {
    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({ message: 'User not registered for the event' });
    }
  
    
    // Correct the reference to registration.userId
    const user = await User.findById(registration.userId).select('-password'); // avoid sensitive fields
    

    if (!user) {
      return res.status(404).json({ message: 'User not found in users collection' });
    }

    return res.status(200).json({
      user,
      registration,
    });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
