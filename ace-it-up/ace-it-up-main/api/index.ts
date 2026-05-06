import app, { connectDB } from '../backend/src/app';

// Vercel handles the serverless execution, so we just need to 
// ensure the database is connected and export the app.
export default async (req: any, res: any) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error: any) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};
