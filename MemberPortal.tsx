import React, { useState } from 'react';
import { memberService, supabase } from './supabaseClient';
import type { Member } from './types';

const MemberPortal = () => {
    const [searchValue, setSearchValue] = useState('');
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const isSupabaseConfigured = !!supabase;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            setError('Please enter a Treasury ID or Phone Number');
            return;
        }

        setLoading(true);
        setError('');
        setMember(null);
        setSearched(false);

        try {
            const memberData = await memberService.findMemberByTreasuryIdOrPhone(searchValue.trim());
            
            if (memberData) {
                setMember(memberData);
            } else {
                setError('Treasury ID or Phone Number not found in our records. Please check your input or contact admin.');
            }
            setSearched(true);
        } catch (err) {
            setError('An error occurred while searching. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearchValue('');
        setMember(null);
        setError('');
        setSearched(false);
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                        Member Portal
                    </h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Verify your membership by entering your Treasury ID or Phone Number to view your details and confirm your membership status.
                    </p>
                </div>

                {/* Configuration Notice */}
                {!isSupabaseConfigured && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Database Connection Error</h3>
                                    <p className="text-sm text-red-700 mt-1">
                                        Unable to connect to the database. Please contact the administrator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Member Verification
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="searchValue" className="block text-sm font-medium text-gray-700 mb-2">
                                    Treasury ID or Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="searchValue"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Enter your Treasury ID or Phone Number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </div>
                                    ) : 'Verify Membership'}
                                </button>
                                
                                {(member || searched) && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Member Details Section */}
                {member && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6">
                                <div className="flex items-center">
                                    <div className="ml-6">
                                        <h3 className="text-2xl font-bold text-white">{member.teacher_name}</h3>
                                        <p className="text-blue-200">Treasury ID: {member.treasury_id}</p>
                                        {member.phone && (
                                            <p className="text-blue-200">Phone: {member.phone}</p>
                                        )}
                                        <div className="mt-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                ✓ Verified Member
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="px-8 py-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Receipt Number</label>
                                            <p className="text-lg text-gray-900">{member.receipt_number || 'N/A'}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
                                            <p className="text-lg text-gray-900">{member.designation || 'N/A'}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">District</label>
                                            <p className="text-lg text-gray-900">{member.district || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Mandal</label>
                                            <p className="text-lg text-gray-900">{member.mandal || 'N/A'}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Institution</label>
                                            <p className="text-lg text-gray-900">{member.institution || 'N/A'}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Management</label>
                                            <p className="text-lg text-gray-900">{member.management || 'N/A'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                            <p className="text-lg text-gray-900">{member.phone || 'N/A'}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                                            <p className="text-lg text-gray-900">{formatDate(member.timestamp)}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Nominee 1</label>
                                            <p className="text-lg text-gray-900">{member.nominee_name_1 || 'N/A'}</p>
                                            {member.nominee_relation_1 && (
                                                <p className="text-sm text-gray-500">Relation: {member.nominee_relation_1}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Nominee 2</label>
                                            <p className="text-lg text-gray-900">{member.nominee_name_2 || 'N/A'}</p>
                                            {member.nominee_relation_2 && (
                                                <p className="text-sm text-gray-500">Relation: {member.nominee_relation_2}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-8 py-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        Membership verified ✓
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Last updated: {new Date().toLocaleDateString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Section */}
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">
                            About Member Verification
                        </h3>
                        <div className="text-blue-800 space-y-2">
                            <p>• Enter your Treasury ID or Phone Number to verify your membership with PRTU TS.</p>
                            <p>• This portal confirms your membership status and displays your registered details.</p>
                            <p>• Your information includes personal details, nominees, and institutional affiliation.</p>
                            <p>• If you encounter any issues or need to update your information, please contact the union office.</p>
                            <p>• Keep your Treasury ID and Phone Number confidential and use them only for official verification purposes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberPortal;
