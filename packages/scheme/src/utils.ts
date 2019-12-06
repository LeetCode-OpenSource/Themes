import {
  OverrideSymbol,
  OverrideConfig,
  SchemeConfig,
  SchemeKeyType,
  SchemeType,
  ValidSchemeKey,
} from './types'

export function isOverrideConfig<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeKey: ValidSchemeKey<SchemeKey, Scheme>,
): schemeKey is OverrideConfig<SchemeKey, Scheme> {
  return (
    !!schemeKey &&
    typeof schemeKey === 'object' &&
    (schemeKey as OverrideConfig<SchemeKey, Scheme>).identify === OverrideSymbol
  )
}

export function getBasicScheme<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey,
): Scheme {
  const scheme = schemeConfig.schemes[schemeKey]

  if (isSchemeFactory(scheme)) {
    return scheme()
  } else {
    return scheme as Scheme
  }
}

function isSchemeFactory<Scheme>(scheme: Scheme | (() => Scheme)): scheme is () => Scheme {
  return typeof scheme === 'function'
}
