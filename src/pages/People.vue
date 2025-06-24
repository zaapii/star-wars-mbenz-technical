<script setup lang="ts">
  import type { KyInstance } from 'ky'
  import { Users } from 'lucide-vue-next'
  import { computed } from 'vue'

  import CardSkeleton from '@/components/CardSkeleton.vue'
  import AppDataLayout from '@/components/layout/AppDataLayout.vue'
  import PersonCard from '@/components/PersonCard.vue'
  import EmptyState from '@/components/states/EmptyState.vue'
  import ErrorState from '@/components/states/ErrorState.vue'
  import { queryKeys, useSwApiQuery, type Person } from '@/services/api'

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
    { key: 'name', label: 'Name', type: 'string' as const },
    { key: 'created', label: 'Created', type: 'date' as const },
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
        title="Failed to load people"
        message="An unexpected error occurred while fetching people data."
        :error="error"
        :on-retry="refetch"
      />

      <div
        v-else-if="filteredData.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Star Wars characters"
      >
        <PersonCard
          v-for="(person, index) in filteredData as Person[]"
          :data-testid="`person-card-${index}`"
          :key="person.name"
          :person="person"
          role="listitem"
        />
      </div>

      <EmptyState
        v-else
        title="No people found"
        message="No people match your current filters. Try adjusting your search criteria."
        :icon="Users"
      />
    </template>
  </AppDataLayout>
</template>
