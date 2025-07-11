export type Page = 'Home' | 'News & Updates' | 'Events & Gallery' | 'Resources' | 'Leadership' | 'Community' | 'About Us' | 'Developers' | 'Admin' | 'Member Portal';

// Admin-specific types
export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'editor';
}

// Existing types
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: 'G.O.' | 'Event' | 'Announcement' | 'Transfer' | 'Meeting';
  date: string;
  imageUrl?: string;
}

export interface GovernmentOrder {
  id: number;
  goNumber: string;
  title: string;
  date: string;
  url: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    category: 'Syllabus' | 'RTI' | 'Leave Rules' | 'Union Forms';
    url: string;
}

export interface Leader {
    id: number;
    name: string;
    designation: string;
    district: string;
    contact: string;
    imageUrl: string;
    bio: string;
}

// Member Portal types
export interface Member {
    receipt_number: string;
    timestamp: string;
    district: string;
    mandal: string;
    teacher_name: string;
    institution: string;
    management: string;
    designation: string;
    treasury_id: string;
    phone: string;
    nominee_name_1: string;
    nominee_relation_1: string;
    nominee_name_2: string;
    nominee_relation_2: string;
}