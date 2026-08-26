// We are basically handling errors that are global, impersonal, and non-recoverable by the current screen.
/**
 * attaching tokens
 * handling session death (401)
 * handling permission walls (403)
 * handling “the server is on fire” (500, 503)
 * handling “the internet is gone”
 **/

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
        const wasLoggedIn = !!localStorage.getItem('authToken');
        localStorage.removeItem('authToken');

        // Only redirect/toast if we're not already sitting on the login page
        if (window.location.pathname !== '/login') {
          if (wasLoggedIn) {
            toast.error('Session expired. Please login again.');
          }
          window.location.href = '/login';
        }
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