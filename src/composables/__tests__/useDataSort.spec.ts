import dayjs from 'dayjs'
import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useDataSort } from '../useDataSort'


const unsortedData = ref([
  { name: 'Yoda', created: '1980-05-21' },
  { name: 'Luke Skywalker', created: '1977-05-25' },
  { name: 'Anakin Skywalker', created: '1999-05-19' },
])

describe('useDataSort', () => {
  it('should sort by name in ascending order by default', () => {
    const { sortedData } = useDataSort(unsortedData, {
      sortOptions: [
        { key: 'name', label: 'Name', type: 'string' },
        { key: 'created', label: 'Created', type: 'date' },
      ],
    })
    expect(sortedData.value[0].name).toBe('Anakin Skywalker')
    expect(sortedData.value[2].name).toBe('Yoda')
  })

  it('should sort by a date key', () => {
    const { sortedData, setSortKey } = useDataSort(unsortedData, {
      sortOptions: [{ key: 'created', label: 'Created', type: 'date' }],
    })
    setSortKey('created')
    expect(dayjs(sortedData.value[0].created).format('YYYY-MM-DD')).toBe('1977-05-25')
    expect(dayjs(sortedData.value[2].created).format('YYYY-MM-DD')).toBe('1999-05-19')
  })

  it('should toggle sort direction when setting the same key', () => {
    const { sortedData, setSortKey } = useDataSort(unsortedData, {
      sortOptions: [{ key: 'name', label: 'Name', type: 'string' }],
      defaultSortKey: 'name',
      defaultDirection: 'asc',
    })

    expect(sortedData.value[0].name).toBe('Anakin Skywalker')

    setSortKey('name')
    expect(sortedData.value[0].name).toBe('Yoda')
  })

  it('should reset sort when resetSort is called', () => {
    const { sortedData, resetSort } = useDataSort(unsortedData, {
      sortOptions: [{ key: 'name', label: 'Name', type: 'string' }],
      defaultSortKey: 'name',
      defaultDirection: 'asc',
    })
    resetSort()
    expect(sortedData.value[0].name).toBe('Anakin Skywalker')
  })
})
