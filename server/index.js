const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Tymczasowa baza danych
let applications = [];

// Endpoint do pobrania aplikacji
app.get('/applications', (req, res) => {
    res.json(applications);
});

// Endpoint do dodania aplikacji
app.post('/applications', (req, res) => {
    const { link } = req.body;
    if (link) {
        applications.push({ id: Date.now(), link });
        res.status(201).json({ message: 'Application added!' });
    } else {
        res.status(400).json({ message: 'Link is required!' });
    }
});

// Start serwera
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
