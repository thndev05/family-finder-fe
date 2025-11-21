import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Accept": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return full error object so errorParser can access response.data.detail
    return Promise.reject(error);
  }
);

export default apiClient;

