import express from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public route
router.get('/', getCourses);

// Admin only routes
router.post('/', authenticate, requireAdmin, createCourse);
router.put('/:id', authenticate, requireAdmin, updateCourse);
router.delete('/:id', authenticate, requireAdmin, deleteCourse);

export default router;
