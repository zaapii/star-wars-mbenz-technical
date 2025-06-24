<script setup lang="ts">
  import { onMounted } from 'vue'

  import { Toaster } from '@/components/ui/sonner'

  import BaseLayout from './components/layout/BaseLayout.vue'
  import PageTransition from './components/layout/PageTransition.vue'
  import SkipLink from './components/SkipLink.vue'
  import { useAccessibility } from './composables/useAccessibility'
  import { useTheme } from './composables/useTheme'
  import 'vue-sonner/style.css'

  const { mainContentRef, announce } = useAccessibility()

  onMounted(() => {
    useTheme().loadSavedTheme()

    const app = document.getElementById('app')
    if (app) {
      app.setAttribute('tabindex', '-1')
    }

    announce('Star Wars Universe Data Explorer loaded', 'polite')
  })
</script>

<template>
  <div id="app" tabindex="-1">
    <SkipLink />
    <div ref="mainContentRef" id="main-content" class="sr-only" tabindex="-1"></div>
    <BaseLayout>
      <RouterView v-slot="{ Component, route }">
        <PageTransition :component="Component" :route="route" />
      </RouterView>
    </BaseLayout>
    <Toaster richColors position="bottom-left" />
  </div>
</template>
