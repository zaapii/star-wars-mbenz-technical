<script setup lang="ts">
  import { computed, toRef, type Ref } from 'vue'
  import { useRoute } from 'vue-router'

  import DataFilters from '@/components/DataFilters.vue'
  import DataPagination from '@/components/DataPagination.vue'
  import { useDataFilter } from '@/composables/useDataFilter'
  import { useDataPagination as useDataPaginationComposable } from '@/composables/useDataPagination'
  import { useDataSort, type SortOption } from '@/composables/useDataSort'
  import { useI18n } from '@/composables/useI18n'

  import type { Person, Planet } from '../../services/api'

  interface Props {
    data: (Person | Planet)[]
    searchKey?: string
    sortOptions?: SortOption[]
    defaultSortKey?: string
    defaultSortDirection?: 'asc' | 'desc'
    itemsPerPage?: number
    dataUpdatedAt?: number
    isRefreshing?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    searchKey: 'name',
    sortOptions: () => [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'created', label: 'Created', type: 'date' },
    ],
    defaultSortKey: 'name',
    defaultSortDirection: 'asc',
    itemsPerPage: 10,
    dataUpdatedAt: 0,
    isRefreshing: false,
  })

  const emit = defineEmits<{
    (e: 'refresh'): void
  }>()

  const route = useRoute()
  const { t } = useI18n()

  const title = computed(() => {
    switch (route.name) {
      case 'people':
        return t('navigation.people')
      case 'planets':
        return t('navigation.planets')
      default:
        return t('common.dataExplorer')
    }
  })

  const description = computed(() => {
    switch (route.name) {
      case 'people':
        return t('common.starWarsUniverse') + ' - ' + t('navigation.people')
      case 'planets':
        return t('common.starWarsUniverse') + ' - ' + t('navigation.planets')
      default:
        return t('common.starWarsUniverse')
    }
  })

  const dataRef = toRef(props, 'data') as Ref<(Planet | Person)[]>

  const dataFilter = useDataFilter(dataRef, { searchKey: props.searchKey })
  const dataSort = useDataSort(dataFilter.filteredData, {
    defaultSortKey: props.defaultSortKey,
    defaultDirection: props.defaultSortDirection,
    sortOptions: props.sortOptions,
  })
  const dataPagination = useDataPaginationComposable(dataSort.sortedData, {
    initialItemsPerPage: props.itemsPerPage,
  })

  defineExpose({
    dataFilter,
    dataSort,
    dataPagination,
  })
</script>

<template>
  <div class="flex flex-col h-full" role="main" :aria-label="t('common.dataExplorer')">
    <header class="px-4 py-2">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground">
        {{ description }}
      </p>
    </header>

    <div
      class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div class="container mx-auto p-4">
        <DataFilters
          :search-term="dataFilter.searchTerm.value"
          :is-filtering="dataFilter.isFiltering.value"
          :sort-key="dataSort.sortKey.value"
          :sort-direction="dataSort.sortDirection.value"
          :sort-options="dataSort.sortOptions as SortOption[]"
          :set-search-term="dataFilter.setSearchTerm"
          :clear-search="dataFilter.clearSearch"
          :set-sort-key="dataSort.setSortKey"
          :set-sort-direction="dataSort.setSortDirection"
          :data-updated-at="dataUpdatedAt"
          :is-refreshing="isRefreshing"
          @refresh="emit('refresh')"
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto" role="region" aria-label="Data content">
      <div class="container mx-auto p-4">
        <slot name="content" :data="dataPagination.paginatedData.value" />
      </div>
    </div>

    <footer
      class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0"
    >
      <div class="container mx-auto p-4">
        <DataPagination
          :current-page="dataPagination.currentPage.value"
          :items-per-page="dataPagination.itemsPerPage.value"
          :total-items="dataPagination.totalItems.value"
          :total-pages="dataPagination.totalPages.value"
          :start-index="dataPagination.startIndex.value"
          :end-index="dataPagination.endIndex.value"
          :visible-pages="dataPagination.visiblePages.value as number[]"
          :has-next-page="dataPagination.hasNextPage.value"
          :has-previous-page="dataPagination.hasPreviousPage.value"
          :go-to-page="dataPagination.goToPage"
          :next-page="dataPagination.nextPage"
          :previous-page="dataPagination.previousPage"
          :first-page="dataPagination.firstPage"
          :last-page="dataPagination.lastPage"
          :set-items-per-page="dataPagination.setItemsPerPage"
        />
      </div>
    </footer>
  </div>
</template>
