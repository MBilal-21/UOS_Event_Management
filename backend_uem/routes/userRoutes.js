const express = require('express');
const router = express.Router();
const { getUsersWithRegistrationStatus } = require('../controllers/userController');

router.get('/users/registration-status', getUsersWithRegistrationStatus);

module.exports = router;
