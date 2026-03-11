import { Request, Response } from 'express';
import Gallery from '../models/Gallery';

export const getGallery = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Gallery.create(req.body);
        res.status(201).json(item);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            res.status(404).json({ error: 'Gallery item not found' });
            return;
        }
        res.json(item);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ error: 'Gallery item not found' });
            return;
        }
        res.json({ message: 'Gallery item removed' });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
