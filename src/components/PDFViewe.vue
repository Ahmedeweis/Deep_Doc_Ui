<script setup>
import { ref } from 'vue'
import { VuePdf } from 'vue3-pdfjs'
const pdfUrl = ref('/test.pdf')
</script>
<template>
  <VuePdf :src="pdfUrl" style="width: 100%; height: 80vh" />
</template>
