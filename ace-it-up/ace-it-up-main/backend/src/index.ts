import app, { connectDB } from './app';

const PORT = process.env.PORT || 5005;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
            console.log('✨ Ready to receive HTTP requests!');
        });
    } catch (error: any) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
