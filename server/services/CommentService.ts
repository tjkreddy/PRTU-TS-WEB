import { Collection, ObjectId } from 'mongodb';
import DatabaseConnection from '../database.js';
import { Comment, CommentCreateRequest, CommentUpdateRequest, CommentResponse } from '../models/Comment.js';

export class CommentService {
  private collection: Collection<Comment>;

  constructor() {
    const db = DatabaseConnection.getInstance().getDb();
    this.collection = db.collection<Comment>('comments');
  }

  async createComment(commentData: CommentCreateRequest, userId: string = 'anonymous'): Promise<CommentResponse> {
    try {
      const comment: Comment = {
        id: new ObjectId().toString(),
        author: commentData.author,
        content: commentData.content,
        timestamp: new Date(),
        pageContext: commentData.pageContext,
        likes: 0,
        likedBy: [],
        parentId: commentData.parentId,
        isReply: !!commentData.parentId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log(`📝 Creating comment for user: ${userId}, author: ${commentData.author}`);
      const result = await this.collection.insertOne(comment);
      console.log(`✅ Comment created with ID: ${comment.id}`);
      
      return {
        id: comment.id,
        author: comment.author,
        content: comment.content,
        timestamp: comment.timestamp,
        pageContext: comment.pageContext,
        likes: comment.likes,
        isLiked: false,
        parentId: comment.parentId,
        isReply: comment.isReply,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      };
    } catch (error) {
      console.error('❌ Error creating comment:', error);
      throw error;
    }
  }

  async getCommentsByPageContext(pageContext: string, userId: string = 'anonymous'): Promise<CommentResponse[]> {
    const comments = await this.collection.find({ 
      pageContext, 
      isReply: false 
    }).sort({ timestamp: -1 }).toArray();

    const commentResponses: CommentResponse[] = [];

    for (const comment of comments) {
      const replies = await this.collection.find({ 
        parentId: comment.id,
        pageContext 
      }).sort({ timestamp: 1 }).toArray();

      const replyResponses: CommentResponse[] = replies.map(reply => ({
        id: reply.id,
        author: reply.author,
        content: reply.content,
        timestamp: reply.timestamp,
        pageContext: reply.pageContext,
        likes: reply.likes,
        isLiked: reply.likedBy.includes(userId),
        parentId: reply.parentId,
        isReply: reply.isReply,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt
      }));

      commentResponses.push({
        id: comment.id,
        author: comment.author,
        content: comment.content,
        timestamp: comment.timestamp,
        pageContext: comment.pageContext,
        likes: comment.likes,
        isLiked: comment.likedBy.includes(userId),
        parentId: comment.parentId,
        isReply: comment.isReply,
        replies: replyResponses,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });
    }

    return commentResponses;
  }

  async toggleLike(commentId: string, userId: string): Promise<CommentResponse | null> {
    const comment = await this.collection.findOne({ id: commentId });
    if (!comment) return null;

    const isLiked = comment.likedBy.includes(userId);
    
    let updateOperation;
    if (isLiked) {
      updateOperation = {
        $pull: { likedBy: userId },
        $inc: { likes: -1 },
        $set: { updatedAt: new Date() }
      };
    } else {
      updateOperation = {
        $push: { likedBy: userId },
        $inc: { likes: 1 },
        $set: { updatedAt: new Date() }
      };
    }

    await this.collection.updateOne({ id: commentId }, updateOperation);
    
    const updatedComment = await this.collection.findOne({ id: commentId });
    if (!updatedComment) return null;

    return {
      id: updatedComment.id,
      author: updatedComment.author,
      content: updatedComment.content,
      timestamp: updatedComment.timestamp,
      pageContext: updatedComment.pageContext,
      likes: updatedComment.likes,
      isLiked: !isLiked,
      parentId: updatedComment.parentId,
      isReply: updatedComment.isReply,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt
    };
  }

  async deleteComment(commentId: string): Promise<boolean> {
    // Delete the comment and all its replies
    const result1 = await this.collection.deleteOne({ id: commentId });
    const result2 = await this.collection.deleteMany({ parentId: commentId });
    
    return result1.deletedCount > 0;
  }

  async updateComment(commentId: string, updateData: CommentUpdateRequest): Promise<CommentResponse | null> {
    const updateOperation = {
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    };

    await this.collection.updateOne({ id: commentId }, updateOperation);
    
    const updatedComment = await this.collection.findOne({ id: commentId });
    if (!updatedComment) return null;

    return {
      id: updatedComment.id,
      author: updatedComment.author,
      content: updatedComment.content,
      timestamp: updatedComment.timestamp,
      pageContext: updatedComment.pageContext,
      likes: updatedComment.likes,
      isLiked: false, // This would need userId context
      parentId: updatedComment.parentId,
      isReply: updatedComment.isReply,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt
    };
  }

  async getCommentStats(pageContext: string): Promise<{totalComments: number, totalReplies: number}> {
    const totalComments = await this.collection.countDocuments({ pageContext, isReply: false });
    const totalReplies = await this.collection.countDocuments({ pageContext, isReply: true });
    
    return { totalComments, totalReplies };
  }
}
