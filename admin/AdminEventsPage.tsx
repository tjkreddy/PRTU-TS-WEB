import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '../Icons';
import type { Event } from '../types';
import { useAppContext } from '../AppContext';

const AdminEventsPage = () => {
  const { state, updateEvents } = useAppContext();
  const [events, setEvents] = useState<Event[]>(state.events);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  const handleAddEvent = () => {
    setIsAddingEvent(true);
    setCurrentEvent({
      id: Math.max(0, ...events.map(e => e.id)) + 1,
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      description: '',
      imageUrl: ''
    });
  };
  
  const handleEditEvent = (event: Event) => {
    setIsEditingEvent(true);
    setCurrentEvent({...event});
  };
  
  const handleDeleteEvent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(e => e.id !== id);
      setEvents(updatedEvents);
      updateEvents(updatedEvents);
    }
  };
  
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEvent) return;
    
    let updatedEvents: Event[];
    
    if (isAddingEvent) {
      updatedEvents = [...events, currentEvent];
      setEvents(updatedEvents);
      setIsAddingEvent(false);
    } else if (isEditingEvent) {
      updatedEvents = events.map(e => e.id === currentEvent.id ? currentEvent : e);
      setEvents(updatedEvents);
      setIsEditingEvent(false);
    } else {
      return;
    }
    
    // Update the global state
    updateEvents(updatedEvents);
    setCurrentEvent(null);
  };
  
  const handleCancelEdit = () => {
    setIsAddingEvent(false);
    setIsEditingEvent(false);
    setCurrentEvent(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentEvent) return;
    
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };
  
  if (isAddingEvent || isEditingEvent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {isAddingEvent ? 'Add New Event' : 'Edit Event'}
        </h2>
        
        <form onSubmit={handleSaveEvent}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={currentEvent?.title || ''}
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
              value={currentEvent?.date || ''}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={currentEvent?.location || ''}
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
              value={currentEvent?.description || ''}
              onChange={handleInputChange}
              rows={4}
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
              value={currentEvent?.imageUrl || ''}
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
        <h2 className="text-2xl font-bold text-blue-900">Manage Events & Gallery</h2>
        <button
          onClick={handleAddEvent}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEditEvent(event)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
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

export default AdminEventsPage;
