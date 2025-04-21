const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema);


// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Admin',
//     required: true,
//   },
// });

// const Event = mongoose.model('Event', eventSchema);
// module.exports = Event;
