// Quick test to verify Supabase connection
// You can run this in the browser console to test

import { supabase } from './supabaseClient.js';

console.log('Testing Supabase connection...');
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase configured:', !!supabase);

if (supabase) {
    // Test basic connection
    supabase
        .from('members')
        .select('count(*)')
        .then(({ data, error }) => {
            if (error) {
                console.error('❌ Database error:', error);
                console.log('This usually means:');
                console.log('1. The "members" table does not exist');
                console.log('2. Your Supabase RLS policies are blocking access');
                console.log('3. Your API key does not have the right permissions');
            } else {
                console.log('✅ Database connected successfully!');
                console.log('Members table exists and is accessible');
            }
        });
} else {
    console.error('❌ Supabase client not initialized');
    console.log('Check your environment variables');
}
