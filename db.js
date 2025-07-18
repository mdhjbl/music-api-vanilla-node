const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/'; 
const client = new MongoClient(uri);
const dbName = 'music_api'; 

async function connect() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); 
  }
}

module.exports = connect;
