import { Request, Response } from 'express';
import Stats from '../models/Stats';

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stats.find({ isActive: true }).sort({ order: 1 });
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stats.find().sort({ order: 1 });
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStat = async (req: Request, res: Response) => {
  try {
    const { icon, value, label, order } = req.body;
    
    const stat = await Stats.create({
      icon,
      value: value || 0,
      label,
      order: order || 0,
      isActive: true
    });
    
    res.status(201).json(stat);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { icon, value, label, order, isActive } = req.body;
    
    const stat = await Stats.findByIdAndUpdate(
      id,
      { icon, value, label, order, isActive },
      { new: true, runValidators: true }
    );
    
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    
    res.json(stat);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const stat = await Stats.findByIdAndDelete(id);
    
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    
    res.json({ message: 'Stat deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
