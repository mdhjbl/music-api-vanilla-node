const connect = require('../db');
const { ObjectId } = require('mongodb');

async function getAllMusics() {
  const db = await connect();
  return db.collection('musics').find().toArray();
}

async function getMusicById(id) {
  const db = await connect();
  return db.collection('musics').findOne({ _id: new ObjectId(id) });
}

async function addMusic(music) {
  const db = await connect();
  return db.collection('musics').insertOne(music);
}

async function deleteMusic(id) {
  const db = await connect();
  return db.collection('musics').deleteOne({ _id: new ObjectId(id) });
}

async function updateMusic(id, updatedData) {
  const db = await connect();
  const { ObjectId } = require('mongodb');
  return db.collection('musics').updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
}


module.exports = {
  getAllMusics,
  getMusicById,
  addMusic,
  deleteMusic,
  updateMusic
};
