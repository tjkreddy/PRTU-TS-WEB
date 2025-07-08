import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdate: React.FC = () => {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdateNotification(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowUpdateNotification(false);
  };

  const handleClose = () => {
    setShowUpdateNotification(false);
    setNeedRefresh(false);
  };

  if (!showUpdateNotification && !offlineReady) return null;

  return (
    <>
      {offlineReady && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-green-600 text-white p-3 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">App ready to work offline</span>
              <button
                onClick={() => setOfflineReady(false)}
                className="text-white hover:text-gray-200 ml-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateNotification && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-orange-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Update Available</h3>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 ml-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-xs mb-3 opacity-90">
              A new version of the app is available. Click to update.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Update
              </button>
              <button
                onClick={handleClose}
                className="text-white text-sm opacity-75 hover:opacity-100 transition-opacity"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAUpdate;
