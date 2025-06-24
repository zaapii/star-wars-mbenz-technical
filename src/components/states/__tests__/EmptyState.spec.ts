import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import EmptyState from '../EmptyState.vue'

describe('EmptyState', () => {
  it('renders the default title and message when no props are provided', () => {
    render(EmptyState, {
      props: {
        title: 'Failed to load data',
        message: 'An unexpected error occurred while fetching data.',
      },
    })
    expect(screen.getByText('Failed to load data')).toBeTruthy()
    expect(screen.getByText('An unexpected error occurred while fetching data.')).toBeTruthy()
  })
})
