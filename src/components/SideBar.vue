<template>
  <div class="z-[999]">
    <!-- السايدبار -->
<div
  class="transition-all duration-300 shadow-lg border-r-2 border-[#2B7FFF] bg-gray-900 dark:bg-none text-white fixed inset-y-0 left-0 z-40 px-4 py-2"
  :class="{ 'w-64': isOpen, 'w-20': !isOpen }"
  :style="isDarkMode ? 'background: #18191D' : ''"
>
      <button
        class="absolute cursor-pointer top-14 -right-4 w-8 h-8 bg-blue-500 rounded-md text-white flex items-center justify-center shadow-md hover:bg-blue-600"
        :class="{ 'rotate-180': !isOpen }"
        @click="emit('toggle')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
      <!-- العنوان -->
      <div class="py-4 border-b border-gray-700">
        <h1 v-if="isOpen" class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#1AB8FD] via-[#A52EFB] to-[#1AB8FD]">Dash Board</h1>
      </div>
      <!-- روابط التنقل -->
      <nav class="pt-4" v-if="false">
       <ul class="space-y-2">
  <li v-for="item in navItems" :key="item.name">
    <a
      href="#"
      class="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
      :class="activeItem === item.name
        ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 shadow-lg'
        : 'bg-gray-800 hover:bg-gray-700'"
      @click.prevent="setActiveItem(item.name); closeSidebar()"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900 group-hover:bg-opacity-50 transition-all">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path :d="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </div>
      <span v-if="isOpen" class="whitespace-nowrap text-white font-semibold tracking-wide">
        {{ item.name }}
      </span>
    </a>
  </li>
</ul>
      </nav>
      <!-- تبديل الوضع الداكن -->
         <AddProjectModal />
<input
    type="text"
    placeholder="name..."
    v-model="inputName"
    class="mt-4 w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    class="bg-gradient-to-r from-blue-500 cursor-pointer via-purple-500 to-pink-500 text-white px-4 py-2 mt-5 rounded-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition shadow-lg font-semibold"
    @click="processName"
  >
    process
  </button>
  <input
    type="text"
    placeholder="name..."
    v-model="indexxName"
    class="mt-4 w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
  class="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-4 py-2 mt-2 rounded-md hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition shadow-lg font-semibold"
  @click="indexName"
>
  Index Project
</button>
    <input
  type="text"
  v-model="assetsProjectName"
  placeholder="Project name"
  class="mt-4 w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<button
  class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 mt-2 rounded-md hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition shadow-lg font-semibold"
  @click="fetchAssets"
>
  Get Project Assets
</button>
<ul v-if="assetsList.length" class="mt-4 text-sm text-white space-y-1 max-h-40 overflow-auto">
  <li v-for="asset in assetsList" :key="asset.asset_id">
    {{ asset.asset_name }}
    <button
      class="ml-2 bg-blue-500 px-2 py-1 rounded text-xs"
      @click="downloadAsset(asset.asset_name)"
    >
      Download
    </button>
  </li>
</ul>
<router-link
  to="/pdf"
  class="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 mt-4 rounded-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition shadow-lg font-semibold text-center"
>
  Open PDF Viewer
</router-link>
      <div class="absolute bottom-4 left-4" v-if="false">
        <button
          class="flex items-center p-2 rounded-lg cursor-not-allowed  bg-gray-700 transition-colors duration-200"
          @click="toggleTheme"
        >
          <svg
            v-if="isDarkMode"
            class="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span v-if="isOpen">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>
    </div>
    <!-- تغبيش الخلفية في الموبايل -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
      @click="emit('toggle')"
    ></div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import AddProjectModal from './AddProjectModal.vue'
import { indexProject, processFile , getAssets, downloadAssetFile } from '../api.js'
const props = defineProps({ isOpen: Boolean })
const inputName = ref('')
const indexxName = ref('')
const emit = defineEmits(['toggle'])
const activeItem = ref('Home')
const assetsProjectName = ref('')
const assetsList = ref([])
const fetchAssets = async () => {
  if (!assetsProjectName.value) {
    alert('Please enter a project name')
    return
  }
  try {
    const res = await getAssets(assetsProjectName.value)
    assetsList.value = res.data.assets
    console.log(res.data)
  } catch (e) {
    alert('Failed to get assets')
    console.error(e)
  }
}
const downloadAsset = async (assetName) => {
  if (!assetsProjectName.value || !assetName) return
  try {
    const res = await downloadAssetFile(assetsProjectName.value, assetName, {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', assetName)
    document.body.appendChild(link)
    link.click()
  } catch (err) {
    console.error(err)
    alert('Failed to download')
  }
}
const processName = async () => {
  if (!inputName.value) {
    alert('يرجى إدخال اسم المشروع')
    return
  }
  try {
    await processFile(inputName.value, {
      chunk_size: 1000,
      overlap_size: 200,
      do_reset: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    alert('✅ تم معالجة المشروع بنجاح!')
  } catch (e) {
    alert('❌ حدث خطأ أثناء تجهيز المشروع')
    console.error(e)
  }
}
// دالة مستقلة لفهرسة المشروع
const indexName = async () => {
  if (!indexxName.value) {
    alert('يرجى إدخال اسم المشروع للفهرسة')
    return
  }
  try {
    await indexProject(indexxName.value, {})
    alert('✅ تم فهرسة المشروع بنجاح!')
  } catch (e) {
    alert('❌ حدث خطأ أثناء الفهرسة')
    console.error(e)
  }
}
const setActiveItem = (name) => {
  activeItem.value = name
}
const closeSidebar = () => {
  if (window.innerWidth < 768) {
    emit('toggle')
  }
}
const navItems = [
  {
    name: 'Home',
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    name: 'Profile',
    iconPath:
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    name: 'Settings',
    iconPath:
      'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    name: 'History',
    iconPath:
      'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
]
const isDarkMode = ref(document.documentElement.classList.contains('dark'))
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
// تفعيل الوضع الداكن تلقائيًا
if (
  localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
  isDarkMode.value = true
}
</script>
<style scoped>
/* يمكن تركه فاضي حاليًا أو استخدامه لاحقًا */
</style>
