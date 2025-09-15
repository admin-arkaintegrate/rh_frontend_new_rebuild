/**
 * Unified API client + fetchData helper
 * Requires: axios, Vite env var VITE_API_BASE_URL
 */

import axios from "axios";

// Read base URL from .env (Vite)
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token (if present) on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401s globally: clear storage and redirect to login if not already there
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isOnLoginPage = window.location.pathname === "/login";
      if (!isOnLoginPage) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch data from an API endpoint with optional query params.
 * Undefined, null, and empty-string params are stripped.
 *
 * @param {string} endpoint
 * @param {object} options
 */
export async function fetchData(endpoint, options = {}) {
  try {
    const params = { ...options };

    Object.keys(params).forEach((key) => {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === ""
      ) {
        delete params[key];
      }
    });

    const response = await api(endpoint, { params });
    return response.data;
  } catch (error) {
    // Surface a clean error while preserving original for debugging
    const message =
      error?.response?.data?.message ||
      error?.message ||
      String(error);
    throw new Error(`Failed to fetch data from ${endpoint}: ${message}`);
  }
}

export default api;
