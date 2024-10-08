import { supabaseAuth } from './supabase-auth'

async function testProfileManagement() {
  try {
    const email = 'ekeminisamuel19@gmail.com'
    const password = 'securePassword123!'
    const username = 'testuser'
    
    console.log('Signing in the user...')
    const signedInUser = await supabaseAuth.signIn(email, password)
    console.log('User signed in:', signedInUser)

    if (signedInUser && signedInUser.id) {
      // Update profile
      console.log('Testing profile update...')
      const updatedProfile = await supabaseAuth.updateProfile(signedInUser.id, { username: 'updatedUsername' })
      console.log('Profile updated:', updatedProfile)

      // Get profile
      console.log('Testing profile retrieval...')
      const profile = await supabaseAuth.getProfile(signedInUser.id)
      console.log('Retrieved profile:', profile)
    } else {
      console.log('User sign-in failed or user ID is missing')
    }

  } catch (error) {
    console.error('Test failed:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  }
}

testProfileManagement()
