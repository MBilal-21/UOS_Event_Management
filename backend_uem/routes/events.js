const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Create new event
router.post("/", async (req, res) => {
  const { title, date, location, description, price } = req.body;

  if (!title || !date || !location || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const event = new Event({ title, date, location, description, price });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event" });
  }
});

module.exports = router;
