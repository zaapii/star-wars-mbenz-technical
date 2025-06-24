import { describe, expect, it } from 'vitest'

import { useI18n } from '../useI18n'

describe('useI18n', () => {
  it('should return the correct data', async () => {
    const { t } = useI18n()
    expect(t('common.hello')).toBe('Hello')
  })

  it('should change the locale', async () => {
    const { changeLocale, t } = useI18n()
    changeLocale('de')
    expect(t('common.hello')).toBe('Hallo')
    changeLocale('en')
    expect(t('common.hello')).toBe('Hello')
    changeLocale('es')
    expect(t('common.hello')).toBe('Hola')
  })

  it('should render the correct flag', async () => {
    const { currentLocaleInfo, changeLocale } = useI18n()
    changeLocale('de')
    expect(currentLocaleInfo.value.flag).toBe('🇩🇪')
    changeLocale('en')
    expect(currentLocaleInfo.value.flag).toBe('🇺🇸')
    changeLocale('es')
    expect(currentLocaleInfo.value.flag).toBe('🇪🇸')
  })

  it('should render the correct language name', async () => {
    const { currentLocaleInfo, changeLocale } = useI18n()
    changeLocale('de')
    expect(currentLocaleInfo.value.name).toBe('German')
    changeLocale('en')
    expect(currentLocaleInfo.value.name).toBe('English')
    changeLocale('es')
    expect(currentLocaleInfo.value.name).toBe('Spanish')
  })

  it('should render the correct native language', async () => {
    const { currentLocaleInfo, changeLocale } = useI18n()
    changeLocale('de')
    expect(currentLocaleInfo.value.nativeName).toBe('Deutsch')
    changeLocale('en')
    expect(currentLocaleInfo.value.nativeName).toBe('English')
    changeLocale('es')
    expect(currentLocaleInfo.value.nativeName).toBe('Español')
  })
})