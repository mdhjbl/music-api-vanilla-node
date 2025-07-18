const { getAll, getOne, create, remove, update } = require('../Controllers/userController');

function userRouter(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === '/users' && method === 'GET') {
    return getAll(req, res);
  }

  if (url === '/users' && method === 'POST') {
    return create(req, res);
  }

  if (url.startsWith('/users/') && method === 'GET') {
    const id = url.split('/')[2];
    return getOne(req, res, id);
  }

  if (url.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];
    return remove(req, res, id);
  }

  if (url.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2];
    return update(req, res, id);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
}

module.exports = userRouter;
