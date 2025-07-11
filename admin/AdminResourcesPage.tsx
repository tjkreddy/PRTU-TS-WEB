import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '../Icons';
import type { Resource } from '../types';
import { useAppContext } from '../AppContext';

const AdminResourcesPage = () => {
  const { state, updateResources } = useAppContext();
  const [resources, setResources] = useState<Resource[]>(state.resources);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  
  const categories: Resource['category'][] = ['Syllabus', 'RTI', 'Leave Rules', 'Union Forms'];
  
  const handleAddResource = () => {
    setIsAddingResource(true);
    setCurrentResource({
      id: Math.max(0, ...resources.map(r => r.id)) + 1,
      title: '',
      description: '',
      category: 'Syllabus',
      url: ''
    });
  };
  
  const handleEditResource = (resource: Resource) => {
    setIsEditingResource(true);
    setCurrentResource({...resource});
  };
  
  const handleDeleteResource = (id: number) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(r => r.id !== id);
      setResources(updatedResources);
      updateResources(updatedResources);
    }
  };
  
  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentResource) return;
    
    let updatedResources: Resource[];
    
    if (isAddingResource) {
      updatedResources = [...resources, currentResource];
      setResources(updatedResources);
      setIsAddingResource(false);
    } else if (isEditingResource) {
      updatedResources = resources.map(r => r.id === currentResource.id ? currentResource : r);
      setResources(updatedResources);
      setIsEditingResource(false);
    } else {
      return;
    }
    
    // Update the global state
    updateResources(updatedResources);
    setCurrentResource(null);
  };
  
  const handleCancelEdit = () => {
    setIsAddingResource(false);
    setIsEditingResource(false);
    setCurrentResource(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentResource) return;
    
    const { name, value } = e.target;
    setCurrentResource({
      ...currentResource,
      [name]: value
    });
  };
  
  if (isAddingResource || isEditingResource) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {isAddingResource ? 'Add New Resource' : 'Edit Resource'}
        </h2>
        
        <form onSubmit={handleSaveResource}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentResource?.title || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={currentResource?.description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={currentResource?.category || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-700 font-medium mb-2">Document URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={currentResource?.url || ''}
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
        <h2 className="text-2xl font-bold text-blue-900">Manage Resources</h2>
        <button
          onClick={handleAddResource}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Resource
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resources.map(resource => (
              <tr key={resource.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                  <div className="text-sm text-gray-500">{resource.description.substring(0, 50)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {resource.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditResource(resource)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteResource(resource.id)}
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

export default AdminResourcesPage;
