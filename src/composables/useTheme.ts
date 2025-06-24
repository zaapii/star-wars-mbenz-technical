import { ref, computed } from 'vue'

export type ThemeMode = 'light' | 'dark'
export type ThemeFaction = 'jedi' | 'sith'
export type Theme = `${ThemeFaction}-${ThemeMode}`

const THEMES = {
  'jedi-light': 'theme-jedi-light',
  'jedi-dark': 'theme-jedi-dark',
  'sith-light': 'theme-sith-light',
  'sith-dark': 'theme-sith-dark',
} as const

const currentTheme = ref<Theme>('jedi-light')

export function useTheme() {
  const isDark = computed(() => currentTheme.value.includes('dark'))
  const isLight = computed(() => currentTheme.value.includes('light'))
  const isJedi = computed(() => currentTheme.value.includes('jedi'))
  const isSith = computed(() => currentTheme.value.includes('sith'))

  function setTheme(newTheme: Theme) {
    const html = document.documentElement
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    favicon?.setAttribute('href', `/${newTheme.split('-')[0]}.svg`)

    Object.values(THEMES).forEach(themeClass => {
      html.classList.remove(themeClass)
    })

    html.classList.add(THEMES[newTheme])

    if (newTheme.includes('dark')) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    currentTheme.value = newTheme
    localStorage.setItem('app-theme', newTheme)
  }

  function setMode(mode: ThemeMode) {
    const faction = isJedi.value ? 'jedi' : 'sith'
    const newTheme: Theme = `${faction}-${mode}`
    setTheme(newTheme)
  }

  function setFaction(faction: ThemeFaction) {
    const mode = isDark.value ? 'dark' : 'light'
    const newTheme: Theme = `${faction}-${mode}`
    setTheme(newTheme)
  }

  function toggleMode() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  function toggleFaction() {
    setFaction(isJedi.value ? 'sith' : 'jedi')
  }

  function loadSavedTheme() {
    const saved = localStorage.getItem('app-theme') as Theme | null
    if (saved && Object.keys(THEMES).includes(saved)) {
      setTheme(saved)
    } else {
      setTheme('jedi-light')
    }
  }

  return {
    // State
    currentTheme,
    isDark,
    isLight,
    isJedi,
    isSith,

    // Actions
    setTheme,
    setMode,
    setFaction,
    toggleMode,
    toggleFaction,
    loadSavedTheme,

    // Available themes
    themes: THEMES,
  }
}
