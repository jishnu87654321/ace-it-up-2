import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Testimonial.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Testimonial.create(req.body);
        res.status(201).json(item);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        res.json(item);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Testimonial.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ error: 'Testimonial not found' });
            return;
        }
        res.json({ message: 'Testimonial removed' });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
