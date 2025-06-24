<script setup lang="ts">
  import { Moon, Skull, Sun, Sword } from 'lucide-vue-next'

  import { Button } from '@/components/ui/button'
  import { Switch } from '@/components/ui/switch'
  import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
  import { useI18n } from '@/composables/useI18n'
  import { useTheme } from '@/composables/useTheme'

  const { isDark, isJedi, toggleMode, toggleFaction } = useTheme()
  const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-8" role="group" aria-label="Theme and faction controls">
    <div class="flex items-center gap-2 pt-1">
      <span class="text-sm" id="faction-label">{{ t('common.currentFaction') }}</span>
      <span
        class="text-sm font-bold"
        :class="isJedi ? 'text-blue-600' : 'text-red-600'"
        aria-live="polite"
        aria-describedby="faction-label"
      >
        {{ isJedi ? t('common.jedi') : t('common.sith') }}
      </span>
    </div>

    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="default"
          size="icon"
          @click="toggleFaction"
          :class="isJedi ? 'text-blue-600 border-blue-200' : 'text-red-600 border-red-200'"
          :aria-label="`${t('common.switchTo')} ${isJedi ? t('common.sith') : t('common.jedi')} faction`"
          :aria-pressed="isJedi"
        >
          <Sword v-if="isJedi" class="h-4 w-4 text-white" aria-hidden="true" />
          <Skull v-else class="h-4 w-4 text-white" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="center">
        {{ t('common.changeFaction') }}
      </TooltipContent>
    </Tooltip>

    <div class="flex items-center gap-2">
      <Sun class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Switch
        :model-value="isDark"
        @update:model-value="toggleMode"
        class="data-[state=checked]:bg-primary"
        :aria-label="`${t('common.switchTo')} ${isDark ? t('common.lightMode') : t('common.darkMode')}`"
        :aria-checked="isDark"
        role="switch"
      />
      <Moon class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </div>
  </div>
</template>
