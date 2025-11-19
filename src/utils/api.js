const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  try {
    return await res.json()
  } catch (e) {
    return null
  }
}

export const api = {
  createUser: (payload) => request('/api/users', { method: 'POST', body: JSON.stringify(payload) }),
  createPlan: (payload) => request('/api/plans', { method: 'POST', body: JSON.stringify(payload) }),
  getPlan: (userId) => request(`/api/plan/${userId}`),
  createCheckin: (payload) => request('/api/checkins', { method: 'POST', body: JSON.stringify(payload) }),
  getCheckins: (userId, limit = 30) => request(`/api/checkins/${userId}?limit=${limit}`),
  getSummary: (userId) => request(`/api/summary/${userId}`),
  getTips: () => request('/api/tips'),
}

export default api
