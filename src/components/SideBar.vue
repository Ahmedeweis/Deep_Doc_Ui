<template>
  <div class="z-[999]">
    <!-- السايدبار -->
    <div
      class="transition-all duration-300 shadow-lg border-r-2 border-[#2B7FFF] bg-gray-900 dark:bg-none text-white fixed inset-y-0 left-0 z-40 px-4 py-2"
      :class="{ 'w-64': isOpen, 'w-20': !isOpen }" :style="isDarkMode ? 'background: #18191D' : ''">
      <button
        class="absolute cursor-pointer top-14 -right-4 w-8 h-8 bg-blue-500 rounded-md text-white flex items-center justify-center shadow-md hover:bg-blue-600"
        :class="{ 'rotate-180': !isOpen }" @click="emit('toggle')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
      <!-- العنوان -->
      <div class="py-4 border-b border-gray-700">
        <h1 v-if="isOpen"
          class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#1AB8FD] via-[#A52EFB] to-[#1AB8FD]">
          Dash Board</h1>
      </div>
      <!-- روابط التنقل -->
      <nav class="pt-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.name">
            <a href="#" class="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group" :class="activeItem === item.name
              ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 shadow-lg'
              : ' hover:bg-gray-700'" @click.prevent="setActiveItem(item.name); toggleSubMenu(item.name)">
              <div
                class="flex items-center justify-center rounded-lg group-hover:bg-opacity-50 transition-all">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path :d="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
              </div>
              <span v-if="isOpen" class="whitespace-nowrap text-white font-semibold tracking-wide">
                {{ item.name }}
              </span>
            </a>
            <!-- القائمة الفرعية -->
<ul v-if="openSubMenu === item.name && item.subItems.length" class="pl-6 space-y-1 mt-1.5">
  <li
    v-for="(sub, index) in item.subItems"
    :key="sub"
    :class="[
      'flex flex-col gap-1 p-2 rounded hover:bg-gray-700 transition cursor-pointer',
      selectedProject === sub ? 'bg-gray-700' : ''
    ]"
    @click="handleProjectClick(sub)"
  >
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path :d="projectIcons[index % projectIcons.length].iconPath" />
      </svg>
      <span class="text-white text-sm">{{ sub }}</span>
    </div>
    <!-- عرض الأصول مع أيقونة ملف واسم مختصر -->
    <ul
      v-if="selectedProject === sub && projectAssets[sub] && projectAssets[sub].length"
      class="pl-8 mt-1 space-y-0.5"
    >
      <li
        v-for="asset in projectAssets[sub]"
        :key="asset.asset_id"
        class="flex items-center gap-2 text-xs text-gray-300"
      >
        <!-- أيقونة ملف -->
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        </svg>
        <!-- اسم مختصر -->
        <span class="truncate max-w-[120px]">{{ asset.asset_name }}</span>
      </li>
    </ul>
  </li>
</ul>
          </li>
        </ul>
      </nav>
      <AddProjectModal />
      <input type="text" v-model="assetsProjectName" placeholder="Project name"
        class="mt-4 w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button
        class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 mt-2 rounded-md hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition shadow-lg font-semibold"
        @click="fetchAssets">
        Get Project Assets
      </button>
      <ul v-if="assetsList.length" class="mt-4 text-sm text-white space-y-1 max-h-40 overflow-auto">
        <li v-for="asset in assetsList" :key="asset.asset_id">
          {{ asset.asset_name }}
          <button class="ml-2 bg-blue-500 px-2 py-1 rounded text-xs" @click="downloadAsset(asset.asset_name)">
            Download
          </button>
        </li>
      </ul>
      <p
        class="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 mt-4 rounded-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition shadow-lg font-semibold text-center">
        Open PDF Viewer
    </p>
      <div class="absolute bottom-4 left-4">
        <button class="flex items-center p-2 rounded-lg cursor-not-allowed  bg-gray-700 transition-colors duration-200"
          @click="toggleTheme">
          <svg v-if="isDarkMode" class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <span v-if="isOpen">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>
    </div>
    <!-- تغبيش الخلفية في الموبايل -->
    <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden" @click="emit('toggle')"></div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref , reactive } from 'vue'
