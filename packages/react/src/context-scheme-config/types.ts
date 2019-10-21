import * as React from 'react'
import { SchemeConfig, SchemeKeyType, SchemeValueType, ValueOfScheme } from '@themes/scheme'

export type ContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeValueType
> = Readonly<
  SchemeConfig<SchemeKey, Scheme> & {
    Context: React.Context<SchemeKey>
    transform: <SK extends SchemeKeyType, S extends SchemeValueType>(
      transformerSchemeConfig: SchemeConfig<
        SK,
        (scheme: ValueOfScheme<SchemeConfig<SchemeKey, Scheme>>) => S
      >,
    ) => SchemeConfig<SK, () => S>
  }
>
