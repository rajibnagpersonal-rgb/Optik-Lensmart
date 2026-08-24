const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // Agar local offline MongoDB nahi milta ya URI invalid hai, toh In-Memory Auto-Engine chalu karega
    if (!uri || uri.includes('mongodb.net') || uri.includes('cluster0')) {
      console.log('⚡ [Local Engine]: Starting Embedded In-Memory Database...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    console.log(`✅ [Database Ready & Connected]: ${conn.connection.host}`);
  } catch (error) {
    try {
      console.log('⚡ [Fallback Engine]: Starting Embedded In-Memory Database...');
      mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`✅ [Database Ready & Connected via Memory Server]: ${conn.connection.host}`);
    } catch (inMemErr) {
      console.error(`❌ [Database Connection Failed]: ${inMemErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;