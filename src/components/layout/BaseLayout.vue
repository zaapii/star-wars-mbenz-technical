<script setup lang="ts">
  import AppSidebar from '@/components/layout/AppSidebar.vue'
  import Header from '@/components/layout/Header.vue'
  import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header />
      <main
        class="flex flex-1 flex-col gap-6 p-6 pt-4 overflow-auto"
        role="main"
        aria-label="Main content area"
      >
        <div class="container mx-auto h-full">
          <slot />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
