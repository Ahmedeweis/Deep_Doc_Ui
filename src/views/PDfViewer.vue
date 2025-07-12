<template>
  <div>
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
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-[999] bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700">
          ✕
        </button>
        <h2 class="text-xl font-semibold mb-4 text-center">Add Project</h2>
        <div class="space-y-4">
          <div>
            <label for="projectName" class="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              id="projectName"
              v-model="projectName"
              placeholder="Enter project name"
              class="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black focus:outline-none"
            />
          </div>
          <div>
            <label for="fileUpload" class="block text-sm font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              id="fileUpload"
              @change="handleFileUpload"
              class="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <div v-if="statusMessage" class="text-center font-medium text-blue-600">
            {{ statusMessage }}
          </div>
          <div v-if="isLoading" class="flex justify-center mt-4">
            <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              @click="submitForm"
              :disabled="isLoading"
              class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
            >
              {{ isLoading ? 'Processing...' : 'Send' }}
            </button>
          </div>
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
const statusMessage = ref("")
const openModal = () => {
  isModalOpen.value = true
  statusMessage.value = ""
}
const closeModal = () => {
  isModalOpen.value = false
  projectName.value = ''
  selectedFile.value = null
  isLoading.value = false
  statusMessage.value = ""
}
const handleFileUpload = (e) => {
  selectedFile.value = e.target.files[0]
}
const submitForm = async () => {
  if (!projectName.value || !selectedFile.value) {
    statusMessage.value = '⚠️ يرجى إدخال اسم المشروع واختيار ملف.'
    return
  }
  isLoading.value = true
  statusMessage.value = '🚀 جاري رفع الملف...'
  try {
    await uploadFile(projectName.value, selectedFile.value)
    statusMessage.value = '⚙️ جاري معالجة الملف...'
    await processFile(projectName.value, {
      chunk_size: 1000,
      overlap_size: 200,
      do_reset: 1
    })
    statusMessage.value = '📂 جاري فهرسة المشروع...'
    await indexProject(projectName.value, {})
    statusMessage.value = '✅ تم رفع ومعالجة وفهرسة المشروع بنجاح!'
    setTimeout(() => {
      closeModal()
    }, 1500)
  } catch (error) {
    console.error('❌ خطأ أثناء تجهيز المشروع:', error)
    statusMessage.value = '❌ حدث خطأ. حاول مرة أخرى.'
  } finally {
    isLoading.value = false
  }
}
</script>
