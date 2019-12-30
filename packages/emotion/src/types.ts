import { ComponentType, ReactNode } from 'react'
import { Interpolation } from '@emotion/serialize'
import { CreateStyled } from '@emotion/styled'
import { SchemeKeyType, SchemeType } from '@themes/scheme'
import { ContextSchemeConfig } from '@themes/react'

export type StyleFactory<EmotionTheme extends object> = (theme: EmotionTheme) => Interpolation

export interface SetupEmotionConfig<
  ColorsSchemeKey extends SchemeKeyType,
  ColorsScheme extends SchemeType
> {
  colors: ContextSchemeConfig<ColorsSchemeKey, ColorsScheme>
}

export interface SetupEmotionResult<ColorsSchemeKey extends SchemeKeyType, ColorsScheme> {
  ColorsProvider: ComponentType<{ value: ColorsSchemeKey; children: ReactNode }>
  ColorsConsumer: ComponentType<{ children: (colors: ColorsScheme) => ReactNode }>

  useColors: (schemeKey?: ColorsSchemeKey) => ColorsScheme
  useColorKey: () => ColorsSchemeKey

  styled: CreateStyled<{ colors: ColorsScheme }>
  globalStyle: <EmotionTheme extends { colors: ColorsScheme }>(
    styleFactory: StyleFactory<EmotionTheme>,
  ) => ComponentType
}
