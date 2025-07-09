import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                        About PRTU Telangana
                    </h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Promoting Excellence in Public Service and Administrative Efficiency
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Mission Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            PRTU (Personnel, Reforms, Training and Utilities) Telangana is dedicated to modernizing 
                            public administration and enhancing the efficiency of government services across the state. 
                            We work towards creating a transparent, accountable, and citizen-centric governance framework.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Our organization serves as the backbone of administrative reforms, ensuring that public 
                            servants are well-trained, policies are effectively implemented, and citizens receive 
                            quality services through digital transformation initiatives.
                        </p>
                    </div>

                    {/* Vision Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To establish Telangana as a model state in public administration excellence, where 
                            technology-driven governance ensures rapid, transparent, and efficient delivery of 
                            public services to all citizens.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We envision a future where administrative processes are streamlined, public servants 
                            are empowered with modern tools and training, and citizens experience seamless 
                            interaction with government services.
                        </p>
                    </div>

                    {/* Key Areas Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Key Focus Areas</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-900 mb-3">Personnel Management</h3>
                                <p className="text-gray-700">
                                    Streamlining recruitment, transfers, promotions, and career development 
                                    of government employees across all departments.
                                </p>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-orange-900 mb-3">Administrative Reforms</h3>
                                <p className="text-gray-700">
                                    Implementing policy reforms to improve governance structures and 
                                    administrative processes for better public service delivery.
                                </p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-900 mb-3">Training & Development</h3>
                                <p className="text-gray-700">
                                    Providing comprehensive training programs to enhance the skills and 
                                    capabilities of public servants.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-900 mb-3">Digital Utilities</h3>
                                <p className="text-gray-700">
                                    Leveraging technology to create digital platforms and tools that 
                                    improve administrative efficiency and citizen services.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Key Achievements</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">
                                    Successfully digitized personnel records of over 500,000 government employees
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">
                                    Implemented online transfer and posting system reducing processing time by 80%
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">
                                    Conducted 200+ training programs annually benefiting thousands of employees
                                </p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">
                                    Launched citizen-centric mobile applications for improved service delivery
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
