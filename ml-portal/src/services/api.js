import axios from "axios";

// Central API instance configured for Sahayak AI Backend Integration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 8000
});

// Request interceptor to attach JWT token when authenticated
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sahayak_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // When backend is not reachable in prototype mode, log gracefully
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.info("[Sahayak API] Backend server currently offline. Falling back to local prototype storage.");
    }
    return Promise.reject(error);
  }
);

export default api;
