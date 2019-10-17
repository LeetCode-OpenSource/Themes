import { globalStyle } from '~/src/colors'

export const GlobalStyle = globalStyle(({ colors }) => ({
  ':root': {
    colorScheme: 'light dark',
  },
  body: {
    background: colors.background,
  },
}))
