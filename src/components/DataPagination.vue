<script setup lang="ts">
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
  import { nextTick, ref, watch } from 'vue'

  import { Button } from '@/components/ui/button'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'

  import { useAccessibility } from '@/composables/useAccessibility'

  const { handleKeyNavigation, announce } = useAccessibility()

  interface Props {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
    startIndex: number
    endIndex: number
    visiblePages: number[]
    hasNextPage: boolean
    hasPreviousPage: boolean
    goToPage: (page: number) => void
    nextPage: () => void
    previousPage: () => void
    firstPage: () => void
    lastPage: () => void
    setItemsPerPage: (perPage: number) => void
  }

  const props = defineProps<Props>()

  const paginationRef = ref<HTMLElement>()
  const currentFocusedPage = ref<number>(props.currentPage)
  const isKeyboardPagination = ref(false)

  const focusFirstVisiblePage = () => {
    if (props.visiblePages.length > 0) {
      const firstPage = props.visiblePages[0]
      const firstPageButton = document.querySelector(
        `[data-testid="page-button-${firstPage}"]`
      ) as HTMLElement

      if (firstPageButton) {
        firstPageButton.focus({ preventScroll: true })
        currentFocusedPage.value = firstPage
      }
    }
  }

  const focusCurrentPage = () => {
    const currentPageButton = document.querySelector(
      `[data-testid="page-button-${props.currentPage}"]`
    ) as HTMLElement

    if (currentPageButton) {
      currentPageButton.focus({ preventScroll: true })
      currentFocusedPage.value = props.currentPage
    }
  }

  watch(
    () => props.currentPage,
    _ => {
      if (isKeyboardPagination.value) {
        nextTick(() => {
          focusCurrentPage()
        })
      }
    }
  )

  watch(
    () => props.visiblePages,
    () => {
      if (isKeyboardPagination.value) {
        nextTick(() => {
          if (props.visiblePages.includes(props.currentPage)) {
            focusCurrentPage()
          } else {
            focusFirstVisiblePage()
          }
        })
      }
    }
  )

  const handlePaginationKeyNavigation = (event: KeyboardEvent) => {
    isKeyboardPagination.value = true
    handleKeyNavigation(event, {
      onArrowLeft: () => {
        if (props.hasPreviousPage) {
          props.previousPage()
          announce(`Navigated to page ${props.currentPage - 1}`)
        } else {
          announce('Already on first page')
        }
      },
      onArrowRight: () => {
        if (props.hasNextPage) {
          props.nextPage()
          announce(`Navigated to page ${props.currentPage + 1}`)
        } else {
          announce('Already on last page')
        }
      },
      onArrowUp: () => {
        if (props.currentPage > 1) {
          props.firstPage()
          announce('Navigated to first page')
        } else {
          announce('Already on first page')
        }
      },
      onArrowDown: () => {
        if (props.currentPage < props.totalPages) {
          props.lastPage()
          announce(`Navigated to last page ${props.totalPages}`)
        } else {
          announce('Already on last page')
        }
      },
      onEnter: () => {
        focusCurrentPage()
      },
    })
  }

  const handleNumberKeyNavigation = (event: KeyboardEvent) => {
    const key = event.key
    if (/^[1-9]$/.test(key)) {
      const pageNumber = parseInt(key, 10)
      if (pageNumber <= props.totalPages) {
        event.preventDefault()
        isKeyboardPagination.value = true
        props.goToPage(pageNumber)
        announce(`Navigated to page ${pageNumber}`)
      }
    }
  }

  const handleKeyboardNavigation = (event: KeyboardEvent) => {
    handlePaginationKeyNavigation(event)
    handleNumberKeyNavigation(event)
  }
</script>

<template>
  <nav
    ref="paginationRef"
    class="flex items-center justify-between space-x-2 py-4"
    role="navigation"
    aria-label="Pagination navigation"
    tabindex="0"
    @keydown="handleKeyboardNavigation"
  >
    <div class="flex-1 text-sm text-muted-foreground">
      <span v-if="totalItems > 0" aria-live="polite">
        Showing {{ startIndex + 1 }} to {{ endIndex + 1 }} of {{ totalItems }} results
      </span>
      <span v-else aria-live="polite"> No results found </span>
    </div>

    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <label for="items-per-page" class="text-sm font-medium">Rows per page</label>
        <Select
          :model-value="`${itemsPerPage}`"
          @update:model-value="value => setItemsPerPage(Number(value))"
        >
          <SelectTrigger
            id="items-per-page"
            class="h-8 w-[70px]"
            aria-label="Select number of items per page"
          >
            <SelectValue placeholder="Select rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="size in [5, 10, 20, 50]" :key="size" :value="`${size}`">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
        aria-live="polite"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </div>

      <div class="flex items-center space-x-2" role="group" aria-label="Page navigation">
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasPreviousPage"
          @click="firstPage"
          data-testid="first-page-button"
          aria-label="Go to first page"
        >
          <ChevronsLeft class="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasPreviousPage"
          @click="previousPage"
          data-testid="previous-page-button"
          aria-label="Go to previous page"
        >
          <ChevronLeft class="h-4 w-4" aria-hidden="true" />
        </Button>

        <div class="flex items-center space-x-1" role="group" aria-label="Page numbers">
          <Button
            v-for="page in visiblePages"
            :key="page"
            variant="outline"
            size="icon"
            :data-testid="`page-button-${page}`"
            class="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 dark:hover:bg-primary/20 dark:hover:text-white"
            :class="{
              'bg-primary text-primary-foreground font-bold hover:bg-primary/10 hover:text-primary-foreground/90 dark:bg-primary/20 dark:text-white':
                page === currentPage,
            }"
            @click="goToPage(page)"
            :aria-label="`Go to page ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
          >
            {{ page }}
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasNextPage"
          @click="nextPage"
          data-testid="next-page-button"
          aria-label="Go to next page"
        >
          <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!hasNextPage"
          @click="lastPage"
          data-testid="last-page-button"
          aria-label="Go to last page"
        >
          <ChevronsRight class="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  </nav>
</template>
