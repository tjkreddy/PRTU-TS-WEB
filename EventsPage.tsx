import { CalendarIcon, MapPinIcon } from './Icons';
import { useAppContext } from './AppContext';

const EventsPage = () => {
    const { state } = useAppContext();
    
    return (
        <div className="bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">Events & Gallery</h1>
                    <p className="mt-2 text-lg text-gray-600">Join us in our upcoming events and relive past moments.</p>
                </div>

                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-2">
                    {state.events.map(event => (
                         <div key={event.id} className="bg-white rounded-lg shadow-xl overflow-hidden group flex flex-col sm:flex-row">
                            <img className="h-64 w-full sm:w-1/3 object-cover" src={event.imageUrl} alt={event.title} />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-blue-900">{event.title}</h3>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="h-5 w-5 mr-2 text-orange-500" />
                                    <span>{event.date}</span>
                                </div>
                                 <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-orange-500" />
                                    <span>{event.location}</span>
                                </div>
                                <p className="mt-4 text-gray-600 text-sm flex-grow">{event.description}</p>
                                <div className="mt-4">
                                     <a href="#" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
