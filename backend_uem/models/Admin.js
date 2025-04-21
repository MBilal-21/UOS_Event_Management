const mongoose = require('mongoose');

// Admin schema can be similar to User but with specific fields for admin.
const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    default: 'Admin',
  },
  permissions: {
    type: Array,
    default: ['manage_users', 'manage_events'],  // Example permissions
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
