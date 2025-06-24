import { describe, it, expect } from 'vitest'

import { usePlanetAttributes } from '../usePlanetAttributes'

const planets = [
  {
    name: 'Tatooine',
    diameter: '10465',
    rotationPeriod: '23',
    orbitalPeriod: '304',
    gravity: '1',
    population: '200000',
    climate: 'arid',
    terrain: 'desert',
    surfaceWater: '1',
    residents: ['Luke Skywalker', 'Leia Organa', 'Han Solo'],
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
  },
  {
    name: 'Alderaan',
    diameter: '12500',
    rotationPeriod: '24',
    orbitalPeriod: '364',
    gravity: '1',
    population: '2000000000',
    climate: 'temperate',
    terrain: 'grasslands, mountains',
    surfaceWater: '40',
    residents: ['Leia Organa', 'Bail Organa'],
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
  },
]

describe('usePlanetAttributes', () => {
  it('should return the correct planet attributes', () => {
    const { getClimateColor, getTerrainColor } = usePlanetAttributes()
    expect(getClimateColor(planets[0].climate)).toBe(
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    )
    expect(getTerrainColor(planets[0].terrain)).toBe(
      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    )
  })

  it('should return the correct planet attributes', () => {
    const { getClimateColor, getTerrainColor } = usePlanetAttributes()
    expect(getClimateColor(planets[1].climate)).toBe(
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    )
    expect(getTerrainColor(planets[1].terrain)).toBe(
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    )
  })
})
