import { useState } from 'react';
import { LogoutIcon, NewsIcon, CalendarIcon, DocumentIcon, UserIcon, ArrowLeftIcon, ResourceIcon } from './Icons';
import AdminNewsPage from './admin/AdminNewsPage.js';
import AdminEventsPage from './admin/AdminEventsPage.js';
import AdminResourcesPage from './admin/AdminResourcesPage.js';
import AdminLeadershipPage from './admin/AdminLeadershipPage.js';
import AdminGOsPage from './admin/AdminGOsPage.js';
import type { Page } from './types';

type AdminSection = 'News' | 'Events' | 'GOs' | 'Resources' | 'Leadership' | 'Dashboard';

interface AdminPageProps {
  setCurrentPage: (page: Page) => void;
  setIsLoggedIn: (status: boolean) => void;
  currentAdmin: string;
}

const AdminPage = ({ setCurrentPage, setIsLoggedIn, currentAdmin }: AdminPageProps) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('Dashboard');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Home');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'News':
        return <AdminNewsPage />;
      case 'Events':
        return <AdminEventsPage />;
      case 'GOs':
        return <AdminGOsPage />;
      case 'Resources':
        return <AdminResourcesPage />;
      case 'Leadership':
        return <AdminLeadershipPage />;
      case 'Dashboard':
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Welcome to the Admin Dashboard</h2>
            <p className="text-gray-600 mb-4">
              You are logged in as <span className="font-semibold">{currentAdmin}</span>
            </p>
            <p className="text-gray-600 mb-8">
              Use the sidebar to navigate to different sections of the admin portal.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'News & Updates', icon: NewsIcon, section: 'News' },
                { name: 'Events & Gallery', icon: CalendarIcon, section: 'Events' },
                { name: 'Government Orders', icon: DocumentIcon, section: 'GOs' },
                { name: 'Resources', icon: ResourceIcon, section: 'Resources' },
                { name: 'Leadership', icon: UserIcon, section: 'Leadership' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.section as AdminSection)}
                  className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <item.icon className="w-12 h-12 text-blue-900 mb-3" />
                  <span className="text-lg font-medium text-gray-800">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-5 border-b border-blue-800">
          <h2 className="text-xl font-bold">PRTU Admin</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <button
            onClick={() => setActiveSection('Dashboard')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'Dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveSection('News')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'News' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>News & Updates</span>
          </button>
          
          <button
            onClick={() => setActiveSection('Events')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'Events' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>Events & Gallery</span>
          </button>
          
          <button
            onClick={() => setActiveSection('GOs')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'GOs' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>Government Orders</span>
          </button>
          
          <button
            onClick={() => setActiveSection('Resources')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'Resources' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>Resources</span>
          </button>
          
          <button
            onClick={() => setActiveSection('Leadership')}
            className={`flex items-center w-full px-5 py-3 transition-colors ${
              activeSection === 'Leadership' ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            <span>Leadership</span>
          </button>
        </nav>
        
        <div className="p-5 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-orange-300 transition-colors"
          >
            <LogoutIcon className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 px-8">
          {activeSection !== 'Dashboard' && (
            <button
              onClick={() => setActiveSection('Dashboard')}
              className="mb-4 flex items-center text-blue-900 hover:text-blue-700"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              <span>Back to Dashboard</span>
            </button>
          )}
          
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
