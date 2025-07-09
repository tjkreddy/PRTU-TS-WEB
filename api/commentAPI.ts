// API service for community comments
const API_BASE_URL = 'http://localhost:5000/api';

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  pageContext: string;
  likes: number;
  isLiked: boolean;
  parentId?: string;
  isReply: boolean;
  replies?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentRequest {
  author: string;
  content: string;
  pageContext: string;
  parentId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class CommentAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'user-id': this.getUserId(),
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private getUserId(): string {
    // Get or create a user ID from localStorage
    let userId = localStorage.getItem('prtu-user-id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('prtu-user-id', userId);
    }
    return userId;
  }

  async getComments(pageContext: string): Promise<Comment[]> {
    const response = await this.request<Comment[]>(`/comments/${pageContext}`);
    if (response.success && response.data) {
      // Convert timestamp strings to Date objects
      return response.data.map(comment => ({
        ...comment,
        timestamp: new Date(comment.timestamp),
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
        replies: comment.replies?.map(reply => ({
          ...reply,
          timestamp: new Date(reply.timestamp),
          createdAt: new Date(reply.createdAt),
          updatedAt: new Date(reply.updatedAt)
        }))
      }));
    }
    return [];
  }

  async createComment(commentData: CreateCommentRequest): Promise<Comment | null> {
    const response = await this.request<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData)
    });

    if (response.success && response.data) {
      return {
        ...response.data,
        timestamp: new Date(response.data.timestamp),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt)
      };
    }
    return null;
  }

  async toggleLike(commentId: string): Promise<Comment | null> {
    const response = await this.request<Comment>(`/comments/${commentId}/like`, {
      method: 'POST'
    });

    if (response.success && response.data) {
      return {
        ...response.data,
        timestamp: new Date(response.data.timestamp),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt)
      };
    }
    return null;
  }

  async deleteComment(commentId: string): Promise<boolean> {
    const response = await this.request(`/comments/${commentId}`, {
      method: 'DELETE'
    });

    return response.success;
  }

  async getCommentStats(pageContext: string): Promise<{totalComments: number, totalReplies: number}> {
    const response = await this.request<{totalComments: number, totalReplies: number}>(`/comments/${pageContext}/stats`);
    return response.data || { totalComments: 0, totalReplies: 0 };
  }
}

export const commentAPI = new CommentAPI();
