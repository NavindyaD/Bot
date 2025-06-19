<template>
  <div :class="[
    'fixed inset-0 flex flex-col transition-colors duration-300',
    isDark ? 'dark bg-gray-900' : 'bg-gray-50']">
    <header
      class="relative bg-white dark:bg-gray-800 shadow px-6 py-7 border-b border-gray-200 dark:border-gray-700 flex items-center">
      <h1
        class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800 dark:text-gray-100 select-none">
        Claude Bot
      </h1>
      <div class="ml-auto flex items-center space-x-2">
        <span class="text-gray-700 dark:text-gray-300 select-none">🌞</span>
        <label for="darkModeToggle" class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="darkModeToggle" class="sr-only" v-model="isDark" />
          <div
            class="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors">
          </div>
          <div
            class="absolute left-1 top-1 bg-white border border-gray-300 dark:border-gray-600 w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5">
          </div>
        </label>
        <span class="text-gray-700 dark:text-gray-300 select-none">🌙</span>
      </div>
    </header>

    <div class="flex-1 overflow-hidden flex flex-col">
      <PromptButtons :prompts="promptSuggestions" @select="handlePromptClick" />
      <MessageList :messages="chatHistory" :isLoading="isLoading" class="flex-1" />
      <ChatBar @send="handleSend" />
    </div>

    <img src="/robot.gif" alt="Chatbot animation"
      class="fixed bottom-4 right-4 w-32 h-32 animate-pulse z-50 pointer-events-none" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import PromptButtons from './components/PromptButtons.vue'
import ChatBar from './components/ChatBar.vue'
import MessageList from './components/MessageList.vue'
import axios from 'axios'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const chatHistory = ref<ChatMessage[]>([])
const isLoading = ref(false)
const isDark = ref(false)

watch(isDark, (val) => {
  if (val) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}, { immediate: true })

const toggleDark = () => {
  isDark.value = !isDark.value
}

const promptSuggestions = [
  { icon: '💡', text: 'What is the weather today?' },
  { icon: '📚', text: 'Tell me a fun fact' },
  { icon: '🤖', text: 'What is Claude AI?' },
]

const handlePromptClick = (prompt: string) => handleSend(prompt)

const handleSend = async (userMessage: string) => {
  chatHistory.value.push({ role: 'user', content: userMessage })
  isLoading.value = true

  try {
    const response = await axios.post(
      'http://localhost:5000/api/chat',
      { prompt: userMessage },
      { headers: { 'Content-Type': 'application/json' } }
    )

    chatHistory.value.push({
      role: 'assistant',
      content: response.data.response || 'No response received',
    })
  } catch (error) {
    console.error('API Error:', error)
    chatHistory.value.push({
      role: 'assistant',
      content: error.response?.data?.message || 'Error: Could not get response',
    })
  } finally {
    isLoading.value = false
  }
}
</script>
