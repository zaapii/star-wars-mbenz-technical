<script setup lang="ts">
  import { cn } from '@/lib/utils'

  interface CardFooterProps {
    class?: string
  }

  const props = withDefaults(defineProps<CardFooterProps>(), {
    class: '',
  })
</script>

<template>
  <div :class="cn('flex items-center p-6 pt-0', props.class)">
    <slot />
  </div>
</template>
