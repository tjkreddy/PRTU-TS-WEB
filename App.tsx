import { useState } from 'react';
import type { Page } from './types';

import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import EventsPage from './EventsPage';
import ResourcesPage from './ResourcesPage';
import LeadershipPage from './LeadershipPage';
import CommunityPage from './CommunityPage';
import AboutPage from './AboutPage';
import DevelopersPage from './DevelopersPage';
import PWAInstall from './PWAInstall';
import PWAUpdate from './PWAUpdate';
import BottomNavigation from './BottomNavigation';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import { AppProvider } from './AppContext';

const App = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState('');

    const renderPage = () => {
        if (currentPage === 'Admin') {
            if (!isLoggedIn) {
                return <AdminLogin setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} setCurrentAdmin={setCurrentAdmin} />;
            }
            return <AdminPage setCurrentPage={setCurrentPage} setIsLoggedIn={setIsLoggedIn} currentAdmin={currentAdmin} />;
        }

        switch (currentPage) {
            case 'News & Updates':
                return <NewsPage />;
            case 'Events & Gallery':
                return <EventsPage />;
            case 'Community':
                return <CommunityPage />;
            case 'Resources':
                return <ResourcesPage />;
            case 'Leadership':
                return <LeadershipPage />;
            case 'About Us':
                return <AboutPage />;
            case 'Developers':
                return <DevelopersPage />;
            case 'Home':
            default:
                return <HomePage />;
        }
    };

    const showHeaderFooter = currentPage !== 'Admin' || !isLoggedIn;

    return (
        <AppProvider>
            <div className="bg-gray-50 font-sans antialiased">
                {showHeaderFooter && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                <main className={`${showHeaderFooter ? 'pb-16 md:pb-0' : ''}`}>
                    {renderPage()}
                </main>
                {showHeaderFooter && (
                    <>
                        <Footer setCurrentPage={setCurrentPage} />
                        <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </>
                )}
                <PWAInstall />
                <PWAUpdate />
            </div>
        </AppProvider>
    );
};

export default App;