// Quick test script to verify admin login
const testLogin = async () => {
    try {
        const response = await fetch('http://localhost:5005/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'chainiiiiii06@gmail.com',
                password: 'admin123'
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Login successful!');
            console.log('User:', data.email);
            console.log('Role:', data.role);
            console.log('Token:', data.token.substring(0, 20) + '...');
        } else {
            console.log('❌ Login failed:', data.error);
        }
    } catch (error) {
        console.error('❌ Connection error:', error.message);
        console.log('\n⚠️  Make sure the backend server is running on http://localhost:5005');
    }
};

testLogin();
