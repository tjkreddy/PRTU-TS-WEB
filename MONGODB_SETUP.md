# MongoDB Atlas Setup for PRTU Community Chat

This guide will help you set up MongoDB Atlas for the community chat functionality.

## Prerequisites

- MongoDB Atlas account (free tier available)
- Node.js installed on your system

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

## Step 2: Configure Database Access

1. In MongoDB Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a user with username/password authentication
4. Give the user "Read and write to any database" permissions
5. Save the credentials

## Step 3: Configure Network Access

1. Go to "Network Access" in the dashboard
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
4. For production, use specific IP addresses

## Step 4: Get Connection String

1. Go to "Clusters" in the dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 5: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/prtu-community?retryWrites=true&w=majority
DB_NAME=prtu-community
COLLECTION_NAME=comments
PORT=5000
```

Replace:
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- `YOUR_CLUSTER` with your cluster name

## Step 6: Install Dependencies

```bash
npm install
```

## Step 7: Start the Application

### Development Mode (with both frontend and backend):
```bash
npm run start:full
```

### Backend Only:
```bash
npm run dev:server
```

### Frontend Only:
```bash
npm run dev
```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/comments/:pageContext` - Get all comments for a page
- `POST /api/comments` - Create a new comment
- `POST /api/comments/:commentId/like` - Toggle like on a comment
- `DELETE /api/comments/:commentId` - Delete a comment
- `GET /api/comments/:pageContext/stats` - Get comment statistics

## Database Schema

### Comments Collection

```javascript
{
  _id: ObjectId,
  id: String,              // Custom ID for frontend
  author: String,          // Comment author name
  content: String,         // Comment content
  timestamp: Date,         // When comment was created
  pageContext: String,     // Page identifier (e.g., 'community-general')
  likes: Number,           // Number of likes
  likedBy: [String],       // Array of user IDs who liked
  parentId: String,        // Parent comment ID (for replies)
  isReply: Boolean,        // Whether this is a reply
  createdAt: Date,         // Created timestamp
  updatedAt: Date          // Last updated timestamp
}
```

## Usage in Components

The community chat is integrated into your React components via the `Comments` component:

```tsx
import Comments from './Comments';

// In your component
<Comments 
  pageContext="community-general" 
  title="Community Discussion Board"
/>
```

## Security Notes

- The current implementation uses a simple user ID system stored in localStorage
- For production, implement proper authentication and authorization
- Consider rate limiting for API endpoints
- Validate and sanitize all user inputs
- Use HTTPS in production

## Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Check if your IP address is whitelisted
- Ensure the database user has correct permissions

### CORS Issues
- Make sure your frontend URL is in the CORS configuration
- Check if the backend server is running on the correct port

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all type definitions are properly installed

## Production Deployment

Before deploying to production:

1. Set up proper environment variables
2. Configure network access with specific IP addresses
3. Implement proper authentication
4. Set up monitoring and logging
5. Consider using MongoDB connection pooling
6. Implement backup strategies

## Support

For issues with this setup, please check:
1. MongoDB Atlas documentation
2. The project's GitHub repository
3. Community forums
