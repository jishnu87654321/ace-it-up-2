import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from './lib/seeder';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import authRoutes from './routes/auth';
import courseRoutes from './routes/course';
import enquiryRoutes from './routes/enquiry';
import galleryRoutes from './routes/gallery';
import testimonialRoutes from './routes/testimonial';
import statsRoutes from './routes/stats';

app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statsRoutes);

export const connectDB = async () => {
    let uri = process.env.MONGODB_URI;

    try {
        if (!uri || uri.includes('127.0.0.1')) {
            throw new Error('No remote URI provided');
        }

        console.log('📡 Attempting to connect to MongoDB Atlas...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB Atlas');
        await seedDatabase();
    } catch (error: any) {
        if (process.env.NODE_ENV === 'production') {
            console.error('❌ CRITICAL: Atlas connection failed in PRODUCTION mode.');
            throw error;
        }

        console.log('⚠️ Atlas connection failed. Starting In-Memory Database...');
        const mongoServer = await MongoMemoryServer.create();
        const memoryUri = mongoServer.getUri();
        await mongoose.connect(memoryUri);
        console.log('✅ Connected to MongoDB (Local In-Memory Mode)');
        await seedDatabase();
    }
};

export default app;
