<script setup lang="ts">
  import { AlertCircle } from 'lucide-vue-next'

  import { Button } from '@/components/ui/button'

  interface Props {
    title?: string
    message?: string
    error?: Error | null
    onRetry?: () => void
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'An error occurred',
    message: 'Something went wrong.',
    error: null,
    onRetry: undefined,
  })

  const finalMessage = props.error?.message || props.message
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 text-center h-full"
    role="alert"
    aria-live="polite"
  >
    <AlertCircle class="w-16 h-16 text-destructive" aria-hidden="true" />
    <div class="space-y-1">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <p class="text-muted-foreground max-w-md">
        {{ finalMessage }}
      </p>
    </div>
    <Button
      v-if="onRetry"
      @click="onRetry"
      aria-label="Retry loading data"
      data-testid="retry-button"
    >
      Try Again
    </Button>
  </div>
</template>
