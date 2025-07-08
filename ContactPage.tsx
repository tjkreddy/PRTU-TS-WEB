import React, { useState } from 'react';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from './Icons';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log('Form data submitted:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
    };

    return (
        <div className="bg-white">
            <div className="relative bg-blue-900">
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-900"></div>
                </div>
                <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
                    <div className="bg-blue-900 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                        <div className="max-w-lg mx-auto">
                            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Get in touch</h2>
                            <p className="mt-3 text-lg leading-6 text-blue-200">
                                We are here to help and answer any question you might have. We look forward to hearing from you.
                            </p>
                            <dl className="mt-8 text-base text-blue-100">
                                <div>
                                    <dt className="sr-only">Postal address</dt>
                                    <dd className="flex">
                                        <BuildingOffice2Icon className="flex-shrink-0 h-6 w-6 text-blue-300" aria-hidden="true" />
                                        <span className="ml-3">PRTU State Office, Hyderabad, Telangana, India</span>
                                    </dd>
                                </div>
                                <div className="mt-6">
                                    <dt className="sr-only">Phone number</dt>
                                    <dd className="flex">
                                        <PhoneIcon className="flex-shrink-0 h-6 w-6 text-blue-300" aria-hidden="true" />
                                        <span className="ml-3">+91-1234567890</span>
                                    </dd>
                                </div>
                                <div className="mt-3">
                                    <dt className="sr-only">Email</dt>
                                    <dd className="flex">
                                        <EnvelopeIcon className="flex-shrink-0 h-6 w-6 text-blue-300" aria-hidden="true" />
                                        <span className="ml-3">contact@prtuts.org</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                        <div className="max-w-lg mx-auto lg:max-w-none">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Full name</label>
                                    <input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md" placeholder="Full name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md" placeholder="Email" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="sr-only">Subject</label>
                                    <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md" placeholder="Subject" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 border border-gray-300 rounded-md" placeholder="Message"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                             {isSubmitted && (
                                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
                                    <p>Thank you for your message! We will get back to you shortly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888600.950112694!2d76.63685376169961!3d17.86384441282973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3350db9429ed43%3A0x63ef7ba741594059!2sTelangana!5e0!3m2!1sen!2sin!4v1751973652749!5m2!1sen!2sin"
                  width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PRTU Telangana State Office Location">

                  </iframe>
            </div>
        </div>
    );
};

export default ContactPage;