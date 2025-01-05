const jsonServer = require('json-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const jwt = require('jsonwebtoken');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


const WebSocket = require('ws');
const http = require('http');

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);



const SECRET_KEY = 'franek';



const httpServer = http.createServer(server);
const wss = new WebSocket.Server({ noServer: true });


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);

  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

httpServer.on('upgrade', (request, socket, head) => {

  if (request.url === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();  
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader)
  {
    return  res.status(401).json({message:"AuthHeader missing"});
  }
  const token = authHeader.split(' ')[1];
  try
  { 
    const decoded = jwt.verify(token,SECRET_KEY);
    req.userId = decoded.userId;
    next();
  }catch(err)
  { 
    res.status(401).json({message:"Unauthorized"});
  }
};



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

server.post('/register', (req, res) => {
  const {name,email, password , github = '', linkedin = '' } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.find(u => u.email === email);

  if(userExists)
  { 
    return res.status(400).json({message:"User already exists"});
  }
  else
  {
    const newUser = { id: users.length + 1, name, email, password,github,linkedin};
    router.db.get('users').push(newUser).write();
    res.status(201).json({ message: 'User registered successfully'});
  }
});

server.put('/user',authenticateToken ,(req, res) => {
  try {
    const { name, email, github = '', linkedin = '' } = req.body;
    const users = router.db.get('users').value();
    const userIndex = users.findIndex(u => u.id === req.userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      github: github || users[userIndex].github,
      linkedin: linkedin || users[userIndex].linkedin
    };

    router.db.get('users')
      .find({ id: req.userId })
      .assign(updatedUser)
      .write();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


server.post('/applications',authenticateToken,(req,res)=>
{ 
  try{ 
    const {name,link,phoneNumber} = req.body; 
    const applications = router.db.get('applications').value();
    const maxId = applications.length > 0 ? Math.max(...applications.map(app => app.id)) : 0;

    const newApplication = { id: maxId + 1, name, link, userId: req.userId,dataTime: new Date().toISOString(),phoneNumber: phoneNumber || null };
    router.db.get('applications').push(newApplication).write();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('Sending updateTable message to client');
        client.send(JSON.stringify({ type: 'updateTable'}));
      }
    });


    res.status(201).json(newApplication);
    }catch(error)
    { 
      res.status(401).json({message:"Failed Post Application"});
    }
});


server.get('/applications',authenticateToken, (req, res) => {
  try {
    const applications = router.db.get('applications').filter({ userId: req.userId }).value();
    res.status(200).json(applications);
  } catch (error) {
    res.status(401).json({ message: 'Failed Get Applications' });
  }
});

server.get('/user',authenticateToken, (req, res) => {
    const user = router.db.get('users').find({ id: req.userId }).value();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

server.put('/applications/:id',authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { name, link } = req.body;

    const applications = router.db.get('applications').value();
    const applicationIndex = applications.findIndex(app => app.id === parseInt(id) && app.userId === req.userId);

    if (applicationIndex === -1) {
      return res.status(404).json({ message: 'Application not found or you do not have permission to edit it' });
    }


    const updatedApplication = {
      ...applications[applicationIndex],
      name: name || applications[applicationIndex].name, 
      link: link || applications[applicationIndex].link,
    };

    router.db.get('applications')
      .find({ id: parseInt(id) })
      .assign(updatedApplication)
      .write();

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(401).json({ message: 'Failed Put application' });
  }
});
 server.use(router);
// server.listen(5000, () => {
//   console.log('JSON Server is running on http://localhost:5000');
// });

httpServer.listen(5000, () => {
  console.log('Server is listening on port 5000');
});