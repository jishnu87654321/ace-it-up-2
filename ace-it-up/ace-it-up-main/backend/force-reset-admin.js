// Force reset admin user - Run this if login still doesn't work
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    avatarUrl: { type: String, default: null },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true, collection: 'users' });

const User = mongoose.model('User', userSchema);

const resetAdmin = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');

        const adminEmail = 'chainiiiiii06@gmail.com';
        const adminPassword = 'admin123';

        // Delete existing admin if exists
        await User.deleteOne({ email: adminEmail });
        console.log(`🗑️  Deleted existing user: ${adminEmail}`);

        // Create new admin with fresh password hash
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = await User.create({
            email: adminEmail,
            passwordHash: hashedPassword,
            fullName: 'System Admin',
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', admin.email);
        console.log('🔑 Password: admin123');
        console.log('👤 Role:', admin.role);

        // Test the password
        const isMatch = await bcrypt.compare(adminPassword, admin.passwordHash);
        console.log('🔐 Password verification:', isMatch ? '✅ PASS' : '❌ FAIL');

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

resetAdmin();
