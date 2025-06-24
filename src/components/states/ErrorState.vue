<script setup lang="ts">
  import { AlertCircle } from 'lucide-vue-next'

  import { Button } from '@/components/ui/button'
  import { useI18n } from '@/composables/useI18n'

  interface Props {
    title?: string
    message?: string
    error?: Error | null
    onRetry?: () => void
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    message: '',
    error: null,
    onRetry: undefined,
  })

  const { t } = useI18n()

  const finalTitle = props.title || t('states.error.title')
  const finalMessage = props.error?.message || props.message || t('states.error.message')
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 text-center h-full"
    role="alert"
    aria-live="polite"
  >
    <AlertCircle class="w-16 h-16 text-destructive" aria-hidden="true" />
    <div class="space-y-1">
      <h2 class="text-2xl font-bold">{{ finalTitle }}</h2>
      <p class="text-muted-foreground max-w-md">
        {{ finalMessage }}
      </p>
    </div>
    <Button
      v-if="onRetry"
      @click="onRetry"
      :aria-label="t('states.error.retryLoadingData')"
      data-testid="retry-button"
    >
      {{ t('common.retry') }}
    </Button>
  </div>
</template>
