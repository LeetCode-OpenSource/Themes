import { globalStyle } from '~/src/colors'

export const GlobalStyle = globalStyle(({ colors }) => ({
  body: {
    color: colors.primary,
    background: colors.background,
  },
}))
