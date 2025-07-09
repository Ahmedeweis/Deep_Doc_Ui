<!-- AddProjectModal.vue -->
<template>
  <div>
    <!-- زر فتح المودال -->
    <slot name="trigger">
      <button
        v-if="isSidebarOpen"
        @click="openModal"
        class="bg-gradient-to-r from-blue-500 cursor-pointer via-purple-500 to-pink-500 text-white px-4 py-2 mt-5 rounded-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition shadow-lg font-semibold"
      >
        Add Project
      </button>
      <button
        v-else
        @click="openModal"
        class="bg-blue-500 text-white w-10 h-10 text-2xl font-bold rounded-full hover:bg-blue-600 transition flex items-center justify-center"
      >
        +
      </button>
    </slot>
    <!-- المودال نفسه -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-[999] bg-black/40 backdrop-blur-sm"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <!-- زر الإغلاق -->
        <div class="flex justify-end">
          <button @click="closeModal" class="text-gray-500  cursor-pointer hover:text-gray-700">
            ✕
          </button>
        </div>
        <!-- العنوان -->
        <h2 class="text-xl font-semibold mb-4 text-center  cursor-pointer">Add Project</h2>
        <!-- النموذج -->
        <div class="space-y-4">
          <!-- اسم المشروع -->
          <div>
            <label for="projectName" class="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              v-model="projectName"
              placeholder="Enter project name"
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black focus:outline-none"
            />
          </div>
          <!-- اختيار الملف -->
          <div>
            <label for="fileUpload" class="  cursor-pointer block text-sm font-medium text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              id="fileUpload"
              @change="handleFileUpload"
              class="mt-1 block w-full text-sm  cursor-pointer text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>
        <!-- زر الإرسال -->
        <div class="mt-6 flex justify-end">
          <button
            @click="submitForm"
            :disabled="isLoading"
            class="bg-blue-500 text-white px-4 py-2 rounded-md  cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
          >
            {{ isLoading ? 'Uploading...' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { uploadFile, processFile, indexProject } from '../api.js'
const isSidebarOpen = inject('isSidebarOpen')
const isModalOpen = ref(false)
const projectName = ref('')
const selectedFile = ref(null)
const isLoading = ref(false)
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  projectName.value = ''
  selectedFile.value = null
  isLoading.value = false
}
const handleFileUpload = (e) => {
  selectedFile.value = e.target.files[0]
}
const submitForm = async () => {
  if (!projectName.value || !selectedFile.value) {
    alert('يرجى إدخال اسم المشروع واختيار ملف.')
    return
  }
  isLoading.value = true
  try {
    // 1. رفع الملف
    await uploadFile(projectName.value, selectedFile.value)
    // 2. معالجة الملف (بدون file_id)
    await processFile(projectName.value, {
      chunk_size: 1000,
      overlap_size: 200,
      do_reset: 0
    })
    // 3. فهرسة المشروع
    await indexProject(projectName.value, {})
    // 4. رسالة نجاح
    alert('✅ تم رفع الملف ومعالجته وفهرسته بنجاح!')
    closeModal()
  } catch (error) {
    console.error('❌ خطأ أثناء تجهيز المشروع:', error)
    alert('حدث خطأ أثناء تجهيز المشروع.')
  } finally {
    isLoading.value = false
  }
}
</script>
