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
const PORT = process.env.PORT || 5000;

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

const startServer = async () => {
    let uri = process.env.MONGODB_URI;

    try {
        if (!uri || uri.includes('127.0.0.1')) {
            throw new Error('No remote URI provided, switching to memory server');
        }

        console.log('📡 Attempting to connect to MongoDB Atlas...');
        // Set a short timeout so it doesn't hang forever if the network is blocking it
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB Atlas');
        await seedDatabase();
    } catch (error: any) {
        console.log('⚠️ Atlas connection failed (likely your network is blocking port 27017).');
        console.log('🚀 Starting Instant In-Memory Database instead...');

        try {
            const mongoServer = await MongoMemoryServer.create();
            const memoryUri = mongoServer.getUri();
            await mongoose.connect(memoryUri);
            console.log('✅ Connected to MongoDB (Local In-Memory Mode)');
            await seedDatabase();
            console.log('📝 Note: Data will reset when the server restarts in this mode.');
        } catch (memError: any) {
            console.error('❌ Failed to start even the memory server:', memError.message);
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log('✨ Ready to receive HTTP requests!');
    });
};

startServer();
