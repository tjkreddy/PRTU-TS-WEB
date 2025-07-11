import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here';

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Member-related database functions
export const memberService = {
  // Find member by treasury ID
  async findMemberByTreasuryId(treasuryId: string) {
    try {
      if (!supabase) {
        console.error('Supabase not configured');
        return null;
      }

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('treasury_id', treasuryId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return null;
        }
        console.error('Error fetching member:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in findMemberByTreasuryId:', error);
      return null;
    }
  },

  // Get all members (for admin purposes)
  async getAllMembers() {
    try {
      if (!supabase) {
        console.error('Supabase not configured');
        return [];
      }

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('teacher_name');

      if (error) {
        console.error('Error fetching all members:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllMembers:', error);
      return [];
    }
  },

  // Search members by name or district
  async searchMembers(searchTerm: string) {
    try {
      if (!supabase) {
        console.error('Supabase not configured');
        return [];
      }

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .or(`teacher_name.ilike.%${searchTerm}%,district.ilike.%${searchTerm}%,institution.ilike.%${searchTerm}%`)
        .order('teacher_name');

      if (error) {
        console.error('Error searching members:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchMembers:', error);
      return [];
    }
  }
};
