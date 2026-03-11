// Test script to verify API endpoints
const testAPI = async () => {
    const baseURL = 'http://localhost:5005/api';
    
    console.log('🧪 Testing API Endpoints...\n');
    
    // Test 1: Health check
    try {
        const health = await fetch(`${baseURL.replace('/api', '')}/api/health`);
        const healthData = await health.json();
        console.log('✅ Health Check:', healthData);
    } catch (error) {
        console.error('❌ Health Check Failed:', error.message);
    }
    
    // Test 2: Get Courses
    try {
        console.log('\n📚 Fetching courses from:', `${baseURL}/courses`);
        const coursesRes = await fetch(`${baseURL}/courses`);
        const coursesData = await coursesRes.json();
        console.log('✅ Courses Response:', coursesData);
        console.log('   Total courses:', Array.isArray(coursesData) ? coursesData.length : 'Not an array!');
        if (Array.isArray(coursesData) && coursesData.length > 0) {
            console.log('   First course:', coursesData[0].title);
        }
    } catch (error) {
        console.error('❌ Courses Failed:', error.message);
    }
    
    // Test 3: Get Gallery
    try {
        console.log('\n🖼️  Fetching gallery from:', `${baseURL}/gallery`);
        const galleryRes = await fetch(`${baseURL}/gallery`);
        const galleryData = await galleryRes.json();
        console.log('✅ Gallery Response:', galleryData);
        console.log('   Total items:', Array.isArray(galleryData) ? galleryData.length : 'Not an array!');
        if (Array.isArray(galleryData) && galleryData.length > 0) {
            console.log('   First item category:', galleryData[0].category);
        }
    } catch (error) {
        console.error('❌ Gallery Failed:', error.message);
    }
    
    // Test 4: Get Stats
    try {
        console.log('\n📊 Fetching stats from:', `${baseURL}/stats`);
        const statsRes = await fetch(`${baseURL}/stats`);
        const statsData = await statsRes.json();
        console.log('✅ Stats Response:', statsData);
        console.log('   Total stats:', Array.isArray(statsData) ? statsData.length : 'Not an array!');
    } catch (error) {
        console.error('❌ Stats Failed:', error.message);
    }
    
    console.log('\n✨ Test complete!');
};

testAPI();
