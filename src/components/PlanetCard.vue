<script setup lang="ts">
  import { Droplets, Globe, Mountain, Thermometer, Users, Zap } from 'lucide-vue-next'

  import { useFormatNumber } from '@/composables/useFormatNumber'
  import { useI18n } from '@/composables/useI18n'
  import { usePlanetAttributes } from '@/composables/usePlanetAttributes'
  import type { Planet } from '@/services/api'

  import { Badge } from './ui/badge'
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

  interface PlanetCardProps {
    planet: Planet
  }

  defineProps<PlanetCardProps>()

  const { formatNumber } = useFormatNumber()
  const { getClimateColor, getTerrainColor } = usePlanetAttributes()
  const { t } = useI18n()
</script>

<template>
  <Card
    data-testid="planet-card"
    class="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-2 border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col h-full"
    role="article"
    :aria-label="`${t('common.planetCard')} ${planet.name}`"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    ></div>

    <CardHeader class="relative z-10 pb-4">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <CardTitle
            class="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300"
          >
            {{ planet.name }}
          </CardTitle>
          <CardDescription class="mt-2 text-sm text-muted-foreground">
            <Globe class="inline w-4 h-4 mr-1 text-primary/60" aria-hidden="true" />
            {{ planet.rotation_period }}{{ t('planet.hours') }} {{ t('planet.rotation') }} •
            {{ planet.orbital_period }} {{ t('planet.orbit') }}
          </CardDescription>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <Badge
            :class="getClimateColor(planet.climate)"
            class="text-xs font-medium border border-primary/20 hover:bg-transparent hover:scale-105 transition-all duration-300"
          >
            <Thermometer class="w-3 h-3 mr-1" aria-hidden="true" />
            <span class="sr-only">{{ t('planet.climate') }}: </span>
            {{ planet.climate }}
          </Badge>
          <Badge
            :class="getTerrainColor(planet.terrain)"
            class="text-xs font-medium border border-primary/20 hover:bg-transparent hover:scale-105 transition-all duration-300"
          >
            <Mountain class="w-3 h-3 mr-1" aria-hidden="true" />
            <span class="sr-only">{{ t('planet.terrain') }}: </span>
            {{ planet.terrain.split(',')[0] }}
          </Badge>
        </div>
      </div>
    </CardHeader>

    <CardContent class="relative z-10 space-y-4 flex-1">
      <div class="grid grid-cols-2 gap-4" role="list" :aria-label="t('common.planetAttributes')">
        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Users class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('planet.population') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ formatNumber(planet.population) }}
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Zap class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('planet.gravity') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ planet.gravity }}
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Globe class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('planet.diameter') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ formatNumber(planet.diameter) }} km
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Droplets class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('planet.water') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{
              planet.surface_water === 'unknown' ? t('common.unknown') : `${planet.surface_water}%`
            }}
          </p>
        </div>
      </div>
    </CardContent>

    <CardFooter class="relative z-10 pt-4 border-t border-primary/20 mt-auto">
      <div class="flex items-center justify-between w-full text-xs text-primary/70">
        <span class="flex items-center">
          <Users class="w-3 h-3 mr-1" aria-hidden="true" />
          <span class="sr-only">{{ t('person.has') }} </span>
          {{ planet.residents.length }} {{ t('person.residents') }}
        </span>
        <span class="flex items-center">
          <Globe class="w-3 h-3 mr-1" aria-hidden="true" />
          <span class="sr-only">{{ t('person.appearsIn') }} </span>
          {{ planet.films.length }} {{ t('person.films') }}
        </span>
      </div>
    </CardFooter>
  </Card>
</template>
