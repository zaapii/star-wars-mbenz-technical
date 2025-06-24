import { useDebounceFn } from '@vueuse/core'
import { computed, readonly, ref, type Ref } from 'vue'

import type { Person, Planet } from '@/services/api'

export interface UseDataFilterOptions {
  debounceMs?: number
  searchKey?: string
}

export function useDataFilter<T extends Planet | Person>(
  data: Ref<T[]> | Ref<readonly T[]> | undefined,
  options: UseDataFilterOptions = {}
) {
  const { debounceMs = 200, searchKey = 'name' } = options

  const searchTerm = ref('')
  const isFiltering = ref(false)

  const debouncedFilterChange = useDebounceFn(() => {
    isFiltering.value = false
  }, debounceMs)

  const filteredData = computed(() => {
    if (!data?.value) {
      return []
    }

    if (!searchTerm.value.trim()) {
      return data.value
    }

    const term = searchTerm.value.toLowerCase().trim()
    return data.value.filter(item => {
      const searchValue = item[searchKey as keyof T]
      if (!searchValue) return false

      return String(searchValue).toLowerCase().includes(term)
    })
  })

  const setSearchTerm = (term: string) => {
    searchTerm.value = term
    isFiltering.value = true
    debouncedFilterChange()
  }

  const clearSearch = () => {
    searchTerm.value = ''
    isFiltering.value = false
  }

  const hasActiveFilters = computed(() => searchTerm.value.trim() !== '')

  return {
    // State
    searchTerm: readonly(searchTerm),
    isFiltering: readonly(isFiltering),

    // Computed
    filteredData: readonly(filteredData),
    hasActiveFilters: readonly(hasActiveFilters),

    // Methods
    setSearchTerm,
    clearSearch,
  }
}
