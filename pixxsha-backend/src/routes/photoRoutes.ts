import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadPhoto, getPhotos, sharePhoto, deletePhoto, getPhoto } from '../controllers/photoController';
import { createGroup, getGroup, listGroups, updateGroup, deleteGroup, addCidsToGroup, removeCidsFromGroup } from '../controllers/groupController';

const router = express.Router();

router.use(authMiddleware);

// Photo routes
router.post('/upload', uploadPhoto);
router.get('/', getPhotos);
router.get('/:id', getPhoto); // Retrieve a specific photo
router.post('/share', sharePhoto);
router.delete('/:id', deletePhoto);

// Group routes
router.post('/groups', createGroup);
router.get('/groups', listGroups);
router.get('/groups/:id', getGroup);
router.put('/groups/:id', updateGroup);
router.delete('/groups/:id', deleteGroup);
router.post('/groups/:id/cids', addCidsToGroup);
router.delete('/groups/:id/cids', removeCidsFromGroup);

export const photoRoutes = router;


// done

// TODO: Add the following routes
// router.get('/:id', getPhoto);
// Create a group
// Delete a group
// Update the details/info a group
// List all groups for a user
// Add a file to a group
// Remove a file from a group
