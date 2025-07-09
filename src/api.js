import axios from "axios";
const api = axios.create({
  baseURL: "", // فاضي عشان يستخدم proxy
});
// رفع ملف
export function uploadFile(projectName, file) {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/api/data/upload/${projectName}`, formData);
}
// معالجة الملف
export function processFile(projectName, payload) {
  return api.post(`/api/data/process/${projectName}`, payload);
}
// فهرسة المشروع
export function indexProject(projectName, payload) {
  return api.post(`/api/data/index/${projectName}`, payload);
}
