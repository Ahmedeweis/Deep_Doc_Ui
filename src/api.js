import axios from "axios";
const isDev = import.meta.env.DEV;
const api = axios.create({
  baseURL: isDev
    ? "/api" // لو شغال محليًا هيستخدم Vite Proxy
    : "https://select-recycling-recordings-gross.trycloudflare.com/api/v1", // لو شغال على Vercel
});
export function uploadFile(projectName, file) {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/data/upload/${projectName}`, formData);
}
export function processFile(projectName, payload) {
  return api.post(`/data/process/${projectName}`, payload);
}
export function indexProject(projectName, payload) {
  return api.post(`/data/index/${projectName}`, payload);
}
export default api;
