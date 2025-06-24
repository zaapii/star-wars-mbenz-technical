import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'


import de from '@/locale/de.json'
import en from '@/locale/en.json'
import es from '@/locale/es.json'

import ErrorState from '../ErrorState.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    de
  }
})

describe('ErrorState', () => {
  it('renders the default title and message when no props are provided', () => {
    render(ErrorState, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText('states.error.title')).toBeTruthy()
    expect(screen.getByText('states.error.message')).toBeTruthy()
  })

  it('renders a custom title and message from props', () => {
    const props = {
      title: 'Houston, we have a problem',
      message: 'The hyperdrive has failed.',
    }
    render(ErrorState, {
      props,
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(props.title)).toBeTruthy()
    expect(screen.getByText(props.message)).toBeTruthy()
  })

  it('displays the error object message when provided', () => {
    const props = {
      error: new Error('This is a specific error message'),
      message: 'This should be overridden.',
    }
    render(ErrorState, {
      props,
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByText(props.error.message)).toBeTruthy()
    expect(screen.queryByText(props.message)).toBeNull()
  })

  it('does not render the retry button if onRetry is not provided', () => {
    render(ErrorState, {
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.queryByTestId('retry-button')).toBeNull()
  })

  it('renders the retry button when onRetry is provided', () => {
    const props = {
      onRetry: () => { },
    }
    render(ErrorState, {
      props,
      global: {
        plugins: [i18n]
      }
    })
    expect(screen.getByTestId('retry-button')).toBeTruthy()
  })
})
