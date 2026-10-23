import { apiFetch } from './api';

export const authService = {
  async login(email, password) {
    try {
      return await apiFetch('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch {
      // Mock local session for initial frontend screen prototype
      return {
        id: 'usr_mock_01',
        email,
        name: email.split('@')[0],
        token: 'mock_jwt_session_utc',
      };
    }
  },

  async register(data) {
    try {
      return await apiFetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      return {
        id: 'usr_mock_01',
        ...data,
        token: 'mock_jwt_session_utc',
      };
    }
  },
};

