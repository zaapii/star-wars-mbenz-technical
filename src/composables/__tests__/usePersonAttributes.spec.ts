import { describe, expect, it } from 'vitest'

import { usePersonAttributes } from '../usePersonAttributes'

const persons = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    eyeColor: 'blue',
    hairColor: 'blond',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    eyeColor: 'yellow',
    hairColor: 'none',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    eyeColor: 'brown',
    hairColor: 'brown',
  },
]

describe('usePersonAttributes', () => {
  it('should return the correct person attributes', () => {
    const { formatHeight, formatMass, getEyeColorBadgeClass, getHairColorBadgeClass } =
      usePersonAttributes()
    expect(formatHeight(persons[0].height)).toBe('172 cm')
    expect(formatMass(persons[0].mass)).toBe('77 kg')
    expect(getEyeColorBadgeClass(persons[0].eyeColor)).toBe(
      'bg-blue-800 text-white dark:bg-blue-900 dark:text-white'
    )
    expect(getHairColorBadgeClass(persons[0].hairColor)).toBe(
      'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    )
  })

  it('should return the correct person attributes', () => {
    const { formatHeight, formatMass, getEyeColorBadgeClass, getHairColorBadgeClass } =
      usePersonAttributes()
    expect(formatHeight(persons[1].height)).toBe('202 cm')
    expect(formatMass(persons[1].mass)).toBe('136 kg')
    expect(getEyeColorBadgeClass(persons[1].eyeColor)).toBe(
      'bg-yellow-800 text-white dark:bg-yellow-900 dark:text-white'
    )
    expect(getHairColorBadgeClass(persons[1].hairColor)).toBe(
      'bg-slate-800 text-white dark:bg-slate-900 dark:text-white'
    )
  })

  it('should return the correct person attributes', () => {
    const { formatHeight, formatMass, getEyeColorBadgeClass, getHairColorBadgeClass } =
      usePersonAttributes()
    expect(formatHeight(persons[2].height)).toBe('150 cm')
    expect(formatMass(persons[2].mass)).toBe('49 kg')
    expect(getEyeColorBadgeClass(persons[2].eyeColor)).toBe(
      'bg-yellow-950 text-white dark:bg-yellow-900 dark:text-white'
    )
    expect(getHairColorBadgeClass(persons[2].hairColor)).toBe(
      'bg-amber-800 text-white dark:bg-amber-900 dark:text-white'
    )
  })
})
