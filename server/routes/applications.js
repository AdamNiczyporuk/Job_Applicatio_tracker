const express = require('express');
const { 
    getAllApplications, 
    getApplicationById, 
    addApplication, 
    deleteApplication 
} = require('../controllers/applicationsController');

const router = express.Router();

// Pobranie wszystkich aplikacji
router.get('/',getAllApplications);

// Pobranie jednej aplikacji po ID
router.get('/:id', getApplicationById);

// Dodanie nowej aplikacji
router.post('/', addApplication);

// Usunięcie aplikacji
router.delete('/:id', deleteApplication);

module.exports = router;
