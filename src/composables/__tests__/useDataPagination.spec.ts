import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { useDataPagination } from '../useDataPagination'

const fullDataSet = ref(
  Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
)

describe('useDataPagination', () => {
  it('should initialize with correct default values', () => {
    const { currentPage, itemsPerPage, totalItems, totalPages } = useDataPagination(fullDataSet)

    expect(currentPage.value).toBe(1)
    expect(itemsPerPage.value).toBe(10) // Default value is 10
    expect(totalItems.value).toBe(100)
    expect(totalPages.value).toBe(10)
  })

  it('should return the correct slice of data for the current page', () => {
    const { paginatedData, goToPage } = useDataPagination(fullDataSet, { initialItemsPerPage: 5 })

    // Default first page
    expect(paginatedData.value.length).toBe(5)
    expect(paginatedData.value[0].id).toBe(1)
    expect(paginatedData.value[4].id).toBe(5)

    // Go to page 3
    goToPage(3)
    expect(paginatedData.value[0].id).toBe(11)
    expect(paginatedData.value[4].id).toBe(15)
  })

  it('should update navigation states correctly', () => {
    const { hasNextPage, hasPreviousPage, goToPage, totalPages } = useDataPagination(fullDataSet, {
      initialItemsPerPage: 20,
    })

    // At the start
    expect(hasPreviousPage.value).toBe(false)
    expect(hasNextPage.value).toBe(true)

    // Go to a middle page
    goToPage(3)
    expect(hasPreviousPage.value).toBe(true)
    expect(hasNextPage.value).toBe(true)

    // Go to the last page
    goToPage(totalPages.value)
    expect(hasPreviousPage.value).toBe(true)
    expect(hasNextPage.value).toBe(false)
  })

  it('should reset pagination when reset is called', () => {
    const { reset } = useDataPagination(fullDataSet, { initialItemsPerPage: 20 })
    const { currentPage, itemsPerPage, totalItems, totalPages } = useDataPagination(fullDataSet)
    reset()
    expect(currentPage.value).toBe(1)
    expect(itemsPerPage.value).toBe(10)
    expect(totalItems.value).toBe(100)
    expect(totalPages.value).toBe(10)
  })

  it('should set items per page correctly', () => {
    const { setItemsPerPage, itemsPerPage } = useDataPagination(fullDataSet)
    setItemsPerPage(20)
    expect(itemsPerPage.value).toBe(20)
  })

  it('should go to the next page correctly', () => {
    const { nextPage, currentPage } = useDataPagination(fullDataSet)
    nextPage()
    expect(currentPage.value).toBe(2)
  })

  it('should go to the previous page correctly', () => {
    const { previousPage, currentPage } = useDataPagination(fullDataSet)
    previousPage()
    expect(currentPage.value).toBe(1)
  })

  it('should go to the first page correctly', () => {
    const { firstPage, currentPage } = useDataPagination(fullDataSet)
    firstPage()
    expect(currentPage.value).toBe(1)
  })

  it('should go to the last page correctly', () => {
    const { lastPage, currentPage } = useDataPagination(fullDataSet)
    lastPage()
    expect(currentPage.value).toBe(10)
  })

  it('should return the correct visible pages', () => {
    const { visiblePages } = useDataPagination(fullDataSet, { initialItemsPerPage: 20 })
    expect(visiblePages.value).toEqual([1, 2, 3, 4, 5])
  })

  it('should calculate the correct pages when dataSet changes', () => {
    const { visiblePages } = useDataPagination(fullDataSet)
    fullDataSet.value = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))
    expect(visiblePages.value).toEqual([1, 2])
  })
})
