import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/env';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const photoService = {
  storePhotoMetadata: async (userId: string, title: string, ipfsUrl: string) => {
    const { data, error } = await supabase
      .from('photos')
      .insert({ user_id: userId, title, url: ipfsUrl })
      .select()

    if (error) throw error
    return data[0]
  },

  getPhotosByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data
  }
}
