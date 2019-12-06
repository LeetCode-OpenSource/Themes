import * as React from 'react'
import { SchemeConfig, SchemeKeyType, SchemeType } from '@themes/scheme'

export type ContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
> = Readonly<
  SchemeConfig<SchemeKey, Scheme> & {
    Context: React.Context<SchemeKey>
    transform: <SK extends SchemeKeyType, S extends SchemeType>(
      transformerSchemeConfig: SchemeConfig<SK, (scheme: Scheme) => S>,
    ) => SchemeConfig<SK, S>
  }
>
