<script setup lang="ts">
  import { Moon, Sun, Sword, Skull } from 'lucide-vue-next'

  import { Button } from '@/components/ui/button'
  import { Switch } from '@/components/ui/switch'
  import { useTheme } from '@/composables/useTheme'

  const { isDark, isJedi, toggleMode, toggleFaction } = useTheme()
</script>

<template>
  <div class="flex items-center gap-3" role="group" aria-label="Theme and faction controls">
    <div class="flex items-center gap-2 pt-1">
      <span class="text-sm" id="faction-label">Current faction:</span>
      <span
        class="text-sm font-bold"
        :class="isJedi ? 'text-blue-600' : 'text-red-600'"
        aria-live="polite"
        aria-describedby="faction-label"
      >
        {{ isJedi ? 'Jedi' : 'Sith' }}
      </span>
    </div>
    <Button
      variant="outline"
      size="icon"
      @click="toggleFaction"
      :class="isJedi ? 'text-blue-600 border-blue-200' : 'text-red-600 border-red-200'"
      :aria-label="`Switch to ${isJedi ? 'Sith' : 'Jedi'} faction`"
      :aria-pressed="isJedi"
    >
      <Sword v-if="isJedi" class="h-4 w-4" aria-hidden="true" />
      <Skull v-else class="h-4 w-4" aria-hidden="true" />
    </Button>

    <div class="flex items-center gap-2">
      <Sun class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Switch
        :model-value="isDark"
        @update:model-value="toggleMode"
        class="data-[state=checked]:bg-primary"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        :aria-checked="isDark"
        role="switch"
      />
      <Moon class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </div>
  </div>
</template>
