const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'd:/ace it up 2/ace-it-up/ace-it-up-main/backend/.env' });

async function fixServices() {
    try {
        console.log('📡 Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected');

        // Note: The collection name in Atlas is 'courses' (lowercase plural of model name)
        try {
            await mongoose.connection.db.dropCollection('courses');
            console.log('🗑️ Dropped courses collection');
        } catch (e) {
            console.log('⚠️ Collection already empty or could not be dropped');
        }

        const coreServices = [
            {
                title: 'Classroom Training',
                description: 'Hands-on, instructor-led sessions focused on practical industry skills and real-world applications.',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'E-learning',
                description: 'Flexible online courses with recorded sessions, live classes, and self-paced learning modules.',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'Assessments',
                description: 'Comprehensive skill evaluations, mock interviews, and certification exams to measure progress.',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'Study Materials',
                description: 'Curated notes, practice questions, and downloadable resources to support your learning journey.',
                skillLevel: 'all levels',
                isActive: true
            }
        ];

        // Define model manually for this script to be independent
        const Course = mongoose.model('Course', new mongoose.Schema({
            title: String,
            description: String,
            skillLevel: String,
            isActive: Boolean
        }, { collection: 'courses' }));

        await Course.create(coreServices);
        console.log('✨ Seeded exactly 4 services');

        const verify = await Course.find();
        console.log('🔍 Database now has:', verify.length, 'services');
        verify.forEach(s => console.log(' - ' + s.title));

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

fixServices();
