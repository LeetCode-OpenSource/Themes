import {
  OverrideSymbol,
  OverrideConfig,
  SchemeConfig,
  SchemeKeyType,
  ValidSchemeKey,
} from './types'

export function isOverrideConfig<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey: ValidSchemeKey<SchemeKey, Scheme>,
): schemeKey is OverrideConfig<SchemeKey, Scheme> {
  return (
    !!schemeKey &&
    typeof schemeKey === 'object' &&
    (schemeKey as OverrideConfig<SchemeKey, Scheme>).identify === OverrideSymbol
  )
}

export function getBasicScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey,
): Scheme {
  const scheme = schemeConfig.schemes[schemeKey]
  return typeof scheme === 'function' ? scheme() : scheme
}
