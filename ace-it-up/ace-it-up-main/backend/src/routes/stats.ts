import express from 'express';
import { getStats, getAllStats, createStat, updateStat, deleteStat } from '../controllers/statsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.get('/', getStats);
router.get('/all', protect, admin, getAllStats);
router.post('/', protect, admin, createStat);
router.put('/:id', protect, admin, updateStat);
router.delete('/:id', protect, admin, deleteStat);

export default router;
