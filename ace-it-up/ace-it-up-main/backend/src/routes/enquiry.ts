import express from 'express';
import { getEnquiries, createEnquiry, updateEnquiry, deleteEnquiry } from '../controllers/enquiryController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public route to submit an enquiry
router.post('/', createEnquiry);

// Admin only routes to view and update enquiries
router.get('/', authenticate, requireAdmin, getEnquiries);
router.put('/:id', authenticate, requireAdmin, updateEnquiry);
router.delete('/:id', authenticate, requireAdmin, deleteEnquiry);

export default router;
