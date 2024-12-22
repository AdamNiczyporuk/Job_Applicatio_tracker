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

console.log(wss);

// WebSocket configuration
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Możesz dodać logikę obsługi wiadomości tutaj
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

httpServer.on('upgrade', (request, socket, head) => {
  // Make sure the request is for the WebSocket endpoint
  if (request.url === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();  // Reject if not for /ws
  }
});





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

server.put('/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { name, email, github = '', linkedin = '' } = req.body;
    const users = router.db.get('users').value();
    const userIndex = users.findIndex(u => u.id === decoded.userId);

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
      .find({ id: decoded.userId })
      .assign(updatedUser)
      .write();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


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



   const newApplication = { id: maxId + 1, name, link, userId: decoded.userId,dataTime: new Date().toISOString() };
    router.db.get('applications').push(newApplication).write();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'updateTable', job: newApplication }));
      }
    });


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

server.get('/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = router.db.get('users').find({ id: decoded.userId }).value();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

server.put('/applications/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id } = req.params;
    const { name, link } = req.body;

    const applications = router.db.get('applications').value();
    const applicationIndex = applications.findIndex(app => app.id === parseInt(id) && app.userId === decoded.userId);

    if (applicationIndex === -1) {
      return res.status(404).json({ message: 'Application not found or you do not have permission to edit it' });
    }

    // Aktualizowanie aplikacji
    const updatedApplication = {
      ...applications[applicationIndex],
      name: name || applications[applicationIndex].name, // Jeśli nowe dane nie są dostarczone, zachowaj stare wartości
      link: link || applications[applicationIndex].link,
      dataTime: new Date().toISOString() // Zaktualizuj datę modyfikacji
    };

    // Zapisz zmiany do bazy danych
    router.db.get('applications')
      .find({ id: parseInt(id) })
      .assign(updatedApplication)
      .write();

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});








server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});