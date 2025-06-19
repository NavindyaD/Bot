<template>
  <div
    class="fixed bottom-0 w-full px-4 py-3 
           bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-300">
    <div class="max-w-3xl mx-auto flex items-center gap-2">
      <input v-model="message" @keyup.enter="send" class="flex-1 px-4 py-3 text-gray-800 dark:text-black placeholder-gray-400 dark:placeholder-gray-500
         border border-gray-300 dark:border-gray-600 rounded-full shadow-sm
         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        placeholder="Type your message..." />

      <button @click="send" class="flex items-center justify-center px-5 py-3 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 active:scale-95
               text-white font-semibold rounded-full shadow transition-all" aria-label="Send message">

        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.5 19l19-7L2.5 5v6l13 1-13 1v6z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['send'])
const message = ref('')

function send() {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>
