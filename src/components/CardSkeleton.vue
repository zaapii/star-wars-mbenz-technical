<script setup lang="ts">
  import { Skeleton } from './ui/skeleton'

  defineProps<{
    isLoading: boolean
    itemsPerPage: number
  }>()
</script>

<template>
  <div
    v-if="isLoading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    role="status"
    aria-live="polite"
    aria-label="Loading characters"
  >
    <div v-for="i in itemsPerPage" :key="i" class="space-y-4">
      <Skeleton class="h-48 w-full rounded-lg" aria-hidden="true" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-3/4" aria-hidden="true" />
        <Skeleton class="h-4 w-1/2" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>
