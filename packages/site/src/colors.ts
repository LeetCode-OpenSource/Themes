import { createContextSchemeConfig } from '@themes/react'
import { setupEmotion } from '@themes/emotion'

export enum ColorsTheme {
  light = 'light',
  dark = 'dark',
}

export interface ColorsScheme {
  primary: string
  background: string
}

export const colors = createContextSchemeConfig<ColorsTheme, ColorsScheme>({
  defaultScheme: ColorsTheme.light,

  schemes: {
    [ColorsTheme.light]: {
      primary: '#000',
      background: '#fff',
    },

    [ColorsTheme.dark]: {
      background: '#000',
      primary: '#fff',
    },
  },
})

export const { styled, globalStyle, useColors, ColorsProvider, ColorsConsumer } = setupEmotion({
  colors,
})
