const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'PRTU Community Chat API - TEST VERSION'
  });
});

// Simple mock endpoints for testing
app.get('/api/comments/:pageContext', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        author: 'Test User',
        content: 'This is a test comment',
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        isLiked: false,
        isReply: false,
        replies: []
      }
    ]
  });
});

app.post('/api/comments', (req, res) => {
  const { author, content } = req.body;
  res.json({
    success: true,
    data: {
      id: Date.now().toString(),
      author,
      content,
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      isLiked: false,
      isReply: false
    }
  });
});

app.post('/api/comments/:id/like', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      likes: 1,
      isLiked: true,
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TEST Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🧪 This is a test server without MongoDB`);
});
