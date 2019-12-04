import { SchemeConfig, SchemeKeyType, OverwriteConfig, OverwriteSymbol } from './types'

function getBasicScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey,
): Scheme {
  const scheme = schemeConfig.schemes[schemeKey]
  return typeof scheme === 'function' ? scheme() : scheme
}

export type ValidSchemeKey<SchemeKey extends SchemeKeyType, Scheme> =
  | SchemeKey
  | OverwriteConfig<SchemeKey, Scheme>

function isOverwriteConfig<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey: ValidSchemeKey<SchemeKey, Scheme>,
): schemeKey is OverwriteConfig<SchemeKey, Scheme> {
  return (
    schemeKey &&
    typeof schemeKey === 'object' &&
    (schemeKey as OverwriteConfig<SchemeKey, Scheme>).identify === OverwriteSymbol
  )
}

export function getScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: ValidSchemeKey<SchemeKey, Scheme> = schemeConfig.defaultScheme,
): Scheme {
  if (isOverwriteConfig(schemeKey)) {
    const currentSchemeKey = schemeKey.schemeKey || schemeConfig.defaultScheme
    const currentScheme = getBasicScheme(schemeConfig, currentSchemeKey)

    if (typeof schemeKey.overwriteScheme === 'function') {
      return { ...currentScheme, ...schemeKey.overwriteScheme(currentScheme, currentSchemeKey) }
    } else {
      return { ...currentScheme, ...schemeKey.overwriteScheme }
    }
  } else {
    return getBasicScheme(schemeConfig, schemeKey as SchemeKey)
  }
}
