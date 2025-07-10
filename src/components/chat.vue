<template>
  <form
    class="w-full max-w-xl px-4 py-3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl absolute bottom-6 left-1/2 transform -translate-x-1/2"
    style="max-height: 400px;"
  >
  <div
  v-if="answerStream"
  ref="answerRef"
  class="mt-4 p-3 rounded whitespace-pre-wrap overflow-y-auto max-h-[200px]"
>
  <strong>Answer:</strong>
  <p>{{ answerStream }}</p>
</div>
      <input
      type="text"
      v-model="projectName"
      placeholder=" pro name"
    />
    <label for="search-input" class="sr-only">Search</label>
    <!-- Input Field -->
<textarea
      ref="messageRef"
      v-model="questionText"
      rows="2"
      placeholder="Ask anything ... "
      @input="autoResize"
      class="w-full pt-3 px-3   text-gray-900 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 border-0 dark:bg-gray-700 dark:text-white resize-none placeholder-black dark:placeholder-black"
      style="min-height: 48px; max-height: 200px; overflow-y: auto;"
    ></textarea>
    <!-- أدوات أسفل -->
    <div class="flex items-center justify-between ">
  <div class="flex items-center gap-2 bg-[#E7F1EF] w-fit rounded-lg">
    <img
      src="/search.png"
      alt="search"
      class="w-[36px] rounded-lg p-2 cursor-pointer"
      :class="{ 'border-2 border-[#21808D]': activeIcon === 'search' }"
      @click="setActiveIcon('search')"
    />
    <img
      src="/hourglass.png"
      alt="hourglass"
      class="w-[36px] rounded-lg p-2 cursor-pointer"
      :class="{ 'border-2 border-[#21808D]': activeIcon === 'hourglass' }"
      @click="setActiveIcon('hourglass')"
    />
    <img
      src="/flag.png"
      alt="flag"
      class="w-[36px] rounded-lg p-2 cursor-pointer"
      :class="{ 'border-2 border-[#21808D]': activeIcon === 'flag' }"
      @click="setActiveIcon('flag')"
    />
  </div>
      <div class="flex items-center gap-2">
        <!-- Dropdown -->
        <div class="relative w-30 font-sans" ref="dropdownRef">
          <!-- Dropdown Button -->
          <button
            @click="toggleDropdown"
            type="button"
            class="w-full  text-gray-800 rounded-lg py-1 px-3 flex items-center justify-between cursor-pointer transition"
          >
            <span>Version 1</span>
            <svg
              class="w-4 h-4"
              :class="{ 'rotate-180': isOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <!-- Dropdown Menu -->
          <div
            v-if="isOpen"
            ref="dropdownMenuRef"
            :class=" [
              'absolute w-60 bg-gray-800  text-white rounded-lg shadow-lg z-10 ',
              openUpward ? 'bottom-full mb-2' : 'mt-2',
            ]"
          >
            <!-- Option 1: Grok 3 with Smartest -->
            <div class="p-3 border-b border-gray-700 hover:bg-gray-700 transition ">
              <button class="w-full text-left cursor-pointer">
                <div class="flex items-center">
                  <div>
                    <div class="text-base font-bold ">Version 1</div>
                    <div class="text-xs text-gray-400">Smartest</div>
                  </div>
                </div>
              </button>
            </div>
            <!-- Option 2: SVG + Customize Instructions + Button -->
            <div
              class="p-3 border-b border-gray-700 hover:bg-gray-700 transition flex justify-between items-center "
            >
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  />
                </svg>
                <span class="text-sm ">Customize instructions</span>
              </div>
              <button
                class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer text-sm "
              >
                Customize
              </button>
            </div>
            <!-- Option 3: SVG + Toggle -->
            <div class="p-3 hover:bg-gray-700 transition flex justify-between items-center ">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  />
                </svg>
                <span class="text-sm">Toggle Option</span>
              </div>
              <button
                @click.stop="onToggleSwitch"
                class="w-10 h-5 bg-gray-600 rounded-full p-1 transition duration-300 ease-in-out cursor-pointer "
                :class="{ 'bg-green-500': isToggled }"
              >
                <div
                  class="w-3 h-3 bg-white rounded-full shadow-md transform transition duration-300  ease-in-out"
                  :class="{ 'translate-x-5': isToggled, 'translate-x-0': !isToggled }"
                ></div>
              </button>
            </div>
          </div>
        </div>
        <!-- Send Button -->
        <button type="button"
         @click="sendQuestion"
           class=" cursor-pointer top-14 -right-4 w-8 h-8 bg-blue-500 rounded-md text-white flex items-center justify-center shadow-md hover:bg-blue-600">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
          <!-- <img src="/communication.png" alt="send" class="w-[30px] cursor-pointer" /> -->
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { BASE_STREAM_URL } from '../api.js';
import { fetchEventSource } from '@microsoft/fetch-event-source';
// import { EventSourcePolyfill } from 'event-source-polyfill';
const projectName = ref('')
const questionText = ref('')
const answerStream = ref('')
const sendQuestion = async () => {
  if (!projectName.value || !questionText.value) {
    alert('يرجى إدخال اسم المشروع والسؤال')
    return
  }
  // مبدأيًا يكون فاضي (مش جاري التحميل)
  answerStream.value = ''
  const url = `${BASE_STREAM_URL}/nlp/index/answer/stream/${projectName.value}`
  try {
    await fetchEventSource(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        text: questionText.value,
        limit: 5,
        user_id: 'user-123',
        use_chat_history: true,
        use_paraphrasing: true,
        history_limit: 5,
      }),
      onopen(res) {
        if (res.ok) {
          console.log('✅ SSE Started')
        } else {
          throw new Error(`HTTP Error: ${res.status}`)
        }
      },
      onmessage(msg) {
        if (!msg.data) return
        try {
          const parsed = JSON.parse(msg.data)
          if (parsed.event === 'chunk' && parsed.data?.chunk) {
            answerStream.value += parsed.data.chunk
          }
          if (parsed.event === 'complete') {
            console.log('✅ Stream completed')
          }
        } catch (err) {
          console.warn('🟠 غير قادر على قراءة الرد:', msg.data)
        }
      },
      onerror(err) {
        console.error('❌ SSE Error:', err)
        answerStream.value = '❌ فشل في جلب البيانات'
      },
    })
  } catch (err) {
    console.error('❌ Error أثناء الإرسال:', err)
    answerStream.value = '❌ فشل في الاتصال بالخادم'
  }
}
// Textarea state and logic
const messageRef = ref(null);
const autoResize = () => {
  const el = messageRef.value;
  if (!el) return;
  el.style.height = 'auto'; // Reset height
  el.style.overflowY = 'hidden';
  const maxHeight = 200; // Max ~10 lines
  const newHeight = el.scrollHeight;
  if (newHeight <= maxHeight) {
    el.style.height = newHeight + 'px';
  } else {
    el.style.height = maxHeight + 'px';
    el.style.overflowY = 'auto';
  }
};
onMounted(() => {
  autoResize();
});
// Dropdown state and logic
const isOpen = ref(false);
const isToggled = ref(false);
const dropdownRef = ref(null);
const dropdownMenuRef = ref(null);
const openUpward = ref(false);
const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    adjustDropdownDirection();
  }
};
const adjustDropdownDirection = () => {
  if (!dropdownRef.value || !dropdownMenuRef.value) return;
  const rect = dropdownRef.value.getBoundingClientRect();
  const menuHeight = dropdownMenuRef.value.offsetHeight;
  const spaceBelow = window.innerHeight - rect.bottom;
  openUpward.value = spaceBelow < menuHeight + 20; // 20px margin
};
const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
const toggleSwitch = () => {
  isToggled.value = !isToggled.value;
};
const activeIcon = ref(null);
// دالة لتحديد الأيقونة النشطة
const setActiveIcon = (icon) => {
  activeIcon.value = icon;
};
</script>