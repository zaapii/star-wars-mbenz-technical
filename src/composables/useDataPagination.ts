import { ref, computed, readonly, watch, type Ref } from 'vue'

export interface UseDataPaginationOptions {
  initialPage?: number
  initialItemsPerPage?: number
  maxVisiblePages?: number
}

export function useDataPagination<T>(
  data: Ref<T[]> | Ref<readonly T[]> | undefined,
  options: UseDataPaginationOptions = {}
) {
  const { initialPage = 1, initialItemsPerPage = 10, maxVisiblePages = 5 } = options

  const currentPage = ref(initialPage)
  const itemsPerPage = ref(initialItemsPerPage)

  // Computed properties
  const totalItems = computed(() => data?.value?.length || 0)

  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)

  const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalItems.value))

  const hasNextPage = computed(() => currentPage.value < totalPages.value)

  const hasPreviousPage = computed(() => currentPage.value > 1)

  const visiblePages = computed(() => {
    const pages: number[] = []
    const total = totalPages.value
    const current = currentPage.value
    const maxVisible = maxVisiblePages

    if (total <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Calculate range to show
      let start = Math.max(1, current - Math.floor(maxVisible / 2))
      const end = Math.min(total, start + maxVisible - 1)

      // Adjust start if we're near the end
      if (end === total) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  })

  // Paginated data
  const paginatedData = computed(() => {
    if (!data?.value) {
      return []
    }

    const start = startIndex.value
    const end = endIndex.value
    return data.value.slice(start, end)
  })

  // Methods
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const firstPage = () => {
    currentPage.value = 1
  }

  const lastPage = () => {
    currentPage.value = totalPages.value
  }

  const setItemsPerPage = (perPage: number) => {
    itemsPerPage.value = perPage
    // Always reset to first page when changing items per page
    currentPage.value = 1
  }

  const reset = () => {
    currentPage.value = initialPage
    itemsPerPage.value = initialItemsPerPage
  }

  // Watch for data changes and reset to first page if current page is out of bounds
  watch(totalPages, newTotalPages => {
    if (currentPage.value > newTotalPages && newTotalPages > 0) {
      currentPage.value = newTotalPages
    } else if (newTotalPages === 0) {
      currentPage.value = 1
    }
  })

  return {
    // State
    currentPage: readonly(currentPage),
    itemsPerPage: readonly(itemsPerPage),

    // Computed
    totalItems: readonly(totalItems),
    totalPages: readonly(totalPages),
    startIndex: readonly(startIndex),
    endIndex: readonly(endIndex),
    hasNextPage: readonly(hasNextPage),
    hasPreviousPage: readonly(hasPreviousPage),
    visiblePages: readonly(visiblePages),
    paginatedData: readonly(paginatedData),

    // Methods
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setItemsPerPage,
    reset,
  }
}
