import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public route
router.get('/', getTestimonials);
router.post('/', createTestimonial); // Users can submit testimonials

// Admin only routes
router.put('/:id', authenticate, requireAdmin, updateTestimonial);
router.delete('/:id', authenticate, requireAdmin, deleteTestimonial);

export default router;
