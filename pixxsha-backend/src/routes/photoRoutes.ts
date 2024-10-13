import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadPhoto, getPhotos, sharePhoto, deletePhoto } from '../controllers/photoController';

const router = express.Router();

router.use(authMiddleware);

router.post('/upload', uploadPhoto);
router.get('/', getPhotos);
router.post('/share', sharePhoto);
router.delete('/:id', deletePhoto);
// TODO: Add the following routes
// router.get('/:id', getPhoto);
// Create a group
// Delete a group
// Update the details/info a group
// List all groups for a user
// Add a file to a group
// Remove a file from a group

export const photoRoutes = router;
