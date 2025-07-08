import React from 'react';
import TelanganaMap from './TelanganaMap';
import { mockNews, mockGos, mockEvents } from './data';

const Hero = () => (
    <section className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">Progressive Recognized Teachers Union</h1>
            <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">"Empowering Educators, Elevating Education" - Serving the teachers of Telangana with dedication and integrity.</p>
        </div>
    </section>
);

const NewsSection = () => (
    <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900">Latest News & Updates</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {mockNews.slice(0, 3).map(article => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="p-6">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 bg-blue-100 text-blue-800`}>{article.category}</span>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                            <a href="#" className="font-semibold text-orange-500 hover:text-orange-600">Read More &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <a href="#" className="bg-blue-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors">View All News</a>
            </div>
        </div>
    </section>
);

const GosSection = () => (
    <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900">Recent Government Orders (G.O.s)</h2>
             <div className="mt-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
                <ul role="list" className="divide-y divide-gray-200">
                    {mockGos.map((go) => (
                    <li key={go.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-900 truncate">{go.title}</p>
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">{go.goNumber}</span> - Dated: {go.date}
                            </p>
                        </div>
                        <a href={go.url} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                            Download
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="text-center mt-12">
                <a href="#" className="bg-blue-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors">View All G.O.s</a>
            </div>
        </div>
    </section>
);


const EventsSection = () => (
    <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-900">Upcoming Events</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {mockEvents.slice(0,3).map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                        <img className="h-56 w-full object-cover group-hover:opacity-80 transition-opacity" src={event.imageUrl} alt={event.title} />
                        <div className="p-6">
                            <p className="text-sm text-orange-600 font-semibold">{event.date} &bull; {event.location}</p>
                            <h3 className="mt-1 text-lg font-semibold text-gray-800">{event.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const HomePage = () => {
    return (
        <>
            <Hero />
            <NewsSection />
            <GosSection />
            <TelanganaMap />
            <EventsSection />
        </>
    );
};

export default HomePage;