import * as React from 'react'
import { SchemeConfig, SchemeKeyType, SchemeValueType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'
import { transformByContextSchemeConfig } from './utils/transform-by-context-scheme-config'

function transform<
  SK1 extends SchemeKeyType,
  S1 extends SchemeValueType,
  SK2 extends SchemeKeyType,
  S2 extends SchemeValueType
>(
  this: ContextSchemeConfig<SK1, S1>,
  transformerSchemeConfig: SchemeConfig<SK2, (context: S1) => S2>,
) {
  return transformByContextSchemeConfig(this, transformerSchemeConfig)
}

export function createContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeValueType
>(schemeConfig: SchemeConfig<SchemeKey, Scheme>): ContextSchemeConfig<SchemeKey, Scheme> {
  return {
    ...schemeConfig,
    transform: transform,
    Context: React.createContext(schemeConfig.defaultScheme),
  }
}
