<script setup lang="ts">
  import type { KyInstance } from 'ky'
  import { Users } from 'lucide-vue-next'
  import { computed } from 'vue'

  import CardSkeleton from '@/components/CardSkeleton.vue'
  import AppDataLayout from '@/components/layout/AppDataLayout.vue'
  import PersonCard from '@/components/PersonCard.vue'
  import EmptyState from '@/components/states/EmptyState.vue'
  import ErrorState from '@/components/states/ErrorState.vue'
  import { useI18n } from '@/composables/useI18n'
  import { queryKeys, useSwApiQuery, type Person } from '@/services/api'

  const { t } = useI18n()

  const { data, isLoading, isError, error, refetch, isRefetching, dataUpdatedAt } = useSwApiQuery<
    Person[]
  >({
    queryKey: [queryKeys.people],
    queryFn: (ky: KyInstance) => ky.get(queryKeys.people).json(),
    cacheTime: 1000 * 60 * 5,
    retry: 0,
  })

  const people = computed(() => data.value || [])

  const sortOptions = [
    { key: 'name', label: t('sortOptions.name'), type: 'string' as const },
    { key: 'created', label: t('sortOptions.created'), type: 'date' as const },
  ]
</script>

<template>
  <AppDataLayout
    :data="people"
    search-key="name"
    :sort-options="sortOptions"
    default-sort-key="name"
    default-sort-direction="asc"
    :data-updated-at="dataUpdatedAt"
    :items-per-page="10"
    :is-refreshing="isRefetching"
    @refresh="refetch"
  >
    <template #content="{ data: filteredData }">
      <CardSkeleton :is-loading="isLoading" :items-per-page="10" v-if="isLoading" />

      <ErrorState
        v-else-if="isError"
        :title="t('states.error.failedToLoadPeople')"
        :message="t('states.error.unexpectedErrorPeople')"
        :error="error"
        :on-retry="refetch"
      />

      <div
        v-else-if="filteredData.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        role="list"
        aria-label="Star Wars characters"
      >
        <PersonCard
          v-for="person in filteredData as Person[]"
          :key="person.name"
          :person="person"
          class="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          role="listitem"
        />
      </div>

      <EmptyState
        v-else
        :title="t('states.empty.noPeopleFound')"
        :message="t('states.empty.noResultsMessage')"
        :icon="Users"
      />
    </template>
  </AppDataLayout>
</template>
