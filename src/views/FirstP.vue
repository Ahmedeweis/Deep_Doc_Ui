<template>
  <div class="flex h-screen ">
    <!-- Sidebar -->
    <SideBar :isOpen="isSidebarOpen" @toggle="toggleSidebar" />
    <!-- Main Content -->
    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-20'
      ]"
    >
      <Header />
      <!-- محتوى الصفحة -->
      <div class="flex-1 overflow-auto relative dark:bg-gray-900 px-4">
        <router-view class="pb-32" />
      </div>
      <!-- الشات مثبت في الأسفل -->
      <chat
        :class="[
          'fixed bottom-6 z-50 transition-all duration-300',
          isSidebarOpen
            ? 'left-[calc(50%+11rem)] w-[1500px] md:left-[calc(50%+8rem)] md:w-[1500px]'
            : 'left-1/2 w-[1500px]',
          'transform -translate-x-1/2'
        ]"
      />
        <PDFViewe />
    </div>
  </div>
</template>
<script setup>
import Header from '../components/Header.vue'
import PDFViewe from '../components/PDFViewe.vue'
import SideBar from '../components/SideBar.vue'
import chat from '../components/chat.vue'
import { ref, provide } from 'vue'
const isSidebarOpen = ref(true)
//
provide('isSidebarOpen', isSidebarOpen)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
