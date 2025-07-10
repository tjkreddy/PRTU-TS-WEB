# PRTU Community Portal - Comment System Setup

## MongoDB Atlas Integration

This project is now fully integrated with MongoDB Atlas cloud database for storing community comments.

### Features ✨

- **Persistent Comments**: All comments are stored in MongoDB Atlas
- **User Session Persistence**: Users stay signed in across browser sessions
- **Real-time Status**: Server connection status indicator
- **Nested Replies**: Support for threaded conversations
- **Like System**: Users can like/unlike comments
- **Page Context**: Comments are organized by page context

### Quick Start 🚀

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - The `.env` file is already configured with MongoDB Atlas connection
   - Database: `prtu-community`
   - Collection: `comments`

3. **Start the Application**
   ```bash
   # Option 1: Use the batch file (Windows)
   start-dev.bat
   
   # Option 2: Use npm command
   npm run start:dev
   
   # Option 3: Manual startup
   npm run compile-server
   npm run start:full
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### How the Comment System Works 💬

#### User Experience:
1. **First Visit**: User clicks "Sign In to Comment" and enters their name
2. **Commenting**: User can post comments and replies
3. **Persistence**: Name is saved locally - no need to sign in again on revisit
4. **Sign Out**: User can manually sign out to clear their session

#### Technical Flow:
1. **Frontend** (React + TypeScript)
   - Comments.tsx handles UI and user interactions
   - Stores user info in localStorage for persistence
   - Makes API calls to backend for data

2. **Backend** (Express + TypeScript)
   - server.ts - Main server setup
   - database.ts - MongoDB Atlas connection management
   - CommentService.ts - Business logic for comments
   - Routes handle API endpoints

3. **Database** (MongoDB Atlas)
   - Collection: `comments`
   - Documents store: author, content, timestamp, likes, replies, etc.

### API Endpoints 🔌

- `GET /api/comments/:pageContext` - Get comments for a page
- `POST /api/comments` - Create a new comment
- `PUT /api/comments/:id/like` - Toggle like on a comment
- `GET /health` - Server health check

### Database Schema 📊

```javascript
{
  _id: ObjectId,
  id: String,           // Unique comment ID
  author: String,       // User's display name
  content: String,      // Comment text
  timestamp: Date,      // When comment was posted
  pageContext: String,  // Which page this comment belongs to
  likes: Number,        // Like count
  likedBy: [String],    // Array of user IDs who liked
  parentId: String,     // Parent comment ID (for replies)
  isReply: Boolean,     // Whether this is a reply
  createdAt: Date,
  updatedAt: Date
}
```

### Development Commands 🛠️

```bash
# Frontend only
npm run dev

# Compile TypeScript server
npm run compile-server

# Backend only
npm run server

# Both frontend and backend
npm run start:dev

# Health check
curl http://localhost:5000/health
```

### Environment Variables 🔐

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://prtuadmin:admin2025$@prtu.5alb2.mongodb.net/?retryWrites=true&w=majority&appName=prtu
DB_NAME=prtu-community
COLLECTION_NAME=comments

# Server Configuration
PORT=5000
```

### User Session Management 👤

The system implements persistent user sessions:

- **localStorage Key**: `prtu-user-info`
- **Stored Data**: `{ name: "User Name", isLoggedIn: true }`
- **Auto-login**: Users automatically signed in on return visits
- **Manual Sign-out**: Clears both state and localStorage

### Troubleshooting 🔧

1. **Server Connection Issues**
   - Check if port 5000 is available
   - Verify MongoDB Atlas connection string
   - Check server logs for detailed error messages

2. **Frontend Issues**
   - Ensure backend is running first
   - Check browser console for errors
   - Verify port 5173 is available

3. **Database Issues**
   - Verify MongoDB Atlas credentials
   - Check network connectivity
   - Ensure IP address is whitelisted in MongoDB Atlas

### MongoDB Atlas Dashboard 📈

You can monitor your database activity at:
https://cloud.mongodb.com/

Navigate to your cluster to view:
- Real-time operations
- Database metrics
- Collection data
- Performance insights

---

**Note**: The comment system is now fully functional with persistent storage and user sessions. Users will only need to sign in once per browser, and all comments are permanently stored in the cloud database.
