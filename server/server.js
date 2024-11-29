const jsonServer = require('json-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);


server.post('/login', (req, res) => {
  console.log('Request received:', req.body); // Loguj dane z żądania
  const { email, password } = req.body;

  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
      res.status(200).json({ token: 'fake-jwt-token',userId:user.id });
  } else {
      res.status(401).json({ message: 'Invalid email or password' });
  }
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});