import AddProjectModal from './AddProjectModal.vue'
import { indexProject, processFile, getAssets, downloadAssetFile } from '../api.js'
const projectAssets = reactive({})
const props = defineProps({ isOpen: Boolean })
// const inputName = ref('')
// const indexxName = ref('')
const emit = defineEmits(['toggle','project-selected'])
const selectedProject = ref(null)
const selectProject = (projectName) => {
  selectedProject.value = projectName
  emit('project-selected', projectName)
}
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
// const processName = async () => {
//   if (!inputName.value) {
//     alert('يرجى إدخال اسم المشروع')
//     return
//   }
//   try {
//     await processFile(inputName.value, {
//       chunk_size: 1000,
//       overlap_size: 200,
//       do_reset: 1
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }
//     })
//     alert('✅ تم معالجة المشروع بنجاح!')
//   } catch (e) {
//     alert('❌ حدث خطأ أثناء تجهيز المشروع')
//     console.error(e)
//   }
// }
// const indexName = async () => {
//   if (!indexxName.value) {
//     alert('يرجى إدخال اسم المشروع للفهرسة')
//     return
//   }
//   try {
//     await indexProject(indexxName.value, {})
//     alert('✅ تم فهرسة المشروع بنجاح!')
//   } catch (e) {
//     alert('❌ حدث خطأ أثناء الفهرسة')
//     console.error(e)
//   }
// }
const setActiveItem = (name) => {
  activeItem.value = name
}
const closeSidebar = () => {
  if (window.innerWidth < 768) {
    emit('toggle')
  }
}
const isDarkMode = ref(document.documentElement.classList.contains('dark'))
const fetchProjectAssets = async (projectName) => {
  try {
    const res = await getAssets(projectName)
    projectAssets[projectName] = res.data.assets
    console.log(`[Debug] Assets for ${projectName}:`, res.data.assets)
  } catch (e) {
    console.error(`Error fetching assets for ${projectName}:`, e)
    projectAssets[projectName] = [] // To avoid undefined checks
  }
}
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
const dummyProjects = ref([
  { name: 'CVTest'},
  { name: 'Javascript'}, // error
  {name : 'thecleancoder'}
])
const navItems = [
  {
    name: 'Home',
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    subItems: [],
  },
  {
    name: 'Projects',
    iconPath:
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
       subItems: dummyProjects.value.map(project => project.name),
  },
  {
    name: 'History',
    iconPath:
      'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    subItems: [],
  },
]
const openSubMenu = ref(null)
const toggleSubMenu = (name) => {
  openSubMenu.value = openSubMenu.value === name ? null : name
}
const projectIcons = [
  { name: 'Analytics', iconPath: 'M3 3h18v18H3V3zm5 14h2V7H8v10zm4 0h2V3h-2v14zm4 0h2v-7h-2v7z' },
  { name: 'Design', iconPath: 'M12 2l9 21H3L12 2zm0 4.84L5.53 20h12.94L12 6.84z' },
  { name: 'Development', iconPath: 'M8 5v14l11-7L8 5z' },
  { name: 'Marketing', iconPath: 'M4 4h16v16H4V4zm2 2v12h12V6H6z' },
  { name: 'Finance', iconPath: 'M12 1l3 5h-6l3-5zm0 22l-3-5h6l-3 5zM1 12l5-3v6l-5-3zm22 0l-5 3V9l5 3z' },
  { name: 'HR', iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { name: 'Security', iconPath: 'M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z' },
  { name: 'Support', iconPath: 'M12 2C6.48 2 2 6.48 2 12h4c0-4.41 3.59-8 8-8V2z' },
  { name: 'Research', iconPath: 'M20 14l-8-8-8 8h16zm0 4H4v2h16v-2z' },
  { name: 'Backup', iconPath: 'M12 4l4 4h-3v4h-2V8H8l4-4zm0 16l-4-4h3v-4h2v4h3l-4 4z' }
];
const handleProjectClick = async (projectName) => {
  selectedProject.value = projectName
  emit('project-selected', projectName)
  if (!projectAssets[projectName]) {
    await fetchProjectAssets(projectName)
  }
}
</script>
<style scoped>
/* يمكن تركه فاضي حاليًا أو استخدامه لاحقًا */
</style>
