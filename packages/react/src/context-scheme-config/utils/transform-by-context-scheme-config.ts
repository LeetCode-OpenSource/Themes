import { SchemeConfig, SchemeKeyType, SchemeValueType } from '@themes/scheme'

import { ContextSchemeConfig } from '../types'
import { useContextSchemeConfig } from '../use-context-scheme-config'

export function transformByContextSchemeConfig<
  ContextSchemeKey extends SchemeKeyType,
  ContextScheme extends SchemeValueType,
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeValueType
>(
  contextSchemeConfig: ContextSchemeConfig<ContextSchemeKey, ContextScheme>,
  transformerSchemeConfig: SchemeConfig<SchemeKey, (context: ContextScheme) => Scheme>,
) {
  const schemeKeys = Object.keys(transformerSchemeConfig.schemes) as SchemeKey[]

  return {
    defaultScheme: transformerSchemeConfig.defaultScheme,
    schemes: schemeKeys.reduce(
      (schemes, schemeKey) => ({
        ...schemes,
        [schemeKey]: () => {
          const scheme = useContextSchemeConfig(contextSchemeConfig) as ContextScheme
          return transformerSchemeConfig.schemes[schemeKey](scheme)
        },
      }),
      {},
    ),
  } as SchemeConfig<SchemeKey, () => Scheme>
}
