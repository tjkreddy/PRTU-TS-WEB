import { useState } from 'react';
import type { Page } from './types';

import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import EventsPage from './EventsPage';
import ResourcesPage from './ResourcesPage';
import LeadershipPage from './LeadershipPage';
import ContactPage from './ContactPage';
import PWAInstall from './PWAInstall';
import PWAUpdate from './PWAUpdate';
import BottomNavigation from './BottomNavigation';

const App = () => {
    const [currentPage, setCurrentPage] = useState<Page>('Home');

    const renderPage = () => {
        switch (currentPage) {
            case 'News & Updates':
                return <NewsPage />;
            case 'Events & Gallery':
                return <EventsPage />;
            case 'Resources':
                return <ResourcesPage />;
            case 'Leadership':
                return <LeadershipPage />;
            case 'Contact Us':
                return <ContactPage />;
            case 'Home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="bg-gray-50 font-sans antialiased">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="pb-16 md:pb-0">
                {renderPage()}
            </main>
            <Footer setCurrentPage={setCurrentPage} />
            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <PWAInstall />
            <PWAUpdate />
        </div>
    );
};

export default App;