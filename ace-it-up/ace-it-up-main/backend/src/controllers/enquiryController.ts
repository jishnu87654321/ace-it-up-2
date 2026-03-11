import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry';

export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('📥 New Enquiry Received:', req.body);
        const enquiry = await Enquiry.create(req.body);
        console.log('✅ Enquiry Saved:', enquiry._id);
        res.status(201).json(enquiry);
    } catch (error: any) {
        console.error('❌ Enquiry Submit Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const updateEnquiry = async (req: Request, res: Response): Promise<void> => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) {
            res.status(404).json({ error: 'Enquiry not found' });
            return;
        }
        res.json(enquiry);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) {
            res.status(404).json({ error: 'Enquiry not found' });
            return;
        }
        res.json({ message: 'Enquiry removed' });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
