import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getDashboardData, addTagToPhoto, addPhotoToGroup } from '../controllers/dashboardController';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getDashboardData);
router.post('/tags', addTagToPhoto);
router.post('/groups', addPhotoToGroup);

export const dashboardRoutes = router;
