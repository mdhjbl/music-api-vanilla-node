const musicModel = require('../Models/musicModel');

async function getAll(req, res) {
  const musics = await musicModel.getAllMusics();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(musics));
}

async function getOne(req, res, id) {
  try {
    const music = await musicModel.getMusicById(id);
    if (!music) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Music not found' }));
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(music));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid ID' }));
  }
}

async function create(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const data = JSON.parse(body);
    if (!data.title || !data.artist) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'title and artist are required' }));
    }

    const result = await musicModel.addMusic(data);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ insertedId: result.insertedId }));
  });
}

async function remove(req, res, id) {
  try {
    const result = await musicModel.deleteMusic(id);
    if (result.deletedCount === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Music not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Music deleted' }));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid ID' }));
  }
}

async function update(req, res, id) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const updatedData = JSON.parse(body);

    try {
      const result = await musicModel.updateMusic(id, updatedData);
      if (result.matchedCount === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Music not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Music updated' }));
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
  update
};
