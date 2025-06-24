<script setup lang="ts">
  import { type Component } from 'vue'

  interface Props {
    title: string
    message: string
    icon?: Component
  }

  defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 text-center"
    role="status"
    aria-live="polite"
  >
    <div v-if="icon" class="p-4 bg-primary/10 rounded-full text-primary">
      <component :is="icon" class="w-12 h-12" aria-hidden="true" />
    </div>
    <div class="space-y-1">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <p class="text-muted-foreground max-w-md">{{ message }}</p>
    </div>
  </div>
</template>
