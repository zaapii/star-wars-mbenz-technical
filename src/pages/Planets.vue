<script setup lang="ts">
  import type { KyInstance } from 'ky'
  import { Globe } from 'lucide-vue-next'
  import { computed } from 'vue'

  import AppDataLayout from '@/components/layout/AppDataLayout.vue'
  import PlanetCard from '@/components/PlanetCard.vue'
  import EmptyState from '@/components/states/EmptyState.vue'
  import ErrorState from '@/components/states/ErrorState.vue'
  import { useI18n } from '@/composables/useI18n'
  import { queryKeys, useSwApiQuery, type Planet } from '@/services/api'

  import CardSkeleton from '../components/CardSkeleton.vue'

  const { t } = useI18n()

  const { data, isLoading, isError, error, isRefetching, refetch, dataUpdatedAt } = useSwApiQuery<
    Planet[]
  >({
    queryKey: [queryKeys.planets],
    queryFn: (ky: KyInstance) => ky.get(queryKeys.planets).json(),
    cacheTime: 1000 * 60 * 5,
    retry: 0,
  })

  const planets = computed(() => data.value || [])

  const sortOptions = [
    { key: 'name', label: t('sortOptions.name'), type: 'string' as const },
    { key: 'created', label: t('sortOptions.created'), type: 'date' as const },
  ]
</script>

<template>
  <AppDataLayout
    :data="planets"
    search-key="name"
    :sort-options="sortOptions"
    default-sort-key="name"
    default-sort-direction="asc"
    :items-per-page="10"
    :data-updated-at="dataUpdatedAt"
    :is-refreshing="isRefetching"
    @refresh="refetch"
  >
    <template #content="{ data: filteredData }">
      <CardSkeleton :is-loading="isLoading" :items-per-page="10" v-if="isLoading" />

      <ErrorState
        v-else-if="isError"
        :title="t('states.error.failedToLoadPlanets')"
        :message="t('states.error.unexpectedErrorPlanets')"
        :error="error"
        :on-retry="refetch"
      />

      <div
        v-else-if="filteredData.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        role="list"
        :aria-label="t('common.starWarsPlanets')"
      >
        <PlanetCard
          v-for="planet in filteredData as Planet[]"
          :key="planet.name"
          :planet="planet"
          class="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          role="listitem"
        />
      </div>

      <EmptyState
        v-else
        :title="t('states.empty.noPlanetsFound')"
        :message="t('states.empty.noResultsMessage')"
        :icon="Globe"
      />
    </template>
  </AppDataLayout>
</template>
