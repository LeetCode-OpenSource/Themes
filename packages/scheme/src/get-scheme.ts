import { SchemeConfig, SchemeKeyType, OverrideConfig, OverrideSymbol } from './types'

function getBasicScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey,
): Scheme {
  const scheme = schemeConfig.schemes[schemeKey]
  return typeof scheme === 'function' ? scheme() : scheme
}

export type ValidSchemeKey<SchemeKey extends SchemeKeyType, Scheme> =
  | SchemeKey
  | OverrideConfig<SchemeKey, Scheme>

function isOverrideConfig<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey: ValidSchemeKey<SchemeKey, Scheme>,
): schemeKey is OverrideConfig<SchemeKey, Scheme> {
  return (
    schemeKey &&
    typeof schemeKey === 'object' &&
    (schemeKey as OverrideConfig<SchemeKey, Scheme>).identify === OverrideSymbol
  )
}

export function getScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: ValidSchemeKey<SchemeKey, Scheme> = schemeConfig.defaultScheme,
): Scheme {
  if (isOverrideConfig<SchemeKey, Scheme>(schemeKey)) {
    const overrideConfigSchemeKey = schemeKey.schemeKey as SchemeKey
    const currentSchemeKey: SchemeKey = overrideConfigSchemeKey || schemeConfig.defaultScheme
    const currentScheme = getBasicScheme(schemeConfig, currentSchemeKey)

    if (typeof schemeKey.overrideScheme === 'function') {
      return { ...currentScheme, ...schemeKey.overrideScheme(currentScheme, currentSchemeKey) }
    } else {
      return { ...currentScheme, ...schemeKey.overrideScheme }
    }
  } else {
    return getBasicScheme(schemeConfig, schemeKey as SchemeKey)
  }
}
