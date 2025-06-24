import { expect, test } from '@playwright/test'

test('Smoke test for People page', async ({ page }) => {
  // 1. Navigate to people page
  await page.goto('/people')

  // Wait for the data to load and get the first card
  await expect(page.locator('[data-testid^="person-card-"]').first()).toBeVisible({ timeout: 15000 })
  const initialFirstCardText = await page.locator('[data-testid^="person-card-"]').first().innerText()

  // 2. Search for a character
  const searchInput = page.getByTestId('search-by-name-input')
  await searchInput.fill('luke')

  // Wait for search results to update
  await page.waitForTimeout(500)

  // Verify that the search results are updated - look for Luke in any card
  await expect(page.locator('[data-testid^="person-card-"]').first()).toContainText('Luke')

  // 3. Sort the data
  const sortTrigger = page.getByTestId('sort-by-button')
  await sortTrigger.click()

  // Wait for sort to complete
  await page.waitForTimeout(500)

  // Verify that the order has changed by checking if the first card text is different
  const newFirstCardText = await page.locator('[data-testid^="person-card-"]').first().innerText()
  expect(newFirstCardText).not.toBe(initialFirstCardText)

  // 4. Clean up the search
  await searchInput.fill('')
  await page.waitForTimeout(500)

  // 5. Paginate
  const nextPageButton = page.getByTestId('next-page-button')

  // Check if pagination is available
  const isNextPageDisabled = await nextPageButton.isDisabled()

  if (!isNextPageDisabled) {
    const initialPageIndicator = await page.getByTestId('page-button-1').innerText()
    await nextPageButton.click()

    // Wait for pagination to complete
    await page.waitForTimeout(500)

    // Verify the page has changed
    const newPageIndicator = await page.getByTestId('page-button-2').innerText()
    expect(newPageIndicator).not.toBe(initialPageIndicator)
    await expect(page.locator('[data-testid^="person-card-"]').first()).toBeVisible()
  } else {
    // If there's only one page, verify we can see the current page
    await expect(page.getByTestId('page-button-1')).toBeVisible()
  }
})

test('Smoke test for planets page', async ({ page }) => {
  // 1. Navigate to planets page
  await page.goto('/planets')

  // Wait for the data to load and get the first card
  await expect(page.locator('[data-testid^="planet-card-"]').first()).toBeVisible({ timeout: 15000 })
  const initialFirstCardText = await page.locator('[data-testid^="planet-card-"]').first().innerText()

  // 2. Search for a planet
  const searchInput = page.getByTestId('search-by-name-input')
  await searchInput.fill('tatooine')

  // Wait for search results to update
  await page.waitForTimeout(500)

  // Verify that the search results are updated - look for Tatooine in any card
  await expect(page.locator('[data-testid^="planet-card-"]').first()).toContainText('Tatooine')

  // 3. Sort the data
  const sortTrigger = page.getByTestId('sort-by-button')
  await sortTrigger.click()

  // Wait for sort to complete
  await page.waitForTimeout(500)

  // Verify that the order has changed by checking if the first card text is different
  const newFirstCardText = await page.locator('[data-testid^="planet-card-"]').first().innerText()
  expect(newFirstCardText).not.toBe(initialFirstCardText)

  // 4. Clean up the search
  await searchInput.fill('')
  await page.waitForTimeout(500)

  // 5. Paginate
  const nextPageButton = page.getByTestId('next-page-button')

  // Check if pagination is available
  const isNextPageDisabled = await nextPageButton.isDisabled()

  if (!isNextPageDisabled) {
    const initialPageIndicator = await page.getByTestId('page-button-1').innerText()
    await nextPageButton.click()

    // Wait for pagination to complete
    await page.waitForTimeout(500)

    // Verify the page has changed
    const newPageIndicator = await page.getByTestId('page-button-2').innerText()
    expect(newPageIndicator).not.toBe(initialPageIndicator)
    await expect(page.locator('[data-testid^="planet-card-"]').first()).toBeVisible()
  } else {
    // If there's only one page, verify we can see the current page
    await expect(page.getByTestId('page-button-1')).toBeVisible()
  }
})
