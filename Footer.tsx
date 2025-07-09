import React from 'react';
import type { Page } from './types';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}

const Footer = ({ setCurrentPage }: FooterProps) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <footer className="bg-blue-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">PRTU Telangana</h3>
                        <p className="text-sm text-blue-200">Progressive Recognized Teachers Union, committed to the welfare and rights of teachers across Telangana.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'Home')} className="text-blue-200 hover:text-white">Home</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'News & Updates')} className="text-blue-200 hover:text-white">News & Updates</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'About Us')} className="text-blue-200 hover:text-white">About Us</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'Resources')} className="text-blue-200 hover:text-white">Resources</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'Contact Us')} className="text-blue-200 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <address className="text-sm text-blue-200 not-italic space-y-2">
                            <p>PRTU State Office, Hyderabad</p>
                            <p>Email: <a href="mailto:contact@prtuts.org" className="hover:text-white">contact@prtuts.org</a></p>
                            <p>Phone: <a href="tel:+91-1234567890" className="hover:text-white">+91-1234567890</a></p>
                        </address>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Development Team</h3>
                        <a 
                            href="#" 
                            onClick={(e) => handleNavClick(e, 'Developers')} 
                            className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors"
                        >
                            Meet the Team
                        </a>
                    </div>
                </div>
                <div className="mt-8 border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
                    <p>&copy; {new Date().getFullYear()} PRTU Telangana. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;