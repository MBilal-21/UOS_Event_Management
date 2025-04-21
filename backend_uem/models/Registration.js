const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // unique: true,
  },
  // eventId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Event',
  //   required: true,
  // },
  qrCode: {
    type: String || null,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: null,
    // required: true,
    // Optional TTL index: uncomment if you want the document to auto-delete after expiry
    // index: { expires: 0 }
  },
  registrationStatus: {
    type: String,
    enum: ["registered", "cancelled"],
    default: "registered",
  },
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
