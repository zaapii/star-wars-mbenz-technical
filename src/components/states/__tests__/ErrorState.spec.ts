import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

import ErrorState from '../ErrorState.vue'

describe('ErrorState', () => {
  it('renders the default title and message when no props are provided', () => {
    render(ErrorState)
    expect(screen.getByText('An error occurred')).toBeTruthy()
    expect(screen.getByText('Something went wrong.')).toBeTruthy()
  })

  it('renders a custom title and message from props', () => {
    const props = {
      title: 'Houston, we have a problem',
      message: 'The hyperdrive has failed.',
    }
    render(ErrorState, { props })
    expect(screen.getByText(props.title)).toBeTruthy()
    expect(screen.getByText(props.message)).toBeTruthy()
  })

  it('displays the error object message when provided', () => {
    const props = {
      error: new Error('This is a specific error message'),
      message: 'This should be overridden.',
    }
    render(ErrorState, { props })
    expect(screen.getByText(props.error.message)).toBeTruthy()
    expect(screen.queryByText(props.message)).toBeNull()
  })

  it('does not render the retry button if onRetry is not provided', () => {
    render(ErrorState)
    expect(screen.queryByTestId('retry-button')).toBeNull()
  })

  it('renders the retry button when onRetry is provided', () => {
    const props = {
      onRetry: () => {},
    }
    render(ErrorState, { props })
    expect(screen.getByTestId('retry-button')).toBeTruthy()
  })
})
