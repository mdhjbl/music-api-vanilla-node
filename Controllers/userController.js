const userModel = require("../Models/userModel");

// GET /users → get all users
async function getAll(req, res) {
  const users = await userModel.getAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

// GET /users/:id → get one user by ID
async function getOne(req, res, id) {
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid ID' }));
  }
}

// POST /users → create new user
async function create(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const data = JSON.parse(body);

      if (!data.title || !data.artist) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'title and artist are required' }));
      }

      const result = await musicModel.addMusic(data);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ insertedId: result.insertedId }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON or DB error', error: err.message }));
    }
  });
}


// DELETE /users/:id → delete user by ID
async function remove(req, res, id) {
  try {
    const result = await userModel.deleteUser(id);
    if (result.deletedCount === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted' }));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid ID' }));
  }
}

// PUT /users/:id → update user
async function update(req, res, id) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const updatedData = JSON.parse(body);

    try {
      const result = await userModel.updateUser(id, updatedData);
      if (result.matchedCount === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'User not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User updated' }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID or data' }));
    }
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
