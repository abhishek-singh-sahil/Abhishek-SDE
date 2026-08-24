const API_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? '/api'
  : 'https://abhisheksinghsahil.onrender.com/api';

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  options.credentials = options.credentials || 'include';
  options.headers = options.headers || {};
  
  if (!(options.body instanceof FormData)) {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    if (token && !endpoint.includes('/admin')) {
      options.headers['Authorization'] = `Bearer ${token}`;
    } else if (adminToken && endpoint.includes('/admin')) {
      options.headers['Authorization'] = `Bearer ${adminToken}`;
    }
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}
