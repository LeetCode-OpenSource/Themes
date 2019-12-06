import * as React from 'react'
import { SchemeConfig, SchemeKeyType, SchemeType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'
import { transformByContextSchemeConfig } from './utils/transform-by-context-scheme-config'

function transform<
  SchemeKey1 extends SchemeKeyType,
  Scheme1 extends SchemeType,
  SchemeKey2 extends SchemeKeyType,
  Scheme2 extends SchemeType
>(
  this: ContextSchemeConfig<SchemeKey1, Scheme1>,
  transformerSchemeConfig: SchemeConfig<SchemeKey2, (context: Scheme1) => Scheme2>,
) {
  return transformByContextSchemeConfig(this, transformerSchemeConfig)
}

export function createContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
>(schemeConfig: SchemeConfig<SchemeKey, Scheme>): ContextSchemeConfig<SchemeKey, Scheme> {
  return {
    ...schemeConfig,
    transform,
    Context: React.createContext(schemeConfig.defaultScheme),
  }
}
