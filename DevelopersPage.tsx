import React from 'react';

// Icons for LinkedIn and Email
const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

interface Developer {
    name: string;
    role: string;
    description: string;
    linkedinUrl: string;
    email: string;
    initials: string;
    bgColor: string;
    imageUrl: string;
}

const DevelopersPage = () => {
    const developers: Developer[] = [
        {
            name: 'Om Sai Vikranth',
            role: 'Frontend Developer & UI/UX Designer',
            description: 'Creative frontend developer specializing in modern React applications, responsive design, and user experience optimization. Dedicated to creating intuitive interfaces.',
            linkedinUrl: 'https://www.linkedin.com/in/om-sai-vikranth/',
            email: 'omsaivikrantha@gmail.com',
            initials: 'OSV',
            bgColor: 'bg-blue-500',
            imageUrl: '/vikranth.jpg'
        },
        {
            name: 'Kishore Reddy',
            role: 'Lead Developer & Project Architect',
            description: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable web applications and digital transformation initiatives.',
            linkedinUrl: 'https://www.linkedin.com/in/jugal-kishore-reddy-thangella/',
            email: 'thangellajugalkishore@gmail.com',
            initials: 'KR',
            bgColor: 'bg-orange-500',
            imageUrl: '/jk.jpg'
        },
        {
            name: 'Abhilash Reddy',
            role: 'Backend Developer & DevOps Engineer',
            description: 'Backend specialist with strong expertise in database design, API development, and deployment automation. Focused on building robust and efficient systems.',
            linkedinUrl: 'https://www.linkedin.com/in/abhilash-reddy-491b8b25a/',
            email: 'abhilashreddymar@gmail.com',
            initials: 'AR',
            bgColor: 'bg-green-500',
            imageUrl: '/abhilash.jpg'
        }
    ];

    const handleLinkedInClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleEmailClick = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                        Meet Our Developers
                    </h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The talented team behind the PRTU TS portal, dedicated to delivering 
                        exceptional digital solutions for public administration.
                    </p>
                </div>

                {/* Developers Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {developers.map((developer, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Profile Header */}
                                <div className="p-6 text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg bg-gray-200">
                                        <img
                                            src={developer.imageUrl}
                                            alt={developer.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                console.log(`Failed to load image: ${developer.imageUrl}`);
                                                // Fallback to initials if image fails to load
                                                const target = e.target as HTMLImageElement;
                                                const parent = target.parentElement;
                                                if (parent) {
                                                    parent.innerHTML = `<div class="w-full h-full ${developer.bgColor} rounded-full flex items-center justify-center text-white font-bold text-2xl">${developer.initials}</div>`;
                                                }
                                            }}
                                            onLoad={() => {
                                                console.log(`Successfully loaded image: ${developer.imageUrl}`);
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {developer.name}
                                    </h3>
                                    <p className="text-orange-600 font-semibold mb-4">
                                        {developer.role}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {developer.description}
                                    </p>

                                    {/* Contact Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleLinkedInClick(developer.linkedinUrl)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            <LinkedInIcon className="w-5 h-5" />
                                            <span>LinkedIn</span>
                                        </button>
                                        <button
                                            onClick={() => handleEmailClick(developer.email)}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <EmailIcon className="w-5 h-5" />
                                            <span>Email</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;
