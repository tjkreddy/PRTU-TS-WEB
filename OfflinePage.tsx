import React from 'react';

const OfflinePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L12 12m6.364-6.364L12 12l-6.364-6.364M12 12l6.364 6.364M12 12l-6.364 6.364" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Offline</h1>
          <p className="text-gray-600 mb-6">
            It looks like you're not connected to the internet. Don't worry, you can still browse some content that's been saved on your device.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Some features may be limited while offline.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
