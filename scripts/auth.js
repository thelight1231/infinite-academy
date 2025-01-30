// frontend/js/auth.js
const API_URL = 'http://localhost:3000/api/auth';

const auth = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(name, email, password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/login.html';
    },

    isAuthenticated() {
        return !!sessionStorage.getItem('token');
    },

    getCurrentUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default auth;