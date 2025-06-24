import { computed, readonly, ref, type Ref } from 'vue'

export type SortDirection = 'asc' | 'desc'

export interface SortOption {
  key: string
  label: string
  type: 'string' | 'date'
}

export interface UseDataSortOptions {
  defaultSortKey?: string
  defaultDirection?: SortDirection
  sortOptions?: SortOption[]
}

export function useDataSort<T extends Record<string, unknown>>(
  data: Ref<T[]> | Ref<readonly T[]> | undefined,
  options: UseDataSortOptions = {}
) {
  const {
    defaultSortKey = 'name',
    defaultDirection = 'asc',
    sortOptions = [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'created', label: 'Created', type: 'date' },
    ],
  } = options

  const sortKey = ref(defaultSortKey)
  const sortDirection = ref<SortDirection>(defaultDirection)

  const sortedData = computed(() => {
    if (!data?.value) {
      return []
    }

    if (!sortKey.value) return data.value

    const sorted = [...data.value].sort((a, b) => {
      const aValue = a[sortKey.value]
      const bValue = b[sortKey.value]

      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortDirection.value === 'asc' ? -1 : 1
      if (bValue == null) return sortDirection.value === 'asc' ? 1 : -1

      const sortOption = sortOptions.find(option => option.key === sortKey.value)
      const type = sortOption?.type || 'string'

      let comparison = 0

      switch (type) {
        case 'string':
          comparison = String(aValue).localeCompare(String(bValue))
          break
        case 'date':
          comparison = new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
          break
        default:
          comparison = String(aValue).localeCompare(String(bValue))
      }

      return sortDirection.value === 'asc' ? comparison : -comparison
    })

    return sorted
  })

  const setSortKey = (key: string) => {
    if (sortKey.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortDirection.value = 'asc'
    }
  }

  const setSortDirection = (direction: SortDirection) => {
    sortDirection.value = direction
  }

  const resetSort = () => {
    sortKey.value = defaultSortKey
    sortDirection.value = defaultDirection
  }

  const getCurrentSortOption = computed(() =>
    sortOptions.find(option => option.key === sortKey.value)
  )

  return {
    sortKey: readonly(sortKey),
    sortDirection: readonly(sortDirection),

    sortedData: readonly(sortedData),
    sortOptions: readonly(sortOptions),
    getCurrentSortOption: readonly(getCurrentSortOption),

    setSortKey,
    setSortDirection,
    resetSort,
  }
}
