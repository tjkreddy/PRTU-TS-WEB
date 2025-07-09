import type { Page } from './types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header = ({ currentPage, setCurrentPage }: HeaderProps) => {
    const navLinks: { name: Page }[] = [
        { name: 'Home' },
        { name: 'News & Updates' },
        { name: 'Events & Gallery' },
        { name: 'Community' },
        { name: 'Resources' },
        { name: 'Leadership' },
        { name: 'Contact Us' }
    ];
    
    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNavClick('Home')} className="flex items-center space-x-2">
                             <span className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">P</span>
                             <span className="font-bold text-lg md:text-xl text-blue-900">PRTU Telangana</span>
                        </button>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(({ name }) => (
                                <button 
                                    key={name} 
                                    onClick={() => handleNavClick(name)} 
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        currentPage === name ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </nav>
                    
                    {/* Desktop Member Portal */}
                    <div className="hidden md:block">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors shadow">
                            Member Portal
                        </button>
                    </div>
                    
                    {/* Mobile - Show nothing, bottom nav handles it */}
                    <div className="md:hidden">
                        {/* Empty space to balance the layout */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;