<template>
  <div class="flex gap-2 p-4">
    <button
      v-for="(prompt, idx) in prompts"
      :key="idx"
      class="bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
      @click="$emit('select', prompt.text)"
    >
      💡 {{ prompt.text }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  prompts: { icon: string; text: string }[]
}>()
</script>
