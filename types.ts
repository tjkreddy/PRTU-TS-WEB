export type Page = 'Home' | 'News & Updates' | 'Events & Gallery' | 'Resources' | 'Leadership' | 'Community' | 'About Us' | 'Developers';

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