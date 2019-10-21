import * as React from 'react'
import { SchemeConfig, SchemeKeyType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'
import { transformByContextSchemeConfig } from './utils/transform-by-context-scheme-config'

function transform<SK1 extends SchemeKeyType, SV1, SK2 extends SchemeKeyType, SV2>(
  this: ContextSchemeConfig<SK1, SV1>,
  transformerSchemeConfig: SchemeConfig<SK2, (context: SV1) => SV2>,
) {
  return transformByContextSchemeConfig(this, transformerSchemeConfig)
}

export function createContextSchemeConfig<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
): ContextSchemeConfig<SchemeKey, Scheme> {
  return {
    ...schemeConfig,
    transform,
    Context: React.createContext(schemeConfig.defaultScheme),
  }
}
