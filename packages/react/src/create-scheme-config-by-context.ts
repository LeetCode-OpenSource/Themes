import { useContext, Context } from 'react'
import { SchemeConfig, SchemeKeyType, SchemeType } from '@themes/scheme'

export function createSchemeConfigByContext<
  ContextValue,
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
>(
  context: Context<ContextValue>,
  transformerSchemeConfig: SchemeConfig<SchemeKey, (context: ContextValue) => Scheme>,
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
