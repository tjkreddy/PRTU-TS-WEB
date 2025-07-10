import dotenv from 'dotenv';
import DatabaseConnection from './server/database';

// Load environment variables
dotenv.config();

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    const db = DatabaseConnection.getInstance();
    await db.connect();
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📋 Database name:', process.env.DB_NAME || 'prtu-community');
    console.log('📦 Collection name:', process.env.COLLECTION_NAME || 'comments');
    
    // Test basic operations
    const database = db.getDb();
    const collections = await database.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test a simple ping
    await database.command({ ping: 1 });
    console.log('🏓 Database ping successful!');
    
    await db.disconnect();
    console.log('🔐 Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

testConnection();
