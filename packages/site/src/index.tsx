import * as React from 'react'
import ReactDOM from 'react-dom'
import { useMatchMedia } from '@themes/react'

import { ColorsProvider, ColorsTheme } from './colors'
import { Home } from './pages'
import { GlobalStyle } from './global.styled'

const App = () => {
  const colorTheme = useMatchMedia('(prefers-color-scheme: dark)')
    ? ColorsTheme.dark
    : ColorsTheme.light

  return (
    <ColorsProvider value={colorTheme}>
      <GlobalStyle />
      <Home />
    </ColorsProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
