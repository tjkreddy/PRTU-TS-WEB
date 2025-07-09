import React, { useState } from 'react';

const TestInstallButton: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [installStatus, setInstallStatus] = useState<'ready' | 'installing' | 'success' | 'failed'>('ready');

  const handleInstallClick = async () => {
    setInstallStatus('installing');
    
    // Check if we're on a supported browser
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS || isSafari) {
      setShowInstructions(true);
      setInstallStatus('ready');
      return;
    }

    // Try to use the beforeinstallprompt event
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallStatus('success');
      } else {
        setInstallStatus('failed');
      }
    } else {
      // Show browser-specific instructions
      if (isChrome || isEdge) {
        alert('To install this app:\n1. Click the three dots menu (⋮) in your browser\n2. Select "Install PRTU Telangana..." or look for the install icon in the address bar\n3. Click "Install"');
      } else if (isFirefox) {
        alert('Firefox supports PWAs! Look for the install icon in the address bar or add this page to your home screen from the menu.');
      } else {
        alert('Your browser supports PWAs! Look for an install option in the browser menu or address bar.');
      }
      setInstallStatus('ready');
    }
  };

  const getBrowserInfo = () => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) return 'iOS Safari';
    if (isSafari) return 'Safari';
    if (isChrome) return 'Chrome';
    if (isEdge) return 'Edge';
    if (isFirefox) return 'Firefox';
    return 'Unknown';
  };

  const getButtonText = () => {
    switch (installStatus) {
      case 'installing': return 'Installing...';
      case 'success': return 'Installed!';
      case 'failed': return 'Try Again';
      default: return 'Install App';
    }
  };

  const getButtonColor = () => {
    switch (installStatus) {
      case 'installing': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'success': return 'bg-green-600 hover:bg-green-700';
      case 'failed': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-yellow-800">Test Install Button</h3>
            <p className="text-sm text-yellow-700">Browser: {getBrowserInfo()}</p>
            <p className="text-sm text-yellow-700">Status: {installStatus}</p>
          </div>
          <button
            onClick={handleInstallClick}
            disabled={installStatus === 'installing'}
            className={`${getButtonColor()} text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2`}
          >
            {installStatus === 'installing' && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            )}
            {getButtonText()}
          </button>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Install PRTU App</h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                <p>Tap the <strong>Share</strong> button <span className="inline-block">📤</span> at the bottom of your screen</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                <p>Scroll down and tap <strong>"Add to Home Screen"</strong> <span className="inline-block">📱</span></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                <p>Tap <strong>"Add"</strong> to install the app on your home screen</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestInstallButton;
