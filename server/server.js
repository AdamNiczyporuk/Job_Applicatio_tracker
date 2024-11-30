const jsonServer = require('json-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const jwt = require('jsonwebtoken');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'franek';

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);


// server.post('/login', (req, res) => {
//   console.log('Request received:', req.body); // Loguj dane z żądania
//   const { email, password } = req.body;

//   const users = router.db.get('users').value();
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//       res.status(200).json({ token: 'fake-jwt-token',userId:user.id });
//   } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.email === email && u.password === password);

  if(user)
  { 
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.status(200).json({ token });
  }
  else{ 
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// server.get('/applications', (req, res) => {
//   const {userid} = req.query;
//   const applications = router.db.get('applications').filter({ userId: parseInt(userid) }).value();
//   res.status(200).json(applications);
// });

server.post('/applications',(req,res)=>
{ 
  const authHeader = req.headers.authorization; 
  if(!authHeader){ 
    return res.status(400).json({message:"Header missing"});
  }

  const token = authHeader.split(' ')[1];
  try{ 
    const decoded = jwt.verify(token,SECRET_KEY);
    const {name,link} = req.body; 

    const applications = router.db.get('applications').value();
    const maxId = applications.length > 0 ? Math.max(...applications.map(app => app.id)) : 0;



   const newApplication = { id: maxId + 1, name, link, userId: decoded.userId };
    router.db.get('applications').push(newApplication).write();
    res.status(201).json(newApplication);
    }catch(error)
    { 
      res.status(401).json({message:"Unauthorized"});
    }
});


server.get('/applications', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const applications = router.db.get('applications').filter({ userId: decoded.userId }).value();
    res.status(200).json(applications);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});