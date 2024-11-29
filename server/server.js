const jsonServer = require('json-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const jwt = require('jsonwebtoken');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your_secret_key';

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);


server.post('/login', (req, res) => {
  console.log('Request received:', req.body); // Loguj dane z żądania
  const { email, password } = req.body;

  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({token});
  } else {
      res.status(401).json({ message: 'Invalid email or password' });
  }
});

server.get('/applications', (req, res) => {
 const token =req.headers.authorization.split(' ')[1];
 try 
 {  
  const decoded = jwt.verify(token, SECRET_KEY);
  const applications = router.db.get('applications').value().filter({ userId: decoded.userId }).value();
  res.status(200).json(applications);
 }
 catch(error)
 { 
  res.status(401).json({ message: 'Unauthorized' });
 }
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});