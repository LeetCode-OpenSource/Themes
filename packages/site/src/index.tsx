import * as React from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { ColorsProvider, ColorsTheme } from './colors'
import { Home } from './pages'
import { GlobalStyle } from './global.styled'

const App = () => {
  const [colorTheme, updateColorTheme] = React.useState(
    matchMedia('(prefers-color-scheme: dark)').matches ? ColorsTheme.dark : ColorsTheme.light,
  )

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
      <GlobalStyle />
      <Home />
    </ColorsProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
