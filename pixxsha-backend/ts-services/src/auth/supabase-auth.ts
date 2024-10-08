import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/env'

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const supabaseAuth = {
    signUp: async (username: string, email: string, password: string) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        })
        if (authError) throw authError;
      
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({ user_id: authData.user.id, username })
          if (profileError) console.error('Error creating profile:', profileError);
        }
      
        console.log('Please check your email for the confirmation link.');
        return authData.user;
      },
      


    signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data.user
  },
  

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  verifyEmail: async (token: string, email: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      token,
      type: 'signup',
      email
    })
    if (error) throw error
    return data
  },

  updateProfile: async (userId: string, updates: { username?: string, avatar_url?: string }) => {
    console.log('Attempting to update profile for user:', userId);
    console.log('Updates:', updates);
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: userId, ...updates, updated_at: new Date() })
      .select()
    
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    console.log('Profile update result:', data);
    return data[0];
  },
  

  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (error) throw error
    return data
  }
}
