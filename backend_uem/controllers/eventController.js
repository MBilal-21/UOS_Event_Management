const Admin = require('../models/Admin');
const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  const { name, description, date, createdBy } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(createdBy);
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const newEvent = new Event({
      name,
      description,
      date,
      createdBy,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEvent };
