const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log('📋 MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');
    console.log('📋 DB Name:', process.env.DB_NAME || 'prtu-community');
    
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME || 'prtu-community');
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('🔄 Starting server without MongoDB (test mode)');
    // Don't exit, continue with mock data
  }
};

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'PRTU Community Chat API'
  });
});

// Get comments for a specific page context
app.get('/api/comments/:pageContext', async (req, res) => {
  try {
    const { pageContext } = req.params;
    const userId = req.headers['user-id'] || 'anonymous';
    
    // If no database connection, return mock data
    if (!db) {
      return res.json({
        success: true,
        data: [
          {
            id: '1',
            author: 'Test User',
            content: 'This is a test comment (MongoDB not connected)',
            timestamp: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            pageContext: pageContext,
            likes: 0,
            isLiked: false,
            isReply: false,
            replies: []
          }
        ]
      });
    }
    
    const collection = db.collection(process.env.COLLECTION_NAME || 'comments');
    const comments = await collection
      .find({ pageContext, parentId: { $exists: false } })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await collection
          .find({ parentId: comment._id.toString() })
          .sort({ createdAt: 1 })
          .toArray();
        
        return {
          id: comment._id.toString(),
          author: comment.author,
          content: comment.content,
          timestamp: comment.createdAt,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          pageContext: comment.pageContext,
          likes: comment.likes || 0,
          isLiked: comment.likedBy?.includes(userId) || false,
          isReply: false,
          replies: replies.map(reply => ({
            id: reply._id.toString(),
            author: reply.author,
            content: reply.content,
            timestamp: reply.createdAt,
            createdAt: reply.createdAt,
            updatedAt: reply.updatedAt,
            likes: reply.likes || 0,
            isLiked: reply.likedBy?.includes(userId) || false,
            isReply: true
          }))
        };
      })
    );
    
    res.json({
      success: true,
      data: commentsWithReplies
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments'
    });
  }
});

// Create a new comment
app.post('/api/comments', async (req, res) => {
  try {
    const { author, content, pageContext, parentId } = req.body;
    const userId = req.headers['user-id'] || 'anonymous';
    
    if (!author || !content || !pageContext) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: author, content, pageContext'
      });
    }

    // If no database connection, return mock data
    if (!db) {
      const now = new Date();
      return res.status(201).json({
        success: true,
        data: {
          id: Date.now().toString(),
          author,
          content,
          timestamp: now,
          createdAt: now,
          updatedAt: now,
          pageContext,
          likes: 0,
          isLiked: false,
          isReply: !!parentId
        }
      });
    }

    const collection = db.collection(process.env.COLLECTION_NAME || 'comments');
    const now = new Date();
    
    const newComment = {
      author,
      content,
      pageContext,
      parentId: parentId || null,
      userId,
      likes: 0,
      likedBy: [],
      createdAt: now,
      updatedAt: now
    };

    const result = await collection.insertOne(newComment);
    
    const comment = {
      id: result.insertedId.toString(),
      author,
      content,
      timestamp: now,
      createdAt: now,
      updatedAt: now,
      pageContext,
      likes: 0,
      isLiked: false,
      isReply: !!parentId
    };
    
    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create comment'
    });
  }
});

// Toggle like on a comment
app.post('/api/comments/:commentId/like', async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.headers['user-id'] || 'anonymous';
    
    const collection = db.collection(process.env.COLLECTION_NAME || 'comments');
    const { ObjectId } = require('mongodb');
    
    const comment = await collection.findOne({ _id: new ObjectId(commentId) });
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }
    
    const likedBy = comment.likedBy || [];
    const isLiked = likedBy.includes(userId);
    
    let updateOperation;
    if (isLiked) {
      updateOperation = {
        $pull: { likedBy: userId },
        $inc: { likes: -1 },
        $set: { updatedAt: new Date() }
      };
    } else {
      updateOperation = {
        $addToSet: { likedBy: userId },
        $inc: { likes: 1 },
        $set: { updatedAt: new Date() }
      };
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(commentId) },
      updateOperation,
      { returnDocument: 'after' }
    );
    
    res.json({
      success: true,
      data: {
        id: result._id.toString(),
        author: result.author,
        content: result.content,
        timestamp: result.createdAt,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        likes: result.likes || 0,
        isLiked: !isLiked,
        isReply: !!result.parentId
      }
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle like'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`💬 API endpoint: http://localhost:${PORT}/api`);
  });
};

startServer().catch(console.error);
