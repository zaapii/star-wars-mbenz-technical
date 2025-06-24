<script setup lang="ts">
  import { Sword, Skull, Users, Eclipse } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import TeamSwitcher from '@/components/TeamSwitcher.vue'
  import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
  import type { SidebarProps } from '@/components/ui/sidebar/index'


  import NavMain from './NavMain.vue'



  const props = defineProps<SidebarProps>()
  const route = useRoute()

  const data = computed(() => ({
    teams: [
      {
        name: 'Jedi Order',
        faction: 'jedi' as const,
        logo: Sword,
      },
      {
        name: 'Sith Empire',
        faction: 'sith' as const,
        logo: Skull,
      },
    ],
    navMain: [
      {
        title: 'People',
        url: '/people',
        icon: Users,
        isActive: route.name === 'people',
      },
      {
        title: 'Planets',
        url: '/planets',
        icon: Eclipse,
        isActive: route.name === 'planets',
      },
    ],
  }))
</script>

<template>
  <Sidebar v-bind="props" role="navigation" aria-label="Main navigation">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
  </Sidebar>
</template>
