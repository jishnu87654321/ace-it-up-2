import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_please_change', {
        expiresIn: '30d',
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Make the specific user an admin based on previous conversation requirements (chainiiiiii06@gmail.com)
        // Or just default to user
        const role = email === 'chainiiiiii06@gmail.com' || email === 'sureshmmaneri@gmail.com' ? 'admin' : 'user';

        const user = await User.create({
            email,
            passwordHash,
            fullName,
            role
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            token: generateToken(user.id),
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        console.log(`Login attempt for: ${email}`);
        
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        
        if (!user) {
            console.log('User not found in database');
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }

        console.log(`User found: ${user.email}, Role: ${user.role}`);
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        console.log(`Password match: ${isMatch}`);
        
        if (!isMatch) {
            console.log('Password does not match');
            res.status(400).json({ error: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user.id);
        console.log('Login successful, sending response');
        
        res.json({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            token: token,
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        // Return user without passwordHash
        res.json({
            id: req.user._id,
            email: req.user.email,
            fullName: req.user.fullName,
            role: req.user.role,
            avatarUrl: req.user.avatarUrl
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
