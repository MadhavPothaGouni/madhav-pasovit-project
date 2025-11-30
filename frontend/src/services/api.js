import axios from "axios";
const api = axios.create({
  baseURL: "/api",    // <<-- important: use relative path so Vite proxy handles it
  withCredentials: true
});
export default api;
