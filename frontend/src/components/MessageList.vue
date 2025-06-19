<template>
  <div ref="container" class="relative pt-4 pb-24 px-4 overflow-y-auto h-[80vh]
           bg-gradient-to-b from-gray-50 to-white 
           dark:from-gray-900 dark:to-gray-800
           scroll-smooth scrollbar-thin 
           scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-600
           scrollbar-track-blue-50 dark:scrollbar-track-gray-700" @scroll="checkScroll">
    <!-- Chat Messages -->
    <div v-for="(msg, index) in messages" :key="index" class="my-2 last:mb-10">
      <MessageBubble :isUser="msg.role === 'user'" :text="msg.content" />
      <p v-if="msg.timestamp" class="text-xs text-gray-400 mt-0.5 px-2 select-none dark:text-gray-500"
        :class="msg.role === 'user' ? 'text-right' : 'text-left'">
        {{ formatTime(msg.timestamp) }}
      </p>
    </div>

    <!-- Loading Bubble -->
    <div v-if="isLoading" class="my-2 last:mb-10">
      <div class="flex justify-start">
        <div class="bg-gray-300 text-gray-600 rounded-br-3xl rounded-tr-xl rounded-tl-3xl px-4 py-2 shadow-inner max-w-sm flex items-center gap-2
                 dark:bg-gray-700 dark:text-gray-300">
          <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce dark:bg-gray-400"></div>
          <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150 dark:bg-gray-400"></div>
          <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300 dark:bg-gray-400"></div>
        </div>
      </div>
    </div>

    <button v-if="showScrollButton" @click="scrollToBottom" class="fixed bottom-28 right-6 z-50 flex items-center gap-2 px-4 py-2
         bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
         text-white font-semibold rounded-full shadow-lg shadow-indigo-300/40
         hover:scale-105 active:scale-95 transition-all duration-300" aria-label="Scroll to latest message">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <span class="hidden sm:inline">Scroll to Bottom</span>
    </button>

  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import MessageBubble from './MessageBubble.vue'

const props = defineProps<{
  messages: { role: string; content: string; timestamp?: string | number }[]
  isLoading: boolean
}>()

const container = ref<HTMLElement | null>(null)
const showScrollButton = ref(false)

// Scroll to bottom when messages change
watch(
  () => props.messages,
  async () => {
    await nextTick()
    scrollToBottom()
  },
  { deep: true }
)

onMounted(() => {
  scrollToBottom()
})

// Format timestamp
function formatTime(ts: string | number) {
  const date = new Date(ts)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Scroll smoothly to bottom
function scrollToBottom() {
  if (container.value) {
    container.value.scrollTo({
      top: container.value.scrollHeight,
      behavior: 'smooth'
    })
    showScrollButton.value = false
  }
}

// Toggle scroll button visibility
function checkScroll() {
  if (container.value) {
    const threshold = 100
    const distanceFromBottom =
      container.value.scrollHeight - container.value.scrollTop - container.value.clientHeight
    showScrollButton.value = distanceFromBottom > threshold
  }
}
</script>
