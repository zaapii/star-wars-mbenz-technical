import { useI18n } from '@/composables/useI18n'

export function useFormatNumber() {
  const { t } = useI18n()

  const formatNumber = (value: string) => {
    const num = parseInt(value)
    if (isNaN(num)) return t('common.unknown')
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return {
    formatNumber,
  }
}
