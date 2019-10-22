import { useContext, Context } from 'react'
import { SchemeConfig, SchemeKeyType } from '@themes/scheme'

export function createSchemeConfigByContext<C, SchemeKey extends SchemeKeyType, Scheme>(
  context: Context<C>,
  transformerSchemeConfig: SchemeConfig<SchemeKey, (context: C) => Scheme>,
): SchemeConfig<SchemeKey, Scheme> {
  const schemeKeys = Object.keys(transformerSchemeConfig.schemes) as SchemeKey[]

  return {
    defaultScheme: transformerSchemeConfig.defaultScheme,

    schemes: schemeKeys.reduce(
      (schemes, schemeKey) => ({
        ...schemes,
        [schemeKey]: () => {
          const contextValue = useContext(context)
          return transformerSchemeConfig.schemes[schemeKey](contextValue)
        },
      }),
      {},
    ),
  } as SchemeConfig<SchemeKey, Scheme>
}
