
import { supabaseAuth } from './supabase-auth';

async function testSupabaseAuth() {
  try {
    // Test sign-up
    const username = 'testuser';
    const email = 'ekeminisamuel19@gmail.com';
    const password = 'securePassword123!';

    console.log('Testing sign-up...');
    const newUser = await supabaseAuth.signUp(username, email, password);
    console.log('Sign-up successful:', newUser);

    // Test sign-in
    console.log('Testing sign-in...');
    const signedInUser = await supabaseAuth.signIn(email, password);
    console.log('Sign-in successful:', signedInUser);

    // Test get current user
    console.log('Testing get current user...');
    const currentUser = await supabaseAuth.getCurrentUser();
    console.log('Current user:', currentUser);

    // Test sign-out
    console.log('Testing sign-out...');
    await supabaseAuth.signOut();
    console.log('Sign-out successful');

    // Verify sign-out
    const userAfterSignOut = await supabaseAuth.getCurrentUser();
    console.log('User after sign-out:', userAfterSignOut);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSupabaseAuth();
