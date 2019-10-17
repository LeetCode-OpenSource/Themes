import { ComponentType, ReactNode } from 'react'
import { Interpolation } from '@emotion/serialize'
import { SchemeKeyType, SchemeValueType } from '@themes/scheme'
import { ContextSchemeConfig } from '@themes/react'
import { CreateStyled } from '@emotion/styled'

export type StyleFactory<EmotionTheme extends object> = (theme: EmotionTheme) => Interpolation

export interface SetupEmotionConfig<
  ColorsSchemeKey extends SchemeKeyType,
  ColorsScheme extends SchemeValueType
> {
  colors: ContextSchemeConfig<ColorsSchemeKey, ColorsScheme>
}

export interface SetupEmotionResult<
  ColorsSchemeKey extends SchemeKeyType,
  ColorsScheme extends SchemeValueType
> {
  ColorsProvider: ComponentType<{ value: ColorsSchemeKey; children: ReactNode }>
  ColorsConsumer: ComponentType<{ children: (colors: ColorsScheme) => ReactNode }>

  useColors: (schemeKey?: ColorsSchemeKey) => ColorsScheme

  styled: CreateStyled<{ colors: ColorsScheme }>
  globalStyle: <EmotionTheme extends { colors: ColorsScheme }>(
    styleFactory: StyleFactory<EmotionTheme>,
  ) => ComponentType
}
