import { SchemeConfig, SchemeKeyType, OverwriteConfig, OverwriteSymbol } from './types'

function getBasicScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey,
): Scheme {
  const scheme = schemeConfig.schemes[schemeKey]
  return typeof scheme === 'function' ? scheme() : scheme
}

export function getScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey | OverwriteConfig<SchemeKey, Scheme> = schemeConfig.defaultScheme,
): Scheme {
  if (typeof schemeKey === 'string') {
    return getBasicScheme(schemeConfig, schemeKey)
  }

  if (schemeKey.identify === OverwriteSymbol) {
    const currentScheme = getBasicScheme(schemeConfig, schemeKey.schemeKey)

    if (typeof schemeKey.overwriteScheme === 'function') {
      return { ...currentScheme, ...schemeKey.overwriteScheme(currentScheme) }
    } else {
      return { ...currentScheme, ...schemeKey.overwriteScheme }
    }
  }

  throw new Error(`Invalid schemeKey: ${schemeKey}`)
}
