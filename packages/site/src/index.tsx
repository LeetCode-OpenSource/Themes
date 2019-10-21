import * as React from 'react'
import ReactDOM from 'react-dom'
import { useDarkMode } from '@themes/use-dark-mode'

import { ColorsProvider, ColorsTheme } from './colors'
import { Home } from './pages'
import { GlobalStyle } from './global.styled'

const App = () => {
  const colorTheme = useDarkMode(ColorsTheme)

  return (
    <ColorsProvider value={colorTheme}>
      <GlobalStyle />
      <Home />
    </ColorsProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
