import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '../Icons';
import type { GovernmentOrder } from '../types';
import { useAppContext } from '../AppContext';

const AdminGOsPage = () => {
  const { state, updateGOs } = useAppContext();
  const [gos, setGos] = useState<GovernmentOrder[]>(state.gos);
  const [isAddingGO, setIsAddingGO] = useState(false);
  const [isEditingGO, setIsEditingGO] = useState(false);
  const [currentGO, setCurrentGO] = useState<GovernmentOrder | null>(null);
  
  const handleAddGO = () => {
    setIsAddingGO(true);
    setCurrentGO({
      id: Math.max(0, ...gos.map(g => g.id)) + 1,
      goNumber: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      url: ''
    });
  };
  
  const handleEditGO = (go: GovernmentOrder) => {
    setIsEditingGO(true);
    setCurrentGO({...go});
  };
  
  const handleDeleteGO = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Government Order?')) {
      const updatedGOs = gos.filter(g => g.id !== id);
      setGos(updatedGOs);
      updateGOs(updatedGOs);
    }
  };
  
  const handleSaveGO = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentGO) return;
    
    let updatedGOs: GovernmentOrder[];
    
    if (isAddingGO) {
      updatedGOs = [...gos, currentGO];
      setGos(updatedGOs);
      setIsAddingGO(false);
    } else if (isEditingGO) {
      updatedGOs = gos.map(g => g.id === currentGO.id ? currentGO : g);
      setGos(updatedGOs);
      setIsEditingGO(false);
    } else {
      return;
    }
    
    // Update the global state
    updateGOs(updatedGOs);
    setCurrentGO(null);
  };
  
  const handleCancelEdit = () => {
    setIsAddingGO(false);
    setIsEditingGO(false);
    setCurrentGO(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentGO) return;
    
    const { name, value } = e.target;
    setCurrentGO({
      ...currentGO,
      [name]: value
    });
  };
  
  if (isAddingGO || isEditingGO) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {isAddingGO ? 'Add New Government Order' : 'Edit Government Order'}
        </h2>
        
        <form onSubmit={handleSaveGO}>
          <div className="mb-4">
            <label htmlFor="goNumber" className="block text-gray-700 font-medium mb-2">GO Number</label>
            <input
              type="text"
              id="goNumber"
              name="goNumber"
              value={currentGO?.goNumber || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentGO?.title || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={currentGO?.date || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-700 font-medium mb-2">Document URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={currentGO?.url || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/document.pdf"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
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
        <h2 className="text-2xl font-bold text-blue-900">Manage Government Orders</h2>
        <button
          onClick={handleAddGO}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add G.O.
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GO Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gos.map(go => (
              <tr key={go.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{go.goNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{go.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{go.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditGO(go)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteGO(go.id)}
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

export default AdminGOsPage;
