import { useAppContext } from './AppContext';

const LeadershipPage = () => {
    const { state } = useAppContext();
    
    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">Our Leadership</h1>
                    <p className="mt-2 text-lg text-gray-600">Meet the dedicated team working for the welfare of Telangana's teachers.</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {state.leaders.map(leader => (
                        <div key={leader.id} className="bg-white rounded-lg shadow-lg text-center p-8 transition-transform transform hover:-translate-y-2">
                            <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-400" src={leader.imageUrl} alt={leader.name} />
                            <h3 className="text-xl font-bold text-blue-900">{leader.name}</h3>
                            <p className="text-orange-600 font-semibold">{leader.designation}</p>
                            <p className="text-sm text-gray-500 mt-1">{leader.district}</p>
                            <p className="text-sm text-gray-600 mt-4">{leader.bio}</p>
                            <div className="mt-4">
                                <a href={`mailto:${leader.contact}`} className="text-blue-600 hover:underline text-sm">{leader.contact}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadershipPage;
