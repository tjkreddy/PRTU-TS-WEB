import type { Resource } from './types';
import { DownloadIcon } from './Icons';
import { useAppContext } from './AppContext';

const ResourcesPage = () => {
    const { state } = useAppContext();
    const categories = Array.from(new Set(state.resources.map(r => r.category)));

    return (
         <div className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">Teacher Resources</h1>
                    <p className="mt-2 text-lg text-gray-600">A collection of useful documents, forms, and guidelines.</p>
                </div>

                <div className="space-y-12">
                    {categories.map(category => (
                        <div key={category}>
                            <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-orange-400 pb-2 mb-6">{category}</h2>
                             <div className="divide-y divide-gray-200">
                                {state.resources.filter((r: Resource) => r.category === category).map((resource: Resource) => (
                                    <div key={resource.id} className="flex items-center justify-between py-4">
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-800">{resource.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                                        </div>
                                        <a href={resource.url} download className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                                            <DownloadIcon className="h-5 w-5 mr-2" />
                                            Download
                                        </a>
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
