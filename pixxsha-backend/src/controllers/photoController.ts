import { Request, Response } from 'express';
import { PinataSDK } from 'pinata-web3';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config';

const pinata = new PinataSDK({
  pinataJwt: config.pinataJwt!,
  pinataGateway: config.pinataGateway!,
});

const supabase = createClient(config.supabaseUrl!, config.supabaseKey!);

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const upload = await pinata.upload.file(file);
    
    const { data, error } = await supabase
      .from('photos')
      .insert({
        user_id: (req as any).user.userId,
        ipfs_hash: upload.IpfsHash,
        file_name: file.originalname,
      });

    if (error) throw error;

    res.status(201).json({ message: 'Photo uploaded successfully', photo: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('user_id', (req as any).user.userId);

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const sharePhoto = async (req: Request, res: Response) => {
    const { photoId, shareType, recipientEmails } = req.body;
  
    try {
      const { data: photo, error } = await supabase
        .from('photos')
        .select('*')
        .eq('id', photoId)
        .single();
  
      if (error) throw error;
  
      if (photo.user_id !== (req as any).user.userId) {
        return res.status(403).json({ error: 'Not authorized to share this photo' });
      }
  
      const shareLink = `${config.pinataGateway}/ipfs/${photo.ipfs_hash}`;
  
      let expirationDate = null;
      let viewCount = null;
  
      switch (shareType) {
        case 'public':
          break;
        case 'restricted':
          if (!recipientEmails || recipientEmails.length === 0) {
            return res.status(400).json({ error: 'Recipient emails are required for restricted sharing' });
          }
          break;
        case 'view-once':
          viewCount = 1;
          break;
        case 'time-limited':
          expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
          break;
        default:
          return res.status(400).json({ error: 'Invalid share type' });
      }
  
      const { data: share, error: shareError } = await supabase
        .from('shares')
        .insert({
          photo_id: photoId,
          share_type: shareType,
          share_link: shareLink,
          recipient_emails: recipientEmails,
          expiration_date: expirationDate,
          view_count: viewCount,
          remaining_views: viewCount,
        });
  
      if (shareError) throw shareError;
  
      res.json({ shareLink, share });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

export const deletePhoto = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const { data: photo, error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)
        .eq('user_id', (req as any).user.userId)
        .single();
  
      if (error) throw error;
  
      if (!photo) {
        return res.status(404).json({ error: 'Photo not found or not authorized to delete' });
      }
  
      // Unpin the file from Pinata
      await pinata.unpin.unpin(photo.ipfs_hash);
  
      res.json({ message: 'Photo deleted successfully and unpinned from Pinata' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  