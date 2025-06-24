import type { KyRequest, KyResponse } from 'ky'
import { toast } from 'vue-sonner'

import { extractAndCapitalizePath } from '@/lib/utils'

import { createApiClient, type KyConfig } from '../composables/useKyQueryFn'

/**
 * Star Wars API client configuration
 * Base URL: https://swapi.info/api/
 */

export const swApiClient = createApiClient({
  baseURL: import.meta.env.VITE_SWAPI_BASE_URL,
  timeout: 10000,
  retry: 3,
  hooks: {
    afterResponse: [
      (request: KyRequest, _options: KyConfig, response: KyResponse) => {
        if (response.status >= 400) {
          toast.error(`Error: ${response.status} ${response.statusText}`, {
            description: `${extractAndCapitalizePath(request.url)} failed to load`,
            duration: 3000,
          })
          return
        }

        toast.success(`${extractAndCapitalizePath(request.url)} loaded successfully`, {
          duration: 3000,
        })
      },
    ],
  },
})

export const useSwApiQuery = swApiClient.useQuery

export interface Person {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  films: readonly string[]
  vehicles: readonly string[]
  url: string
}

export interface Planet {
  id: number
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: readonly string[]
  films: readonly string[]
  created: string
  edited: string
  url: string
}

export type QueryKey = 'planets' | 'people'

export const queryKeys = {
  planets: 'planets',
  people: 'people',
} as const satisfies Record<QueryKey, string>
