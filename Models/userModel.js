const connect = require('../db');
const { ObjectId } = require('mongodb');

async function getAllUsers() {
  const db = await connect();
  return db.collection('users').find().toArray();
}

async function getUserById(id) {
  const db = await connect();
  return db.collection('users').findOne({ _id: new ObjectId(id) });
}

async function addUser(user) {
  const db = await connect();
  return db.collection('users').insertOne(user);
}

async function deleteUser(id) {
  const db = await connect();
  return db.collection('users').deleteOne({ _id: new ObjectId(id) });
}

async function updateUser(id, updatedData) {
  const db = await connect();
  const { ObjectId } = require('mongodb');
  return db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
}


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser
};
