import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config';

const supabase = createClient(config.supabaseUrl!, config.supabaseKey!);

// Retrieve all photos with tags and groups for the dashboard
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Fetch photos with their tags and groups
    const { data: photos, error } = await supabase
      .from('photos')
      .select(`
        *,
        tags (name),
        groups (name)
      `)
      .eq('user_id', userId);

    if (error) throw error;

    // Fetch summary data (e.g., photo count, recent uploads)
    const { data: summary, error: summaryError } = await supabase
      .from('photos')
      .select('id, created_at')
      .eq('user_id', userId);

    if (summaryError) throw summaryError;

    const photoCount = summary.length;
    const recentUploads = summary.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

    res.json({ photos, photoCount, recentUploads });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Add a tag to a photo
export const addTagToPhoto = async (req: Request, res: Response) => {
  try {
    const { photoId, tagName } = req.body;
    const userId = (req as any).user.userId;

    // Ensure the photo belongs to the user
    const { data: photo, error } = await supabase
      .from('photos')
      .select('id')
      .eq('id', photoId)
      .eq('user_id', userId)
      .single();

    if (error || !photo) {
      return res.status(404).json({ error: 'Photo not found or not authorized' });
    }

    // Insert the tag
    const { error: tagError } = await supabase
      .from('tags')
      .insert({ photo_id: photoId, name: tagName });

    if (tagError) throw tagError;

    res.status(201).json({ message: 'Tag added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Organize a photo into a group
export const addPhotoToGroup = async (req: Request, res: Response) => {
  try {
    const { photoId, groupId } = req.body;
    const userId = (req as any).user.userId;

    // Ensure the photo belongs to the user
    const { data: photo, error } = await supabase
      .from('photos')
      .select('id')
      .eq('id', photoId)
      .eq('user_id', userId)
      .single();

    if (error || !photo) {
      return res.status(404).json({ error: 'Photo not found or not authorized' });
    }

    // Insert the photo into the group
    const { error: groupError } = await supabase
      .from('photo_groups')
      .insert({ photo_id: photoId, group_id: groupId });

    if (groupError) throw groupError;

    res.status(201).json({ message: 'Photo added to group successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
