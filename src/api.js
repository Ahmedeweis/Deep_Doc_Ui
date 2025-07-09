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
// فهرسة المشروع
export function indexProject(projectName, payload) {
  return api.post(`/nlp/index/push/${projectName}`, payload);
}
// البحث داخل المشروع
export function searchInProject(projectName, payload) {
  return api.post(`/nlp/index/search/${projectName}`, payload);
}
// سؤال مباشر من داخل المشروع
export function askFromProject(projectName, payload) {
  return api.post(`/nlp/index/answer/${projectName}`, payload);
}
// عرض الأصول الخاصة بالمشروع
export function getAssets(projectName) {
  return api.get(`/data/assets/${projectName}`);
}
// تحميل أصل معين
export function downloadAsset(projectName, assetName) {
  return api.get(`/data/assets/${projectName}/${assetName}`, {
    responseType: "blob", // لو ملف للتحميل
  });
}
// معلومات الفهرسة
export function getIndexInfo(projectName) {
  return api.get(`/nlp/index/info/${projectName}`);
}
export default api;
