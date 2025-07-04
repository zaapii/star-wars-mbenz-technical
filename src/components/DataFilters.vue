<script setup lang="ts">
  import { ArrowDown, RefreshCcw, X } from 'lucide-vue-next'
  import { computed } from 'vue'

  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import type { SortDirection, SortOption } from '@/composables/useDataSort'
  import { useI18n } from '@/composables/useI18n'
  import { humanReadableDate } from '@/lib/utils'

  interface Props {
    searchTerm: string
    sortKey: string
    sortDirection: SortDirection
    sortOptions: SortOption[]
    setSearchTerm: (term: string) => void
    clearSearch: () => void
    setSortKey: (key: string) => void
    setSortDirection: (direction: SortDirection) => void
    dataUpdatedAt: number | undefined
    isRefreshing: boolean
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'refresh'): void
  }>()

  const { t } = useI18n()

  const hasActiveFilters = computed(() => props.searchTerm.trim() !== '')

  const activeFiltersCount = computed(() => {
    let count = 0
    if (props.searchTerm.trim()) count++
    return count
  })

  const handleSearchInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    props.setSearchTerm(target.value)
  }

  const toggleSortDirection = () => {
    const newDirection: SortDirection = props.sortDirection === 'asc' ? 'desc' : 'asc'
    props.setSortDirection(newDirection)
  }

  const clearAllFilters = () => {
    props.clearSearch()
  }
</script>

<template>
  <div
    class="space-y-4 p-4 border border-primary/50 rounded-lg bg-card"
    role="region"
    :aria-label="t('common.dataFiltersAndSorting')"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold" id="filters-heading">{{ t('common.filtersAndSort') }}</h3>
      <div class="flex items-center space-x-2">
        <Button
          v-if="hasActiveFilters"
          variant="outline"
          size="sm"
          @click="clearAllFilters"
          :aria-label="t('common.clearAllFilters')"
        >
          <X class="h-4 w-4" aria-hidden="true" />
          {{ t('common.clearAll') }}
        </Button>
        <Badge
          v-if="activeFiltersCount > 0"
          variant="default"
          :aria-label="t('common.numberOfActiveFilters')"
        >
          {{ activeFiltersCount }} {{ t('common.active') }}
        </Badge>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div class="space-y-2">
        <label for="search" class="text-sm font-medium">{{ t('common.searchByName') }}</label>
        <div class="relative">
          <Input
            id="search"
            type="text"
            variant="default"
            data-testid="search-by-name-input"
            :modelValue="searchTerm"
            @input="handleSearchInput"
            class="pr-10"
            :aria-describedby="searchTerm ? 'search-clear' : undefined"
            :placeholder="t('common.enterCharacterName')"
            :aria-label="t('common.searchCharactersByName')"
          />
          <Button
            v-if="searchTerm"
            id="search-clear"
            variant="ghost"
            size="icon"
            @click="clearSearch"
            class="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent"
            :aria-label="t('common.clearSearch')"
          >
            <X class="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div class="space-y-2">
        <label for="sort-select" class="text-sm font-medium">{{ t('common.sortBy') }}</label>
        <div class="flex items-center space-x-2">
          <Select
            :model-value="sortKey"
            @update:model-value="value => value && setSortKey(String(value))"
          >
            <SelectTrigger id="sort-select" :aria-label="t('common.selectSortCriteria')">
              <SelectValue :placeholder="t('common.selectSortKey')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in sortOptions" :key="option.key" :value="option.key">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            @click="toggleSortDirection"
            variant="outline"
            :aria-label="`${t('common.sort')} ${sortDirection === 'asc' ? t('common.descending') : t('common.ascending')}`"
            :aria-pressed="sortDirection === 'desc'"
            data-testid="sort-by-button"
          >
            {{ sortDirection === 'asc' ? t('common.ascending') : t('common.descending') }}
            <ArrowDown
              class="h-4 w-4 transition-transform duration-300 dark:text-white"
              :class="{ 'rotate-180': sortDirection === 'asc' }"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <div class="flex justify-end flex-col items-end">
          <label for="data-updated-at" class="text-sm font-medium">{{
            t('common.lastUpdated')
          }}</label>
          <p id="data-updated-at" class="text-sm text-muted-foreground">
            {{ humanReadableDate(dataUpdatedAt || 0) }}
          </p>
        </div>
        <Button variant="default" size="lg" @click="emit('refresh')">
          <RefreshCcw
            class="h-4 w-4"
            :class="{ 'animate-spin': isRefreshing }"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  </div>
</template>
