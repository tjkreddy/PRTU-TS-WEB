import React, { useState, useMemo } from 'react';
import { mockNews } from './data';
import type { NewsArticle } from './types';

const NewsPage = () => {
    const categories: NewsArticle['category'][] = ['Announcement', 'G.O.', 'Event', 'Transfer', 'Meeting'];
    const [filter, setFilter] = useState<NewsArticle['category'] | 'All'>('All');

    const filteredNews = useMemo(() => {
        if (filter === 'All') return mockNews;
        return mockNews.filter(article => article.category === filter);
    }, [filter]);

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">News & Updates</h1>
                    <p className="mt-2 text-lg text-gray-600">Stay informed with the latest happenings.</p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 mb-10">
                    <button onClick={() => setFilter('All')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === 'All' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
                    {categories.map(category => (
                         <button key={category} onClick={() => setFilter(category)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === category ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{category}</button>
                    ))}
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredNews.map(article => (
                         <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col">
                            {article.imageUrl && <img className="h-56 w-full object-cover" src={article.imageUrl} alt={article.title} />}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <p className="text-sm text-orange-600 font-semibold">{article.date}</p>
                                    <h3 className="mt-1 text-lg font-semibold text-gray-800">{article.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>
                                </div>
                                <div className="mt-4">
                                     <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">Read More &rarr;</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 {/* Pagination could be added here */}
            </div>
        </div>
    );
};

export default NewsPage;
