import React, { useState } from 'react';
import { mockAdmins, ADMIN_PASSWORD, EDITOR_PASSWORD } from './data';
import type { AdminCredentials, Page } from './types';

interface LoginProps {
  setCurrentPage: (page: Page) => void;
  setIsLoggedIn: (status: boolean) => void;
  setCurrentAdmin: (username: string) => void;
}

const AdminLogin = ({ setCurrentPage, setIsLoggedIn, setCurrentAdmin }: LoginProps) => {
  const [credentials, setCredentials] = useState<AdminCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const admin = mockAdmins.find(a => a.username === credentials.username);
    
    if (!admin) {
      setError('Invalid username');
      return;
    }
    
    const correctPassword = admin.role === 'admin' ? ADMIN_PASSWORD : EDITOR_PASSWORD;
    
    if (credentials.password !== correctPassword) {
      setError('Invalid password');
      return;
    }
    
    setIsLoggedIn(true);
    setCurrentAdmin(admin.username);
    setCurrentPage('Admin');
  };
  
  const handleGoBack = () => {
    setCurrentPage('Home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <button 
          onClick={handleGoBack} 
          className="text-blue-600 hover:text-blue-800 mb-6 flex items-center"
        >
          &larr; Back to Home
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to manage website content</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For demo: username "admin" with password "prtu@admin123"</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
