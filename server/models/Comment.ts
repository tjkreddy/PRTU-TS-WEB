import { ObjectId } from 'mongodb';

export interface Comment {
  _id?: ObjectId;
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  pageContext: string;
  likes: number;
  likedBy: string[];
  parentId?: string; // For replies
  isReply: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCreateRequest {
  author: string;
  content: string;
  pageContext: string;
  parentId?: string;
}

export interface CommentUpdateRequest {
  content?: string;
  likes?: number;
  likedBy?: string[];
}

export interface CommentResponse {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  pageContext: string;
  likes: number;
  isLiked: boolean;
  parentId?: string;
  isReply: boolean;
  replies?: CommentResponse[];
  createdAt: Date;
  updatedAt: Date;
}
