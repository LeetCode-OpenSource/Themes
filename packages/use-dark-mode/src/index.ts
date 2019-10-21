import { useEffect, useState } from 'react'

type Mode = 'dark' | 'light'

export interface UseDarkModeConfig<T> {
  light: T
  dark: T
}

export function useDarkMode<T>(config: UseDarkModeConfig<T>): T {
  const [mode, updateMode] = useState<Mode>(
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  useEffect(() => {
    const onPrefersColorSchemeChanged = (event: MediaQueryListEvent) => {
      updateMode(event.matches ? 'dark' : 'light')
    }

    const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')

    mediaQueryList.addListener(onPrefersColorSchemeChanged)

    return () => {
      mediaQueryList.removeListener(onPrefersColorSchemeChanged)
    }
  }, [updateMode])

  return config[mode]
}
