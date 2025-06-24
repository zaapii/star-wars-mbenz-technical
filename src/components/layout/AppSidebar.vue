<script setup lang="ts">
  import { Eclipse, Skull, Sword, Users } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import TeamSwitcher from '@/components/TeamSwitcher.vue'
  import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
  import type { SidebarProps } from '@/components/ui/sidebar/index'
  import { useI18n } from '@/composables/useI18n'

  import NavMain from './NavMain.vue'

  const props = defineProps<SidebarProps>()
  const route = useRoute()
  const { t } = useI18n()

  const data = computed(() => ({
    teams: [
      {
        name: t('navigation.jediOrder'),
        faction: 'jedi' as const,
        logo: Sword,
      },
      {
        name: t('navigation.sithEmpire'),
        faction: 'sith' as const,
        logo: Skull,
      },
    ],
    navMain: [
      {
        title: t('navigation.people'),
        url: '/people',
        icon: Users,
        isActive: route.name === 'people',
      },
      {
        title: t('navigation.planets'),
        url: '/planets',
        icon: Eclipse,
        isActive: route.name === 'planets',
      },
    ],
  }))
</script>

<template>
  <Sidebar v-bind="props" role="navigation" :aria-label="t('common.mainNavigation')">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
  </Sidebar>
</template>
