import { describe, it, expect } from 'vitest'

import { useTheme } from '../useTheme'

describe('useTheme', () => {
  it('should return the correct theme', () => {
    const { currentTheme } = useTheme()
    expect(currentTheme.value).toBe('jedi-light')
  })

  it('should return the correct theme', () => {
    const { currentTheme, setTheme } = useTheme()
    setTheme('sith-dark')
    expect(currentTheme.value).toBe('sith-dark')
  })

  it('should return the correct theme', () => {
    const { currentTheme, setTheme } = useTheme()
    setTheme('jedi-dark')
    expect(currentTheme.value).toBe('jedi-dark')
  })

  it('should return the correct theme', () => {
    const { currentTheme, setTheme } = useTheme()
    setTheme('sith-light')
    expect(currentTheme.value).toBe('sith-light')
  })
})
