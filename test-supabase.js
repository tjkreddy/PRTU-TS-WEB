// Test script to verify Supabase connection
import { memberService } from './supabaseClient.js';

async function testSupabaseConnection() {
    console.log('Testing Supabase connection...');
    
    try {
        // Test getting all members
        console.log('Fetching all members...');
        const allMembers = await memberService.getAllMembers();
        console.log(`Found ${allMembers.length} members in the database`);
        
        if (allMembers.length > 0) {
            console.log('Sample member:', allMembers[0]);
            
            // Test searching for a specific member
            const testTreasuryId = allMembers[0].treasury_id;
            console.log(`Testing search for Treasury ID: ${testTreasuryId}`);
            
            const foundMember = await memberService.findMemberByTreasuryId(testTreasuryId);
            if (foundMember) {
                console.log('✅ Member found successfully!');
                console.log('Member details:', foundMember);
            } else {
                console.log('❌ Member not found');
            }
        } else {
            console.log('⚠️ No members found in database');
        }
        
    } catch (error) {
        console.error('❌ Error testing Supabase connection:', error);
    }
}

// Run the test
testSupabaseConnection();
