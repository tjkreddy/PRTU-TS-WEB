import { MongoClient, Db } from 'mongodb';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.client) {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
          throw new Error('MongoDB URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB Atlas...');
        this.client = new MongoClient(uri);
        await this.client.connect();
        
        // Ping the deployment to verify connection
        await this.client.db("admin").command({ ping: 1 });
        
        this.db = this.client.db(process.env.DB_NAME || 'prtu-community');
        
        console.log('✅ Connected to MongoDB Atlas successfully!');
        console.log(`📊 Using database: ${this.db.databaseName}`);
        
        // Ensure the comments collection exists
        const collections = await this.db.listCollections().toArray();
        const commentsCollectionExists = collections.some(col => col.name === 'comments');
        
        if (!commentsCollectionExists) {
          await this.db.createCollection('comments');
          console.log('📝 Created comments collection');
        } else {
          console.log('📝 Comments collection already exists');
        }
      }
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('Disconnected from MongoDB');
    }
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  public getClient(): MongoClient {
    if (!this.client) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.client;
  }
}

export default DatabaseConnection;
