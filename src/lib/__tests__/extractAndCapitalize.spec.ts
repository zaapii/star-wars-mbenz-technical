import { describe, it, expect } from 'vitest'

import { extractAndCapitalizePath } from '@/lib/utils'

describe('extractAndCapitalizePath', () => {
  it('should extract and capitalize the path', () => {
    expect(extractAndCapitalizePath('https://swapi.dev/api/planets')).toBe('Planets')
    expect(extractAndCapitalizePath('https://swapi.dev/api/films')).toBe('Films')
    expect(extractAndCapitalizePath('https://swapi.dev/api/people')).toBe('People')
    expect(extractAndCapitalizePath('https://swapi.dev/api/species')).toBe('Species')
    expect(extractAndCapitalizePath('https://swapi.dev/api/vehicles')).toBe('Vehicles')
    expect(extractAndCapitalizePath('https://swapi.dev/api/starships')).toBe('Starships')
  })
})
