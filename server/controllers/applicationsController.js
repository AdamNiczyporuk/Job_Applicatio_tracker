const db = require('../DB/db');

// Pobranie wszystkich aplikacji
const getAllApplications = (req, res) => {
    db.all('SELECT * FROM applications', [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Error fetching applications' });
        res.status(200).json(rows);
    });
};

// Pobranie jednej aplikacji po ID
const getApplicationById = (req, res) => {
    db.get('SELECT * FROM applications WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ message: 'Error fetching application' });
        if (!row) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(row);
    });
};

// Dodanie nowej aplikacji
const addApplication = (req, res) => {
    const { name, link, userId } = req.body;
    if (!name || !link) {
        return res.status(400).json({ message: 'Name and link are required' });
    }

    const query = `INSERT INTO applications (user_id, name, link) VALUES (?, ?, ?)`;
    db.run(query, [userId || 1, name, link], function (err) {
        if (err) return res.status(500).json({ message: 'Error adding application' });
        res.status(201).json({ applicationId: this.lastID });
    });
};

// Usunięcie aplikacji
const deleteApplication = (req, res) => {
    db.run('DELETE FROM applications WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ message: 'Error deleting application' });
        if (this.changes === 0) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json({ message: 'Application deleted successfully' });
    });
};

module.exports = { getAllApplications, getApplicationById, addApplication, deleteApplication };
