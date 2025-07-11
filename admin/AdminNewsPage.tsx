import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '../Icons';
import type { NewsArticle } from '../types';
import { useAppContext } from '../AppContext';

const AdminNewsPage = () => {
  const { state, updateNews } = useAppContext();
  const [news, setNews] = useState<NewsArticle[]>(state.news);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsArticle | null>(null);
  
  const categories: NewsArticle['category'][] = ['Announcement', 'G.O.', 'Event', 'Transfer', 'Meeting'];
  
  const handleAddNews = () => {
    setIsAddingNews(true);
    setCurrentNews({
      id: Math.max(0, ...news.map(n => n.id)) + 1,
      title: '',
      excerpt: '',
      content: '',
      category: 'Announcement',
      date: new Date().toISOString().split('T')[0],
      imageUrl: ''
    });
  };
  
  const handleEditNews = (newsItem: NewsArticle) => {
    setIsEditingNews(true);
    setCurrentNews({...newsItem});
  };
  
  const handleDeleteNews = (id: number) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      const updatedNews = news.filter(n => n.id !== id);
      setNews(updatedNews);
      updateNews(updatedNews);
    }
  };
  
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentNews) return;
    
    let updatedNews: NewsArticle[];
    
    if (isAddingNews) {
      updatedNews = [...news, currentNews];
      setNews(updatedNews);
      setIsAddingNews(false);
    } else if (isEditingNews) {
      updatedNews = news.map(n => n.id === currentNews.id ? currentNews : n);
      setNews(updatedNews);
      setIsEditingNews(false);
    } else {
      return;
    }
    
    // Update the global state
    updateNews(updatedNews);
    setCurrentNews(null);
  };
  
  const handleCancelEdit = () => {
    setIsAddingNews(false);
    setIsEditingNews(false);
    setCurrentNews(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentNews) return;
    
    const { name, value } = e.target;
    setCurrentNews({
      ...currentNews,
      [name]: value
    });
  };
  
  if (isAddingNews || isEditingNews) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {isAddingNews ? 'Add New Article' : 'Edit Article'}
        </h2>
        
        <form onSubmit={handleSaveNews}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentNews?.title || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={currentNews?.excerpt || ''}
              onChange={handleInputChange}
              rows={2}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={currentNews?.content || ''}
              onChange={handleInputChange}
              rows={5}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={currentNews?.category || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={currentNews?.date || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={currentNews?.imageUrl || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Manage News & Updates</h2>
        <button
          onClick={handleAddNews}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add News
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map(newsItem => (
              <tr key={newsItem.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{newsItem.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {newsItem.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{newsItem.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditNews(newsItem)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteNews(newsItem.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNewsPage;
