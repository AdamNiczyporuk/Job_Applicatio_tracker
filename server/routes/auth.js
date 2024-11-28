const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Rejestracja użytkownika
router.post('/register', registerUser);

// Logowanie użytkownika
router.post('/login', loginUser);

module.exports = router;
