import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadPhoto, getPhotos, sharePhoto, deletePhoto } from '../controllers/photoController';

const router = express.Router();

router.use(authMiddleware);

router.post('/upload', uploadPhoto);
router.get('/', getPhotos);
router.post('/share', sharePhoto);
router.delete('/:id', deletePhoto);

export const photoRoutes = router;
