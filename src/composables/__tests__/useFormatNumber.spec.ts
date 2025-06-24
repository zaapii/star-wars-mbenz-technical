import { describe, it, expect } from 'vitest'

import { useFormatNumber } from '../useFormatNumber'

describe('useFormatNumber', () => {
  it('should format a number correctly', () => {
    const { formatNumber } = useFormatNumber()
    expect(formatNumber('14000')).toBe('14.0K')
    expect(formatNumber('14500000')).toBe('14.5M')
    expect(formatNumber('14800003000')).toBe('14.8B')
  })
})
