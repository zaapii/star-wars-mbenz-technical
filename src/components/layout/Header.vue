<script setup lang="ts">
  import ThemeToggle from '@/components/ThemeToggle.vue'
  import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb'
  import { Separator } from '@/components/ui/separator'
  import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    role="banner"
    aria-label="Application header"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" aria-label="Toggle sidebar navigation" aria-expanded="true" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <nav aria-label="Breadcrumb navigation">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#" aria-label="Go to Star Wars Universe home">
                Star Wars Universe
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Explorer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </div>
    <div class="ml-auto flex items-center gap-2 px-4">
      <ThemeToggle />
    </div>
  </header>
</template>
