<script setup lang="ts">
  import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
  import ThemeToggle from '@/components/ThemeToggle.vue'
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb'
  import { Separator } from '@/components/ui/separator'
  import { SidebarTrigger } from '@/components/ui/sidebar'
  import { useI18n } from '@/composables/useI18n'

  const { t } = useI18n()
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    role="banner"
    :aria-label="t('common.applicationHeader')"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" :aria-label="t('common.toggleSidebar')" aria-expanded="true" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <nav :aria-label="t('common.breadcrumbNavigation')">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#" :aria-label="t('common.goToHome')">
                {{ t('common.starWarsUniverse') }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ t('common.dataExplorer') }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </div>
    <div class="ml-auto flex items-center gap-8 px-4">
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  </header>
</template>
