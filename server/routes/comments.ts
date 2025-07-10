import express from 'express';
import { CommentService } from '../services/CommentService.js';

const router = express.Router();

// Get comments for a specific page context
router.get('/comments/:pageContext', async (req, res) => {
  try {
    const { pageContext } = req.params;
    const userId = req.headers['user-id'] as string || 'anonymous';
    
    const commentService = new CommentService();
    const comments = await commentService.getCommentsByPageContext(pageContext, userId);
    
    res.json({
      success: true,
      data: comments
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
router.post('/comments', async (req, res) => {
  try {
    const { author, content, pageContext, parentId } = req.body;
    const userId = req.headers['user-id'] as string || 'anonymous';
    
    if (!author || !content || !pageContext) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: author, content, pageContext'
      });
    }

    const commentService = new CommentService();
    const comment = await commentService.createComment({
      author,
      content,
      pageContext,
      parentId
    }, userId);
    
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
router.post('/comments/:commentId/like', async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.headers['user-id'] as string || 'anonymous';
    
    const commentService = new CommentService();
    const comment = await commentService.toggleLike(commentId, userId);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }
    
    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle like'
    });
  }
});

// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    
    const commentService = new CommentService();
    const deleted = await commentService.deleteComment(commentId);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete comment'
    });
  }
});

// Get comment stats for a page
router.get('/comments/:pageContext/stats', async (req, res) => {
  try {
    const { pageContext } = req.params;
    
    const commentService = new CommentService();
    const stats = await commentService.getCommentStats(pageContext);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching comment stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comment stats'
    });
  }
});

export default router;
