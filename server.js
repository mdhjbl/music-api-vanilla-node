const http = require('http');
const musicRouter = require('./Routes/musicRout');
const userRouter = require('./Routes/userRout');
require('./db');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url.startsWith('/musics')) {
    return musicRouter(req, res);
  }

  if (url.startsWith('/users')) {
    return userRouter(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
