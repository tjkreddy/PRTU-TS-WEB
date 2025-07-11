import type { Page } from './types';

interface BottomNavigationProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const BottomNavigation = ({ currentPage, setCurrentPage }: BottomNavigationProps) => {
    const navItems = [
        {
            name: 'Home' as Page,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            label: 'Home'
        },
        {
            name: 'News & Updates' as Page,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            label: 'News'
        },
        {
            name: 'Events & Gallery' as Page,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Events'
        },
        {
            name: 'Community' as Page,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            label: 'Chat'
        },
        {
            name: 'Resources' as Page,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            label: 'Resources'
        }
    ];

    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* Mobile Floating Action Button for Member Portal */}
            <div className="md:hidden fixed bottom-20 right-4 z-40">
                <button 
                    onClick={() => handleNavClick('Member Portal')}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    title="Member Portal"
                    aria-label="Open Member Portal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>
            </div>

            {/* Mobile Floating Action Button for Admin Portal - positioned to the left of Member Portal */}
            <div className="md:hidden fixed bottom-20 right-20 z-40">
                <button 
                    onClick={() => handleNavClick('Admin')}
                    className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    title="Admin Portal"
                    aria-label="Open Admin Portal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            {/* Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-white border-t border-gray-200 shadow-lg backdrop-blur-md bg-white/95 pb-safe">
                    <div className="grid grid-cols-5 px-2 py-2">
                        {navItems.map((item) => {
                            const isActive = currentPage === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.name)}
                                    className={`relative flex flex-col items-center justify-center py-4 px-1 transition-all duration-200 ${
                                        isActive
                                            ? 'text-blue-600'
                                            : 'text-gray-500 hover:text-blue-600'
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
                                    )}
                                    <div className={`transition-all duration-200 ${
                                        isActive ? 'scale-110 -translate-y-0.5' : ''
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
                                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                                    }`}>
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-blue-50 rounded-lg -z-10 scale-110"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BottomNavigation;
