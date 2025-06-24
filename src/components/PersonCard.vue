<script setup lang="ts">
  import { Calendar, Eye, Heart, Palette, Ruler, User, Weight, Zap } from 'lucide-vue-next'

  import { useI18n } from '@/composables/useI18n'
  import { usePersonAttributes } from '@/composables/usePersonAttributes'
  import type { Person } from '@/services/api'

  import { Badge } from './ui/badge'
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

  interface PersonCardProps {
    person: Person
  }

  const { person } = defineProps<PersonCardProps>()

  const { formatHeight, formatMass, getEyeColorBadgeClass, getHairColorBadgeClass } =
    usePersonAttributes()
  const { t } = useI18n()
</script>

<template>
  <Card
    class="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-2 border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col h-full"
    role="article"
    :aria-label="`${t('common.characterCard')} ${person.name}`"
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
            {{ person.name }}
          </CardTitle>
          <CardDescription class="mt-2 text-sm text-muted-foreground">
            <Calendar class="inline w-4 h-4 mr-1 text-primary/60" aria-hidden="true" />
            {{ t('person.born') }} {{ person.birth_year }} • {{ person.gender }}
          </CardDescription>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <Badge :class="getEyeColorBadgeClass(person.eye_color)" class="text-xs font-bold">
            <Eye class="w-3 h-3 mr-1" aria-hidden="true" />
            <span class="sr-only">{{ t('person.eyeColor') }}: </span>
            {{ person.eye_color }}
          </Badge>
          <Badge :class="getHairColorBadgeClass(person.hair_color)" class="text-xs font-bold">
            <Palette class="w-3 h-3 mr-1" aria-hidden="true" />
            <span class="sr-only">{{ t('person.hairColor') }}: </span>
            {{ person.hair_color }}
          </Badge>
        </div>
      </div>
    </CardHeader>

    <CardContent class="relative z-10 space-y-4 flex-1">
      <div class="grid grid-cols-2 gap-4" role="list" :aria-label="t('common.characterAttributes')">
        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Ruler class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('person.height') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ formatHeight(person.height) }}
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Weight class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('person.mass') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ formatMass(person.mass) }}
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Heart class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('person.gender') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground capitalize">
            {{ person.gender }}
          </p>
        </div>

        <div
          class="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-300"
          role="listitem"
        >
          <div class="flex items-center space-x-2 text-sm">
            <Zap class="w-4 h-4 text-primary" aria-hidden="true" />
            <span class="font-medium text-primary/80">{{ t('person.skin') }}</span>
          </div>
          <p class="text-lg font-semibold text-foreground capitalize">
            {{ person.skin_color }}
          </p>
        </div>
      </div>
    </CardContent>

    <CardFooter class="relative z-10 pt-4 border-t border-primary/20 mt-auto">
      <div class="flex items-center justify-between w-full text-xs text-primary/70">
        <span class="flex items-center font-bold">
          <User class="w-3 h-3 mr-1" aria-hidden="true" />
          <span class="sr-only">{{ t('person.appearsIn') }} </span>
          {{ person.films.length }} {{ t('person.films') }}
        </span>
        <span class="flex items-center font-bold">
          <Zap class="w-3 h-3 mr-1" aria-hidden="true" />
          <span class="sr-only">{{ t('person.has') }} </span>
          {{ person.vehicles.length }} {{ t('person.vehicles') }}
        </span>
      </div>
    </CardFooter>
  </Card>
</template>
