const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://infinite01.netlify.app/.netlify/functions/api';

const auth = {
    async login(email, password) {
        try {
            const url = `${API_URL}/auth/login`;
            console.log('Login URL:', url);
            console.log('Login data:', { email });
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'same-origin',
                body: JSON.stringify({ email, password })
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('loginTime', Date.now().toString());

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(name, email, password) {
        try {
            const url = `${API_URL}/auth/register`;
            console.log('Registration URL:', url);
            console.log('Registration data:', { name, email });
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'same-origin',
                body: JSON.stringify({ name, email, password })
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Response data:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('loginTime', Date.now().toString());

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    logout() {
        console.log('Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        window.location.href = '/login.html';
    },

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');
        const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 hours
        
        if (!token || !loginTime) {
            console.log('Not authenticated: token or login time missing');
            return false;
        }
        
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed >= MAX_SESSION_TIME) {
            console.log('Not authenticated: session timed out');
            return false;
        }

        console.log('Authenticated');
        return true;
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        if (!user) {
            console.log('No user data found');
            return null;
        }
        console.log('Current user:', JSON.parse(user));
        return JSON.parse(user);
    }
};

export default auth;