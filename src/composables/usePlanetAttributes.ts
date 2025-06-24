export function usePlanetAttributes() {
  const getClimateColor = (climate: string) => {
    if (climate.toLowerCase().includes('temperate'))
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (climate.toLowerCase().includes('tropical'))
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    if (climate.toLowerCase().includes('frozen') || climate.toLowerCase().includes('cold'))
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    if (climate.toLowerCase().includes('hot') || climate.toLowerCase().includes('arid'))
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  const getTerrainColor = (terrain: string) => {
    if (terrain.toLowerCase().includes('mountains'))
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    if (terrain.toLowerCase().includes('ocean') || terrain.toLowerCase().includes('sea'))
      return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    if (terrain.toLowerCase().includes('desert'))
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    if (terrain.toLowerCase().includes('forest') || terrain.toLowerCase().includes('jungle'))
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200'
  }

  return {
    getClimateColor,
    getTerrainColor,
  }
}
