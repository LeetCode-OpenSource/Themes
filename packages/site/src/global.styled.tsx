import * as React from 'react'
import { Global, css } from '@emotion/core'
import { useContextSchemeConfig } from '@themes/react'

import { colors } from '~/src/colors'

export const GlobalStyle = () => {
  const color = useContextSchemeConfig(colors)
  return (
    <Global
      styles={css({
        ':root': {
          colorScheme: 'light dark',
        },
        body: {
          background: color.background,
        },
      })}
    />
  )
}
