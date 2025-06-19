<template>
  <div :class="isUser ? 'justify-end' : 'justify-start'" class="flex mb-3 px-4">
    <div
      :class="[
        isUser
          ? 'bg-blue-500 text-white rounded-bl-3xl rounded-tl-xl rounded-tr-3xl shadow-md max-w-xs'
          : 'bg-gray-300 text-gray-900 rounded-br-3xl rounded-tr-xl rounded-tl-3xl shadow-inner max-w-full lg:max-w-4xl',
        'px-4 py-2 break-words'
      ]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isUser: boolean; text: string }>()
</script>
