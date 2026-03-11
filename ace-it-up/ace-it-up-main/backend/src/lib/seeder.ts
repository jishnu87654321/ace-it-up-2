import bcrypt from 'bcryptjs';
import User from '../models/User';
import Course from '../models/Course';
import Testimonial from '../models/Testimonial';
import Gallery from '../models/Gallery';
import Enquiry from '../models/Enquiry';
import Stats from '../models/Stats';

export const seedDatabase = async () => {
    try {
        // 1. Seed Admin Users
        const adminEmails = ['chainiiiiii06@gmail.com', 'sureshmmaneri@gmail.com'];
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);

        for (const email of adminEmails) {
            const normalizedEmail = email.toLowerCase().trim();
            const exists = await User.findOne({ email: normalizedEmail });
            if (!exists) {
                console.log(`Seeding admin user: ${normalizedEmail}`);
                await User.create({
                    email: normalizedEmail,
                    passwordHash: hashedAdminPassword,
                    fullName: 'System Admin',
                    role: 'admin'
                });
                console.log(`✅ Created admin: ${normalizedEmail}`);
            } else {
                console.log(`Admin user already exists: ${normalizedEmail}`);
            }
        }

        // 2. Seed Sample Services (As mentioned in frontend)
        const coreServices = [
            {
                title: 'Classroom Training',
                description: 'Hands-on, instructor-led sessions focused on practical industry skills and real-world applications.',
                imageUrl: '/images/services/classroom.png',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'E-learning',
                description: 'Flexible online courses with recorded sessions, live classes, and self-paced learning modules.',
                imageUrl: '/images/services/elearning.png',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'Assessments',
                description: 'Comprehensive skill evaluations, mock interviews, and certification exams to measure progress.',
                imageUrl: '/images/services/assessments.png',
                skillLevel: 'all levels',
                isActive: true
            },
            {
                title: 'Study Materials',
                description: 'Curated notes, practice questions, and downloadable resources to support your learning journey.',
                imageUrl: '/images/services/materials.png',
                skillLevel: 'all levels',
                isActive: true
            }
        ];

        console.log('🧹 Cleaning up services collection...');
        await Course.deleteMany({});
        
        console.log('🌱 Seeding core services...');
        for (const service of coreServices) {
            await Course.create(service);
            console.log(` - Created: [${service.title}]`);
        }
        
        const finalCheck = await Course.countDocuments();
        console.log(`✅ Database successfully synced: ${finalCheck} core services.`);
        console.log('✅ Database Seeded Successfully');

        // 3. Seed Sample Testimonials (Empty by default as requested)
        const testCount = await Testimonial.countDocuments();

        // 4. Seed Sample Gallery (Expanded with more categories)
        const galleryCount = await Gallery.countDocuments();
        if (galleryCount === 0) {
            await Gallery.create([
                {
                    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
                    category: 'training',
                    caption: 'Interactive Classroom Session'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
                    category: 'workshops',
                    caption: 'Advanced React workshop in progress'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
                    category: 'events',
                    caption: '2024 Tech Convocation Ceremony'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
                    category: 'events',
                    caption: 'Student Hackathon Winners'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
                    category: 'training',
                    caption: 'One-on-one Mentorship Session'
                }
            ]);
        }

        // 5. Seed Sample Enquiries (Empty by default)
        const enquiryCount = await Enquiry.countDocuments();

        // 6. Seed Default Statistics
        const statsCount = await Stats.countDocuments();
        if (statsCount === 0) {
            console.log('🌱 Seeding default statistics...');
            await Stats.create([
                {
                    icon: 'GraduationCap',
                    value: 0,
                    label: 'Students Trained',
                    order: 0,
                    isActive: true
                },
                {
                    icon: 'Briefcase',
                    value: 0,
                    label: 'Placements Achieved',
                    order: 1,
                    isActive: true
                },
                {
                    icon: 'School',
                    value: 0,
                    label: 'Colleges Associated',
                    order: 2,
                    isActive: true
                },
                {
                    icon: 'Presentation',
                    value: 0,
                    label: 'Workshops Conducted',
                    order: 3,
                    isActive: true
                }
            ]);
            console.log('✅ Default statistics created');
        }

        console.log('✅ Database Seeded Successfully');
    } catch (error) {
        console.error('❌ Seeding Error:', error);
    }
};
