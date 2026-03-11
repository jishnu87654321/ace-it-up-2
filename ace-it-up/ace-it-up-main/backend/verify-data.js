// Verify database has data
const mongoose = require('mongoose');
require('dotenv').config();

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    skillLevel: String,
    isActive: Boolean
}, { timestamps: true });

const gallerySchema = new mongoose.Schema({
    imageUrl: String,
    category: String,
    caption: String
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);

const verifyData = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Connected!\n');

        // Check courses
        const courses = await Course.find();
        console.log(`📚 Courses in database: ${courses.length}`);
        if (courses.length > 0) {
            console.log('   Sample course:', courses[0].title);
        } else {
            console.log('   ⚠️  No courses found! Run the seeder.');
        }

        // Check gallery
        const gallery = await Gallery.find();
        console.log(`\n🖼️  Gallery items in database: ${gallery.length}`);
        if (gallery.length > 0) {
            console.log('   Sample item:', gallery[0].category);
        } else {
            console.log('   ⚠️  No gallery items found! Run the seeder.');
        }

        await mongoose.disconnect();
        console.log('\n👋 Disconnected');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

verifyData();
