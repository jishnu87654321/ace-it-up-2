const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers = new Headers(options.headers || {});

    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `${API_URL}${endpoint}`;
    console.log(`📡 Fetching: ${url}`);
    
    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        console.log(`📥 Response status: ${response.status}`);

        if (!response.ok) {
            const data = await response.json().catch(() => ({ error: 'Request failed' }));
            console.error('❌ API Error:', data);
            throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
        }

        const data = await response.json().catch(() => ({}));
        console.log('✅ API Success:', endpoint);
        return data;
    } catch (error: any) {
        console.error('❌ Fetch error:', error.message);
        
        // Check if it's a network error
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            throw new Error(`Cannot connect to backend server at ${API_URL}. Please ensure the backend is running on port 5005.`);
        }
        
        throw error;
    }
};
