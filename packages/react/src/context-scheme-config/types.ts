import * as React from 'react'
import { SchemeConfig, SchemeKeyType } from '@themes/scheme'

export type ContextSchemeConfig<SchemeKey extends SchemeKeyType, Scheme> = Readonly<
  SchemeConfig<SchemeKey, Scheme> & {
    Context: React.Context<SchemeKey>
    transform: <SK extends SchemeKeyType, S>(
      transformerSchemeConfig: SchemeConfig<SK, (scheme: Scheme) => S>,
    ) => SchemeConfig<SK, () => S>
  }
>
