import * as React from 'react'
import { SchemeConfig, SchemeKeyType, SchemeValueType, ValueOfScheme } from '@themes/scheme'

import { ContextSchemeConfig } from './types'
import { transformByContextSchemeConfig } from './utils/transform-by-context-scheme-config'

function transform<
  SK1 extends SchemeKeyType,
  SV1 extends SchemeValueType,
  SK2 extends SchemeKeyType,
  SV2 extends SchemeValueType
>(
  this: ContextSchemeConfig<SK1, SV1>,
  transformerSchemeConfig: SchemeConfig<
    SK2,
    (context: ValueOfScheme<SchemeConfig<SK1, SV1>>) => SV2
  >,
) {
  return transformByContextSchemeConfig(this, transformerSchemeConfig)
}

export function createContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeValueType
>(schemeConfig: SchemeConfig<SchemeKey, Scheme>): ContextSchemeConfig<SchemeKey, Scheme> {
  return {
    ...schemeConfig,
    transform,
    Context: React.createContext(schemeConfig.defaultScheme),
  }
}
