import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import type { Person } from '@/services/api'
import { useDataFilter } from '../useDataFilter'

const unFilteredData = ref<Person[]>([
  {
    name: 'Yoda',
    height: '66',
    mass: '17',
    hair_color: 'white',
    skin_color: 'green',
    eye_color: 'brown',
    birth_year: '896BBY',
    gender: 'male',
    films: [],
    vehicles: [],
    url: 'https://swapi.info/api/people/1'
  },
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    films: [],
    vehicles: [],
    url: 'https://swapi.info/api/people/2'
  },
  {
    name: 'Anakin Skywalker',
    height: '188',
    mass: '84',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '41.9BBY',
    gender: 'male',
    films: [],
    vehicles: [],
    url: 'https://swapi.info/api/people/3'
  },
])

describe('useDataFilter', () => {
  it('should filter data correctly', () => {
    const { filteredData, setSearchTerm } = useDataFilter(unFilteredData, {
      searchKey: 'name',
    })
    setSearchTerm('Yoda')
    expect(filteredData.value[0].name).toBe('Yoda')
    expect(filteredData.value.length).toBe(1)
  })

  it('should clear search term', () => {
    const { filteredData, setSearchTerm, clearSearch } = useDataFilter(unFilteredData, {
      searchKey: 'name',
    })
    setSearchTerm('Yoda')
    expect(filteredData.value.length).toBe(1)
    clearSearch()
    expect(filteredData.value.length).toBe(3)
  })

  it('should set search term', () => {
    const { filteredData, setSearchTerm } = useDataFilter(unFilteredData, {
      searchKey: 'name',
    })
    setSearchTerm('Skywalker')
    expect(filteredData.value[0].name).toBe('Luke Skywalker')
    expect(filteredData.value[1].name).toBe('Anakin Skywalker')
    expect(filteredData.value.length).toBe(2)
  })
})
