import React, { useEffect, useRef } from 'react';

const TelanganaMap = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (iframeRef.current && typeof event.data === 'object' && event.data['datawrapper-height']) {
                if (event.source === iframeRef.current.contentWindow) {
                    const height = event.data['datawrapper-height']['bUJYV'];
                    if (height) {
                        iframeRef.current.style.height = `${height}px`;
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Our Reach Across Telangana</h2>
                <p className="text-center text-gray-600 mb-10">An interactive look at our presence in all districts.</p>
                <div className="w-full shadow-lg rounded-lg overflow-hidden">
                    <iframe
                        ref={iframeRef}
                        title="Telangana Districts Map"
                        aria-label="Map"
                        id="datawrapper-chart-bUJYV"
                        src="https://datawrapper.dwcdn.net/bUJYV/1/"
                        scrolling="no"
                        frameBorder="0"
                        style={{ width: '100%', minWidth: '100%', border: 'none' }}
                        height="659"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default TelanganaMap;
