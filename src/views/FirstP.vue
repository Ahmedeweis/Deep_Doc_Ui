<template>
 <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
<SideBar :isOpen="isSidebarOpen" @toggle="toggleSidebar" @project-selected="handleProjectSelect" />
    <!-- Main Content -->
    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-20'
      ]"
    >
      <Header />
      <!-- محتوى الصفحة: صف أفقي -->
      <div class="flex flex-row h-full gap-4">
        <!-- PDFViewe على اليمين ويأخذ 2/3 -->
<div class="flex-[2] min-w-0 order-2 max-h-screen overflow-auto">
          <PDFViewe />
        </div>
        <!-- الشات على اليسار ويأخذ 1/3 -->
        <div class="flex-[1]  min-w-0 order-1  self-end mb-[50px]">
<chat :selectedProject="selectedProject" />
        </div>
      </div>
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
const selectedProject = ref('')
const handleProjectSelect = (projectName) => {
  selectedProject.value = projectName;
  console.log("Selected Project:", projectName);
};
provide('isSidebarOpen', isSidebarOpen)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
