import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '../Icons';
import type { Leader } from '../types';
import { useAppContext } from '../AppContext';

const AdminLeadershipPage = () => {
  const { state, updateLeaders } = useAppContext();
  const [leaders, setLeaders] = useState<Leader[]>(state.leaders);
  const [isAddingLeader, setIsAddingLeader] = useState(false);
  const [isEditingLeader, setIsEditingLeader] = useState(false);
  const [currentLeader, setCurrentLeader] = useState<Leader | null>(null);
  
  const districts = [
    'State Body',
    'Adilabad', 
    'Bhadradri Kothagudem', 
    'Hyderabad', 
    'Jagtial', 
    'Jangaon', 
    'Jayashankar Bhupalpally', 
    'Jogulamba Gadwal', 
    'Kamareddy', 
    'Karimnagar', 
    'Khammam', 
    'Komaram Bheem Asifabad', 
    'Mahabubabad', 
    'Mahabubnagar', 
    'Mancherial', 
    'Medak', 
    'Medchal-Malkajgiri', 
    'Mulugu', 
    'Nagarkurnool', 
    'Nalgonda', 
    'Narayanpet', 
    'Nirmal', 
    'Nizamabad', 
    'Peddapalli', 
    'Rajanna Sircilla', 
    'Rangareddy', 
    'Sangareddy', 
    'Siddipet', 
    'Suryapet', 
    'Vikarabad', 
    'Wanaparthy', 
    'Warangal', 
    'Yadadri Bhuvanagiri'
  ];
  
  const designations = ['President', 'General Secretary', 'Treasurer', 'Vice President', 'Joint Secretary'];
  
  const handleAddLeader = () => {
    setIsAddingLeader(true);
    setCurrentLeader({
      id: Math.max(0, ...leaders.map(l => l.id)) + 1,
      name: '',
      designation: 'President',
      district: 'State Body',
      contact: '',
      imageUrl: '',
      bio: ''
    });
  };
  
  const handleEditLeader = (leader: Leader) => {
    setIsEditingLeader(true);
    setCurrentLeader({...leader});
  };
  
  const handleDeleteLeader = (id: number) => {
    if (window.confirm('Are you sure you want to delete this leader?')) {
      const updatedLeaders = leaders.filter(l => l.id !== id);
      setLeaders(updatedLeaders);
      updateLeaders(updatedLeaders);
    }
  };
  
  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentLeader) return;
    
    let updatedLeaders: Leader[];
    
    if (isAddingLeader) {
      updatedLeaders = [...leaders, currentLeader];
      setLeaders(updatedLeaders);
      setIsAddingLeader(false);
    } else if (isEditingLeader) {
      updatedLeaders = leaders.map(l => l.id === currentLeader.id ? currentLeader : l);
      setLeaders(updatedLeaders);
      setIsEditingLeader(false);
    } else {
      return;
    }
    
    // Update the global state
    updateLeaders(updatedLeaders);
    setCurrentLeader(null);
  };
  
  const handleCancelEdit = () => {
    setIsAddingLeader(false);
    setIsEditingLeader(false);
    setCurrentLeader(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentLeader) return;
    
    const { name, value } = e.target;
    setCurrentLeader({
      ...currentLeader,
      [name]: value
    });
  };
  
  if (isAddingLeader || isEditingLeader) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {isAddingLeader ? 'Add New Leader' : 'Edit Leader'}
        </h2>
        
        <form onSubmit={handleSaveLeader}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentLeader?.name || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="designation" className="block text-gray-700 font-medium mb-2">Designation</label>
              <select
                id="designation"
                name="designation"
                value={currentLeader?.designation || ''}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="district" className="block text-gray-700 font-medium mb-2">District</label>
              <select
                id="district"
                name="district"
                value={currentLeader?.district || ''}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">Contact Email</label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={currentLeader?.contact || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={currentLeader?.bio || ''}
              onChange={handleInputChange}
              rows={3}
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
              value={currentLeader?.imageUrl || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
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
        <h2 className="text-2xl font-bold text-blue-900">Manage Leadership</h2>
        <button
          onClick={handleAddLeader}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Leader
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaders.map(leader => (
              <tr key={leader.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={leader.imageUrl} alt={leader.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{leader.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leader.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leader.district}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leader.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditLeader(leader)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteLeader(leader.id)}
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

export default AdminLeadershipPage;
