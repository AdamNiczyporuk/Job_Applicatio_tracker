const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/applications');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/applications', appRoutes); // REST dla aplikacji
app.use('/api/auth', authRoutes);       // REST dla autoryzacji

// Start serwera
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
