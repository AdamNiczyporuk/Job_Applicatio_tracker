const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;



app.use(cors());
app.use(bodyParser.json());

// Tymczasowa baza danych



const FILE_NAME = path.resolve(__dirname, 'applications.json');

const loadApplications = () => {
    try {
        if (!fs.existsSync(FILE_NAME)) {
            // Jeśli plik nie istnieje, utwórz pusty plik
            fs.writeFileSync(FILE_NAME, JSON.stringify([], null, 2), 'utf8');
        }
        const data = fs.readFileSync(FILE_NAME, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error with loading data:", error.message);
        return [];
    }
};


const saveApplications = (data) => {

    try {
        fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2));
    }catch(error)
    {
        console.error("Error with saving data")
    }
} 

let applications = loadApplications();

// Endpoint do pobrania aplikacji
app.get('/applications', (req, res) => {
    res.json(applications);
});
app.get('/applications/:id', (req, res) => {
    const application = applications.find(app => app.id === parseInt(req.params.id));
    
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  });

// Endpoint do dodania aplikacji
app.post('/applications', (req, res) => {
    const { link } = req.body;
    if (link) {
        applications.push({ id: Date.now(), link });
        saveApplications(applications);
        res.status(201).json({ message: 'Application added!' });
    } else {
        res.status(400).json({ message: 'Link is required!' });
    }
});

app.delete('/applications/:id', (req, res) => {
    const { id } = req.params; // id przychodzi jako string
    const application = applications.find(app => app.id === parseInt(id)); // Zamiana na liczbę
    
    if (application) {
        applications = applications.filter(app => app.id !== parseInt(id));
        saveApplications(applications);
        res.status(200).json({ message: 'Application deleted successfully' });
    } else {
        res.status(404).json({ message: 'Application not found' });
    }
});


// Start serwera
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
