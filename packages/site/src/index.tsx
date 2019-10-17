import * as React from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { getScheme } from '@themes/scheme'

import { colors, ColorsTheme } from './colors'
import { Home } from './pages'
import { GlobalStyle } from './global.styled'

const ColorsProvider = colors.Context.Provider

const App = () => {
  const [colorTheme, updateColorTheme] = React.useState(
    matchMedia('(prefers-color-scheme: dark)').matches ? ColorsTheme.dark : ColorsTheme.light,
  )

  const colorScheme = getScheme(colors, colorTheme)

  useEffect(() => {
    const onPrefersColorSchemeChanged = (event: MediaQueryListEvent) => {
      updateColorTheme(event.matches ? ColorsTheme.dark : ColorsTheme.light)
    }

    const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')

    mediaQueryList.addListener(onPrefersColorSchemeChanged)

    return () => {
      mediaQueryList.removeListener(onPrefersColorSchemeChanged)
    }
  }, [updateColorTheme])

  return (
    <ColorsProvider value={colorTheme}>
      <ThemeProvider theme={colorScheme}>
        <GlobalStyle />
        <Home />
      </ThemeProvider>
    </ColorsProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
