<script setup lang="ts">
  import { useAccessibility } from '@/composables/useAccessibility'

  const { skipLinkRef, handleSkipLink } = useAccessibility()
</script>

<template>
  <a
    ref="skipLinkRef"
    href="#main-content"
    @click="handleSkipLink"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    aria-label="Skip to main content"
  >
    Skip to main content
  </a>
</template>
