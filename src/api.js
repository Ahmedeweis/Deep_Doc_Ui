import axios from "axios";
// نحدد هل احنا في البيئة المحلية ولا في Production
const isDev = import.meta.env.DEV;
// دومين الأساس بناءً على البيئة
const api = axios.create({
  baseURL: isDev
    ? "/api" // لو شغال محلي هيتحول عن طريق Vite proxy
    : "https://experienced-estimate-amd-display.trycloudflare.com/api/v1", // لو شغال على Vercel
});
// وظائف API
export function uploadFile(projectName, file) {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/data/upload/${projectName}`, formData);
}
export function processFile(projectName, payload) {
  return api.post(`/data/process/${projectName}`, payload);
}
export function indexProject(projectName, payload) {
  return api.post(`/nlp/index/push/stream/${projectName}`, payload);
}
export function getAssets(projectName) {
  return api.get(`/data/assets/${projectName}`);
}
export function downloadAssetFile(projectName, assetName, config = {}) {
  return api.get(`/data/assets/${projectName}/${assetName}`, config);
}
export function getAllProjects() {
  return api.get(`/data/projects`);
}
// مهم: تصدير الـ base url كمان عشان تستخدمه في SSE
export const BASE_STREAM_URL = isDev
  ? "/api"
  : "https://experienced-estimate-amd-display.trycloudflare.com/api/v1";
export default api;
