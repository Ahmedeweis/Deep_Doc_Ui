<template>
  <header class="w-full flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow">
        <nav class="hidden md:flex gap-6 font-medium">
      <RouterLink to="/" class="text-blue-400">Home</RouterLink>
      <RouterLink to="/about" class="text-blue-400">About Us</RouterLink>
      <RouterLink to="/contact" class="text-blue-400">Contact</RouterLink>
    </nav>
    <div class="flex items-center gap-2">
      <img src="/Logo.png" alt="Logo" class="w-8 h-8" />
      <span class="text-xl font-bold">DeepDoc</span>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
const isDark = ref(false)
// const toggleDarkMode = () => {
//   isDark.value = !isDark.value
//   if (isDark.value) {
//     document.documentElement.classList.add('dark')
//     localStorage.setItem('theme', 'dark')
//   } else {
//     document.documentElement.classList.remove('dark')
//     localStorage.setItem('theme', 'light')
//   }
// }
// onMounted(() => {
//   const savedTheme = localStorage.getItem('theme')
//   if (savedTheme === 'light') {
//     isDark.value = false
//     document.documentElement.classList.remove('dark')
//   } else {
//     isDark.value = true
//     document.documentElement.classList.add('dark')
//   }
// })
</script>
<style>
</style>
