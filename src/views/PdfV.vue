<template>
  <div class="min-h-screen flex flex-col items-center p-4 bg-gray-100">
    <div class="w-full max-w-4xl bg-white rounded shadow p-4">
      <h2 class="text-lg font-bold mb-4">عرض PDF مع Highlight حسب النص</h2>
      <div ref="pdfContainer" class="relative"></div>
      <div class="flex gap-4 mt-4">
        <button @click="prevPage" class="bg-gray-300 px-3 py-1 rounded">السابق</button>
        <button @click="nextPage" class="bg-gray-300 px-3 py-1 rounded">التالي</button>
      </div>
      <div class="flex gap-2 mt-4">
        <input v-model="highlightText" type="text" placeholder="اكتب كلمة للتظليل" class="border px-2 py-1 rounded w-full">
        <button @click="highlightWord" class="bg-yellow-400 px-3 py-1 rounded">تظليل</button>
      </div>
      <p class="mt-2">الصفحة: {{ pageNumber }} / {{ totalPages }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
const pdfContainer = ref(null);
const pageNumber = ref(1);
const totalPages = ref(0);
const highlightText = ref('');
let pdfDoc = null;
const loadPDF = async () => {
  const url = 'https://assign-genius-sought-alerts.trycloudflare.com/api/v1/data/assets/thecleancoder/kvbfozsyroum_thecleancoder.pdf';
  pdfDoc = await pdfjsLib.getDocument(url).promise;
  totalPages.value = pdfDoc.numPages;
  await renderPage();
};
let textLayerDiv = null;
const renderPage = async () => {
  const page = await pdfDoc.getPage(pageNumber.value);
  const viewport = page.getViewport({ scale: 1.5 });
  pdfContainer.value.innerHTML = '';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  pdfContainer.value.appendChild(canvas);
  await page.render({ canvasContext: context, viewport }).promise;
  textLayerDiv = document.createElement('div');
  textLayerDiv.className = 'textLayer';
  pdfContainer.value.appendChild(textLayerDiv);
  const textContent = await page.getTextContent();
  pdfjsLib.renderTextLayer({
    textContent,
    container: textLayerDiv,
    viewport,
    textDivs: [],
  });
};
const nextPage = () => {
  if (pageNumber.value < totalPages.value) {
    pageNumber.value++;
    renderPage();
  }
};
const prevPage = () => {
  if (pageNumber.value > 1) {
    pageNumber.value--;
    renderPage();
  }
};
const highlightWord = () => {
  if (!highlightText.value.trim()) return;
  const spans = textLayerDiv?.querySelectorAll('span') || [];
  spans.forEach((span) => {
    span.style.background = '';
    if (span.textContent.toLowerCase().includes(highlightText.value.toLowerCase())) {
      span.style.background = 'yellow';
    }
  });
};
onMounted(loadPDF);
</script>
<style scoped>
.textLayer {
  position: absolute;
  top: 0;
  left: 0;
  color: transparent;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.textLayer span {
  color: black;
}
</style>
