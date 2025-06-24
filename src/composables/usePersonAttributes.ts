export function usePersonAttributes() {
  const formatHeight = (height: string) => {
    const num = parseInt(height)
    if (isNaN(num)) return 'Unknown'
    return `${num} cm`
  }

  const formatMass = (mass: string) => {
    const num = parseInt(mass)
    if (isNaN(num)) return 'Unknown'
    return `${num} kg`
  }

  const getEyeColorBadgeClass = (eyeColor: string) => {
    const color = eyeColor.toLowerCase()
    if (color.includes('blue')) return 'bg-blue-800 text-white dark:bg-blue-900 dark:text-white'
    if (color.includes('hazel')) return 'bg-amber-800 text-white dark:bg-amber-900 dark:text-white'
    if (color.includes('orange'))
      return 'bg-orange-800 text-white dark:bg-orange-900 dark:text-white'
    if (color.includes('yellow'))
      return 'bg-yellow-800 text-white dark:bg-yellow-900 dark:text-white'
    if (color.includes('brown'))
      return 'bg-yellow-950 text-white dark:bg-yellow-900 dark:text-white'
    if (color.includes('red')) return 'bg-red-800 text-white dark:bg-red-900 dark:text-white'
    if (color.includes('black')) return 'bg-gray-800 text-white dark:bg-gray-900 dark:text-white'
    if (color.includes('pink')) return 'bg-pink-800 text-white dark:bg-pink-900 dark:text-white'
    return 'bg-slate-800 text-white dark:bg-slate-900 dark:text-white'
  }

  const getHairColorBadgeClass = (hairColor: string) => {
    const color = hairColor.toLowerCase()
    if (color.includes('blond') || color.includes('blonde'))
      return 'bg-yellow-800 text-white dark:bg-yellow-900 dark:text-white'
    if (color.includes('brown'))
      return 'bg-yellow-950 text-white dark:bg-yellow-900 dark:text-white'
    if (color.includes('black')) return 'bg-gray-800 text-white dark:bg-gray-900 dark:text-white'
    if (color.includes('red') || color.includes('auburn'))
      return 'bg-red-800 text-white dark:bg-red-900 dark:text-white'
    if (color.includes('white') || color.includes('gray'))
      return 'bg-slate-800 text-white dark:bg-slate-900 dark:text-white'
    return 'bg-slate-800 text-white dark:bg-slate-900 dark:text-white'
  }

  return {
    formatHeight,
    formatMass,
    getEyeColorBadgeClass,
    getHairColorBadgeClass,
  }
}
