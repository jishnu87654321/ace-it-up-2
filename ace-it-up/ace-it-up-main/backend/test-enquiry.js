async function testPost() {
    try {
        const response = await fetch('http://localhost:5005/api/enquiries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'System Test',
                email: 'system@test.com',
                phone: '0000000000',
                message: 'Verifying backend persistence at ' + new Date().toISOString(),
                type: 'contact'
            })
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch Error:', err.message);
    }
}

testPost();
