import React from 'react';
import type { User, Page } from '../types';
import { PAGE_PERMISSIONS } from '../permissions';

const BeeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M21.75,9.5c0,4.7-3.7,8.5-8.25,8.5h-3c-4.55,0-8.25-3.8-8.25-8.5s3.7-8.5,8.25-8.5h3C18.05,1,21.75,4.8,21.75,9.5z M19.75,9.5c0-3.6-2.8-6.5-6.25-6.5h-3c-3.45,0-6.25,2.9-6.25,6.5s2.8,6.5,6.25,6.5h3C16.95,16,19.75,13.1,19.75,9.5z" />
    <path d="M6,8H4.5V11H6V8z M9,7H7.5v4H9V7z M12,7h-1.5v4H12V7z M15,7h-1.5v4H15V7z M18,8h-1.5v3H18V8z" />
    <path d="M7.5,5.5A1.5,1.5,0,0,1,6,4V2.5A1.5,1.5,0,0,1,7.5,1h0A1.5,1.5,0,0,1,9,2.5V4A1.5,1.5,0,0,1,7.5,5.5Z" transform="rotate(-30 7.5 3.5)" />
    <path d="M16.5,5.5A1.5,1.5,0,0,0,18,4V2.5A1.5,1.5,0,0,0,16.5,1h0A1.5,1.5,0,0,0,15,2.5V4A1.5,1.5,0,0,0,16.5,5.5Z" transform="rotate(30 16.5 3.5)" />
  </svg>
);

interface HeaderProps {
    currentUser: User;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, currentPage, onNavigate, onLogout }) => {
    const availableNavItems = PAGE_PERMISSIONS[currentUser.role] || [];

    return (
        <header className="bg-bpass-gray shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Nav */}
                    <div className="flex items-center space-x-8">
                         <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('Dashboard')}>
                            <BeeIcon className="h-8 w-8 text-bpass-yellow" />
                            <span className="text-2xl font-bold text-bpass-yellow">BeePass</span>
                        </div>
                        <nav className="hidden md:flex space-x-6">
                            {availableNavItems.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => onNavigate(page)}
                                    className={`text-sm font-medium transition-colors ${
                                        currentPage === page
                                            ? 'text-bpass-yellow'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* User Info and Logout */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">{currentUser.name}</p>
                            <p className="text-xs text-gray-400">{currentUser.role}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-bpass-light-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bpass-gray focus:ring-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;