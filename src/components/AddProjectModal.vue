<template>
  <div class="">
    <!-- Modal Trigger Button -->
<slot name="trigger">
  <button
    v-if="isSidebarOpen"
    @click="openModal"
    class="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-blue-600 transition"
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
    <!-- Modal Overlay -->
    <div
      v-if="isModalOpen"
class="fixed inset-0 flex items-center justify-center z-[999] bg-black/40 backdrop-blur-sm"
    >
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <!-- Close Button -->
        <div class="flex justify-end">
          <button @click="closeModal" class="text-gray-500 cursor-pointer hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Modal Title -->
        <h2 class="text-xl font-semibold mb-4 text-center">Add Project</h2>
        <!-- Form Fields -->
        <div class="space-y-4">
          <!-- Project Name Input -->
          <div>
            <label for="projectName" class="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              v-model="projectName"
              placeholder="Enter project name"
              class="mt-1 block w-full rounded-md border-none shadow-sm text-black focus:outline-none focus:ring-0"
            />
          </div>
          <!-- File Upload Input -->
          <div>
            <label for="fileUpload" class="block text-sm font-medium text-gray-700">
              Upload File
            </label>
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
        </div>
        <!-- Submit Button -->
        <div class="mt-6 flex justify-end">
          <button
            @click="submitForm"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
const isModalOpen = ref(false)
const projectName = ref('')
const selectedFile = ref(null)
const isSidebarOpen = inject('isSidebarOpen')
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
  projectName.value = ''
  selectedFile.value = null
}
const handleFileUpload = (e) => {
  selectedFile.value = e.target.files[0]
}
const submitForm = () => {
  console.log('Project Name:', projectName.value)
  console.log('Uploaded File:', selectedFile.value)
  closeModal()
}
</script>
