import { expect, test } from '@playwright/test'

test('Smoke test for People page', async ({ page }) => {
  // 1. Navigate to the People page
  await page.goto('/')

  // 2. Verify it redirects to the people page correctly
  expect(page.url()).toContain('/people')

  // Wait for the data to load  and get the first card
  await expect(page.getByTestId('person-card-0')).toBeVisible({ timeout: 10000 })
  const initialFirstCardText = await page.getByTestId('person-card-0').first().innerText()

  // 2. Search for a character
  const searchInput = page.getByTestId('search-by-name-input')
  await searchInput.fill('luke')

  // Verify that the search results are updated
  await expect(page.getByTestId('person-card-0')).toContainText('Luke')

  // 3. Sort the data
  const sortTrigger = page.getByTestId('sort-by-button')
  await sortTrigger.click()

  // Verify that the order has changed
  const newFirstCardText = await page.getByTestId('person-card-0').first().innerText()
  expect(newFirstCardText).not.toBe(initialFirstCardText)

  // 4. Clean up the search
  await searchInput.fill('')

  // 5. Paginate
  const nextPageButton = page.getByTestId('next-page-button')
  const initialPageIndicator = await page.getByTestId('page-button-1').innerText()

  await nextPageButton.click()

  // Verify the page has changed
  const newPageIndicator = await page.getByTestId('page-button-2').innerText()
  expect(newPageIndicator).not.toBe(initialPageIndicator)
  await expect(page.getByTestId('person-card-0').first()).toBeVisible()
})
