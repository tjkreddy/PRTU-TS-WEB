import { useState, useEffect } from 'react';
import { commentAPI, Comment as ApiComment } from './api/commentAPI';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  replies?: Comment[];
  likes: number;
  isLiked: boolean;
}

interface CommentsProps {
  pageContext?: string; // e.g., 'news-123', 'general', 'events-456'
  title?: string;
}

const Comments = ({ pageContext = 'general', title = 'Community Discussion' }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', isLoggedIn: false });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Load user info from localStorage on component mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('prtu-user-info');
    if (savedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log('Loaded user info from localStorage:', parsedUserInfo);
      } catch (error) {
        console.error('Error parsing saved user info:', error);
        localStorage.removeItem('prtu-user-info');
      }
    }
  }, []);

  // Check server status
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/health');
        if (response.ok) {
          setServerStatus('online');
          console.log('Server is online');
        } else {
          setServerStatus('offline');
          console.log('Server responded with error');
        }
      } catch (error) {
        setServerStatus('offline');
        console.error('Server is offline:', error);
      }
    };

    checkServerStatus();
  }, []);

  // Load comments from MongoDB Atlas
  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await commentAPI.getComments(pageContext);
        // Convert API response to local Comment interface
        const localComments: Comment[] = fetchedComments.map(comment => ({
          id: comment.id,
          author: comment.author,
          content: comment.content,
          timestamp: comment.timestamp,
          likes: comment.likes,
          isLiked: comment.isLiked,
          replies: comment.replies?.map(reply => ({
            id: reply.id,
            author: reply.author,
            content: reply.content,
            timestamp: reply.timestamp,
            likes: reply.likes,
            isLiked: reply.isLiked
          }))
        }));
        setComments(localComments);
      } catch (error) {
        console.error('Error loading comments:', error);
        // Fallback to empty array if API fails
        setComments([]);
      }
    };

    loadComments();
  }, [pageContext]);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleSubmitComment = async () => {
    console.log('handleSubmitComment called');
    console.log('newComment:', newComment);
    console.log('userInfo:', userInfo);
    
    if (!newComment.trim()) {
      console.log('Comment is empty, returning');
      return;
    }
    
    try {
      console.log('Sending comment to API...');
      const createdComment = await commentAPI.createComment({
        author: userInfo.name || 'Anonymous User',
        content: newComment,
        pageContext: pageContext
      });

      console.log('API response:', createdComment);

      if (createdComment) {
        const localComment: Comment = {
          id: createdComment.id,
          author: createdComment.author,
          content: createdComment.content,
          timestamp: createdComment.timestamp,
          likes: createdComment.likes,
          isLiked: createdComment.isLiked
        };
        
        console.log('Adding comment to local state:', localComment);
        setComments([localComment, ...comments]);
        setNewComment('');
        console.log('Comment posted successfully');
      } else {
        console.error('No comment returned from API');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to post comment. Please check if the server is running.');
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    
    try {
      const createdReply = await commentAPI.createComment({
        author: userInfo.name || 'Anonymous User',
        content: replyText,
        pageContext: pageContext,
        parentId: parentId
      });

      if (createdReply) {
        const localReply: Comment = {
          id: createdReply.id,
          author: createdReply.author,
          content: createdReply.content,
          timestamp: createdReply.timestamp,
          likes: createdReply.likes,
          isLiked: createdReply.isLiked
        };
        
        setComments(comments.map(comment => 
          comment.id === parentId 
            ? { ...comment, replies: [...(comment.replies || []), localReply] }
            : comment
        ));
        
        setReplyText('');
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleLike = async (commentId: string, isReply = false, parentId?: string) => {
    try {
      const updatedComment = await commentAPI.toggleLike(commentId);
      
      if (updatedComment) {
        if (isReply && parentId) {
          setComments(comments.map(comment => 
            comment.id === parentId 
              ? {
                  ...comment,
                  replies: comment.replies?.map(reply =>
                    reply.id === commentId
                      ? { ...reply, likes: updatedComment.likes, isLiked: updatedComment.isLiked }
                      : reply
                  )
                }
              : comment
          ));
        } else {
          setComments(comments.map(comment => 
            comment.id === commentId 
              ? { ...comment, likes: updatedComment.likes, isLiked: updatedComment.isLiked }
              : comment
          ));
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleLoginPrompt = () => {
    const name = prompt('Enter your name to continue:');
    if (name && name.trim()) {
      const newUserInfo = { name: name.trim(), isLoggedIn: true };
      setUserInfo(newUserInfo);
      // Save to localStorage for persistence
      localStorage.setItem('prtu-user-info', JSON.stringify(newUserInfo));
      console.log('User info saved to localStorage:', newUserInfo);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{comments.length} comments</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <div className={`w-2 h-2 rounded-full ${
              serverStatus === 'online' ? 'bg-green-500' : 
              serverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`${
              serverStatus === 'online' ? 'text-green-600' : 
              serverStatus === 'offline' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {serverStatus === 'online' ? 'Online' : 
               serverStatus === 'offline' ? 'Offline' : 'Checking...'}
            </span>
          </div>
        </div>
      </div>

      {/* Server Status Warning */}
      {serverStatus === 'offline' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 text-sm">
              Server is offline. Please start the backend server to post comments.
            </span>
          </div>
        </div>
      )}

      {/* Comment Input */}
      <div className="mb-6">
        {userInfo.isLoggedIn ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span>Commenting as {userInfo.name}</span>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setUserInfo({ name: '', isLoggedIn: false });
                  localStorage.removeItem('prtu-user-info');
                  console.log('User signed out and info cleared from localStorage');
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || serverStatus === 'offline'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Post Comment
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-3">Join the conversation</p>
            <button
              onClick={handleLoginPrompt}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In to Comment
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            {/* Main Comment */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{comment.author}</h4>
                  <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center space-x-1 text-xs transition-colors ${
                      comment.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && userInfo.isLoggedIn && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 pl-6 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {reply.author.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="text-xs font-medium text-gray-900">{reply.author}</h5>
                            <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                          </div>
                          <p className="text-gray-700 text-xs mb-2">{reply.content}</p>
                          <button
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className={`flex items-center space-x-1 text-xs transition-colors ${
                              reply.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <svg className="w-3 h-3" fill={reply.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>No comments yet. Be the first to start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
