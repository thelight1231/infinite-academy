const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/auth'
    : 'https://infinite01.netlify.app/.netlify/functions/api';

const auth = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
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
            console.log('Attempting registration with:', { name, email });
            console.log('API URL:', `${API_URL}/auth/register`);
            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        window.location.href = '/login.html';
    },

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');
        const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 hours
        
        if (!token || !loginTime) return false;
        
        const elapsed = Date.now() - parseInt(loginTime);
        return elapsed < MAX_SESSION_TIME;
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default auth;