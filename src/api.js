import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
// رفع ملف
export function uploadFile(projectName, file) {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/data/upload/${projectName}`, formData);
}
// بدء المعالجة
export function processFile(projectName, payload) {
  return api.post(`/data/process/${projectName}`, payload);
}
export default api;
