import { SchemeConfig } from '@themes/scheme'
import { combine } from '@themes/react'

import { colors } from '~/src/colors'
import { BasicButton, ButtonColorScheme, ButtonSizeScheme } from './basic'

type Size = 'sm' | 'md' | 'lg'

type ButtonTheme = 'default' | 'primary' | 'danger'

const theme = colors.transform<ButtonTheme, ButtonColorScheme>({
  defaultScheme: 'default',

  schemes: {
    default: ({ primary, background }) => ({
      color: primary,
      backgroundColor: background,
    }),

    primary: ({ primary3, primary6 }) => ({
      color: primary3,
      backgroundColor: primary6,
    }),

    danger: ({ red3, red6 }) => ({
      color: red3,
      backgroundColor: red6,
    }),
  },
})

const size: SchemeConfig<Size, ButtonSizeScheme> = {
  defaultScheme: 'sm',

  schemes: {
    sm: {
      padding: 10,
    },

    md: {
      padding: 15,
    },

    lg: {
      padding: 20,
    },
  },
}

export const Button = combine({ theme, size }, BasicButton)
