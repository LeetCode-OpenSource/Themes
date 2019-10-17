import { createContextSchemeConfig } from '@themes/react'
import { setupEmotion } from '@themes/emotion'

export enum ColorsTheme {
  light = 'light',
  dark = 'dark',
}

export interface ColorsScheme {
  primary: string
  background: string

  primary0: string
  primary1: string
  primary2: string
  primary3: string
  primary4: string
  primary5: string
  primary6: string
  primary7: string
  primary8: string
  primary9: string

  red0: string
  red1: string
  red2: string
  red3: string
  red4: string
  red5: string
  red6: string
  red7: string
  red8: string
  red9: string
}

export const colors = createContextSchemeConfig<ColorsTheme, ColorsScheme>({
  defaultScheme: ColorsTheme.light,

  schemes: {
    [ColorsTheme.light]: {
      primary: '#000',
      background: '#fff',

      primary0: '#F5FAF9',
      primary1: '#CCEAE3',
      primary2: '#99D6C7',
      primary3: '#66C1AC',
      primary4: '#32AD90',
      primary5: '#009975',
      primary6: '#008969',
      primary7: '#006B51',
      primary8: '#004C3A',
      primary9: '#002D23',

      red0: '#FAF3F2',
      red1: '#FBDBDA',
      red2: '#F7B7B5',
      red3: '#F39390',
      red4: '#EF6F6B',
      red5: '#EC4C47',
      red6: '#D4443F',
      red7: '#A53531',
      red8: '#762623',
      red9: '#461615',
    },

    [ColorsTheme.dark]: {
      background: '#000',
      primary: '#fff',

      primary9: '#F5FAF9',
      primary8: '#CCEAE3',
      primary7: '#99D6C7',
      primary6: '#66C1AC',
      primary5: '#32AD90',
      primary4: '#009975',
      primary3: '#008969',
      primary2: '#006B51',
      primary1: '#004C3A',
      primary0: '#002D23',

      red9: '#FAF3F2',
      red8: '#FBDBDA',
      red7: '#F7B7B5',
      red6: '#F39390',
      red5: '#EF6F6B',
      red4: '#EC4C47',
      red3: '#D4443F',
      red2: '#A53531',
      red1: '#762623',
      red0: '#461615',
    },
  },
})

export const { styled, globalStyle, useColors, ColorsProvider, ColorsConsumer } = setupEmotion({
  colors,
})
