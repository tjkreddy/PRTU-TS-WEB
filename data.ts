import type { NewsArticle, GovernmentOrder, Event, Resource, Leader, AdminUser } from './types';

const samplePdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

// Admin users
export const mockAdmins: AdminUser[] = [
  { id: 1, username: 'admin', name: 'Admin User', role: 'admin' },
  { id: 2, username: 'editor', name: 'Content Editor', role: 'editor' }
];

// Admin passwords (in a real app, these would be securely stored on the server)
export const ADMIN_PASSWORD = 'prtu@admin123';
export const EDITOR_PASSWORD = 'prtu@editor123';

export const mockNews: NewsArticle[] = [
  { id: 1, title: 'New Pay Revision Commission (PRC) Announced', excerpt: 'The state government has announced the formation of a new PRC for all government employees...', content: 'Full details about the PRC announcement...', category: 'Announcement', date: '2024-07-28', imageUrl: 'https://picsum.photos/400/224?random=1' },
  { id: 2, title: 'Guidelines for Teacher Transfers Released', excerpt: 'The education department has released the final guidelines and schedule for the upcoming teacher transfers...', content: 'Full details about the transfer guidelines...', category: 'Transfer', date: '2024-07-25', imageUrl: 'https://picsum.photos/400/224?random=2' },
  { id: 3, title: 'PRTU State Council Meeting Highlights', excerpt: 'Key decisions were made during the state council meeting held in Hyderabad regarding member welfare...', content: 'Full details about the meeting highlights...', category: 'Meeting', date: '2024-07-22', imageUrl: 'https://picsum.photos/400/224?random=3' },
  { id: 4, title: 'G.O. on Health Cards Issued', excerpt: 'The government has issued a new G.O. regarding the implementation of health cards for teachers and their families.', content: 'Detailed information on the new health card scheme.', category: 'G.O.', date: '2024-07-20', imageUrl: 'https://picsum.photos/400/224?random=4' },
  { id: 5, title: 'Annual Sports Meet Announced', excerpt: 'PRTU is pleased to announce the annual state-level sports meet for teachers. Registrations are now open.', content: 'Schedule, venue, and registration details for the upcoming sports meet.', category: 'Event', date: '2024-07-18', imageUrl: 'https://picsum.photos/400/224?random=5' },
];

export const mockGos: GovernmentOrder[] = [
  { id: 1, goNumber: 'G.O. Ms. No. 112', title: 'Implementation of Health Cards for Employees', date: '2024-07-15', url: samplePdfUrl },
  { id: 2, goNumber: 'G.O. Ms. No. 108', title: 'Sanction of DA Arrears', date: '2024-07-10', url: samplePdfUrl },
  { id: 3, goNumber: 'G.O. Ms. No. 95', title: 'Revised Leave Rules for Teachers', date: '2024-06-28', url: samplePdfUrl },
];

export const mockEvents: Event[] = [
    { id: 1, title: 'State Level General Body Meeting', date: '2024-08-15', location: 'Hyderabad', description: 'The annual general body meeting to discuss union progress and future strategy. All members are invited.', imageUrl: 'https://picsum.photos/400/300?random=11' },
    { id: 2, title: 'District Leaders Conference', date: '2024-09-05', location: 'Warangal', description: 'A conference for all district-level leaders to align on goals and share best practices.', imageUrl: 'https://picsum.photos/400/300?random=12' },
    { id: 3, title: 'Teachers Day Celebrations', date: '2024-09-05', location: 'All Districts', description: 'Celebrating the contribution of teachers across the state. Special events will be held in each district.', imageUrl: 'https://picsum.photos/400/300?random=13' },
    { id: 4, title: 'Pension Adalat for Retired Teachers', date: '2024-10-10', location: 'Karimnagar', description: 'A special event to address pension-related grievances of our retired members.', imageUrl: 'https://picsum.photos/400/300?random=14' },
];

export const mockResources: Resource[] = [
    { id: 1, title: 'Primary School Syllabus (Classes 1-5)', description: 'The latest updated syllabus for all subjects for primary classes.', category: 'Syllabus', url: samplePdfUrl },
    { id: 2, title: 'High School Syllabus (Classes 6-10)', description: 'The latest updated syllabus for all subjects for high school classes.', category: 'Syllabus', url: samplePdfUrl },
    { id: 3, title: 'RTI Application Form', description: 'Standard format for filing a Right to Information (RTI) application.', category: 'RTI', url: samplePdfUrl },
    { id: 4, title: 'Casual Leave Application Form', description: 'Downloadable form for applying for casual leave.', category: 'Leave Rules', url: samplePdfUrl },
    { id: 5, title: 'Medical Leave Guidelines & Form', description: 'Official guidelines and application form for medical leave.', category: 'Leave Rules', url: samplePdfUrl },
    { id: 6, title: 'PRTU Membership Application', description: 'Form to apply for or renew membership with PRTU Telangana.', category: 'Union Forms', url: samplePdfUrl },
];

export const mockLeaders: Leader[] = [
    { id: 1, name: 'S. Mohan Reddy', designation: 'State President', district: 'State Body', contact: 'president@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=21', bio: 'A visionary leader with over 20 years of experience fighting for teacher rights.' },
    { id: 2, name: 'K. Ramesh Kumar', designation: 'General Secretary', district: 'State Body', contact: 'gensec@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=22', bio: 'Dedicated to strengthening the union from the grassroots level.' },
    { id: 3, name: 'A. Lakshmi', designation: 'Treasurer', district: 'State Body', contact: 'treasurer@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=23', bio: 'Ensuring financial transparency and stability for the union.' },
    { id: 4, name: 'B. Srinivas', designation: 'President', district: 'Hyderabad', contact: 'hyd.pres@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=24', bio: 'Leading the union\'s activities in the bustling capital district.' },
    { id: 5, name: 'P. Kavitha', designation: 'President', district: 'Warangal', contact: 'wgl.pres@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=25', bio: 'A dynamic leader focused on empowering female teachers in the region.' },
    { id: 6, name: 'V. Anand Rao', designation: 'President', district: 'Karimnagar', contact: 'knr.pres@prtuts.org', imageUrl: 'https://picsum.photos/128/128?random=26', bio: 'Working tirelessly to address the unique challenges of teachers in Karimnagar.' },
];