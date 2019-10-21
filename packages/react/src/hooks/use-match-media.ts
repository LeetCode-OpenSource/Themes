import { useState, useEffect } from 'react'

export function useMatchMedia(query: string): boolean {
  const [matches, updateMatches] = useState(matchMedia(query).matches)

  useEffect(() => {
    const onPrefersColorSchemeChanged = (event: MediaQueryListEvent) => {
      updateMatches(event.matches)
    }

    const mediaQueryList = matchMedia(query)

    mediaQueryList.addListener(onPrefersColorSchemeChanged)

    return () => {
      mediaQueryList.removeListener(onPrefersColorSchemeChanged)
    }
  }, [query, updateMatches])

  return matches
}
