const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Endpoint do pobierania wszystkich użytkowników
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Endpoint do dodawania nowego użytkownika
app.post('/users', async (req, res) => {
  const { mail, password, githublink, linkedinlink } = req.body;
  const user = await prisma.user.create({
    data: { mail, password, githublink, linkedinlink },
  });
  res.json(user);
});

// Endpoint do pobierania wszystkich aplikacji
app.get('/applications', async (req, res) => {
  const applications = await prisma.application.findMany();
  res.json(applications);
});

// Uruchamiamy serwer na porcie 5000
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
