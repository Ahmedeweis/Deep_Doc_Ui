<template>
  <input type="file" @change="handleUpload" />
</template>
<script setup>
import { uploadFile } from '../api.js'
const handleUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  try {
    const res = await uploadFile('مشروعي', file)
    console.log('✅ تم الرفع:', res.data)
  } catch (error) {
    console.error('❌ فشل الرفع:', error)
  }
}
</script>
