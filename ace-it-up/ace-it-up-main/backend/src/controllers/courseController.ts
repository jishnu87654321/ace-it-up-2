import { Request, Response } from 'express';
import Course from '../models/Course';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        // Sort by createdAt descending
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.json(course);
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        res.json({ message: 'Course removed' });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
