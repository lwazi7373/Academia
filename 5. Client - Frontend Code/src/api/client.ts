// Every api call passes through this point 
// Every feature API file (auth.api.ts, student.api.ts, etc.) should depend on this and nothing else

import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // return the config, for the request to continue.
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global/server errors with toast
    if (error.response) {
      const status = error.response.status; // Backend statuses match exactly, no ambiguity
      if (status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem('authToken');
        toast.error('Session expired. Please login again.');
        window.location.href = '/login'; // I Will need to change this once route wiring is done 
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (status === 503) {
        toast.error('Service unavailable. Please try again later.');
      }
      // 400 and 404 errors are handled at component level (inline)
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);