/**
 * Centralized API client wrapper with Authorization token header
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('capita1_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `Error HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[Capita1 API] Fallback a mocks locales para: ${endpoint}`, error.message);
    throw error;
  }
}

