import React, { useState } from 'react';
import { MenuIcon, XIcon } from './Icons';
import type { Page } from './types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Header = ({ currentPage, setCurrentPage }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks: { name: Page }[] = [
        { name: 'Home' },
        { name: 'News & Updates' },
        { name: 'Events & Gallery' },
        { name: 'Resources' },
        { name: 'Leadership' },
        { name: 'Contact Us' }
    ];
    
    const handleNavClick = (page: Page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" onClick={() => handleNavClick('Home')} className="flex items-center space-x-2">
                             <span className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">P</span>
                             <span className="font-bold text-xl text-blue-900">PRTU Telangana</span>
                        </a>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(({ name }) => (
                                <a key={name} href="#" onClick={() => handleNavClick(name)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === name ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'}`}>{name}</a>
                            ))}
                        </div>
                    </nav>
                     <div className="hidden md:block">
                        <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors shadow">
                            Member Portal
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-orange-500 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(({ name }) => (
                            <a key={name} href="#" onClick={() => handleNavClick(name)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === name ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'}`}>{name}</a>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                         <div className="px-5">
                             <a href="#" className="w-full flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors shadow">
                                Member Portal
                            </a>
                         </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;