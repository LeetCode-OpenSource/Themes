import { SchemeConfig, ValueOfScheme, SchemeKeyType, SchemeValueType } from './types'

export function getScheme<SchemeKey extends SchemeKeyType, Scheme extends SchemeValueType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: SchemeKey = schemeConfig.defaultScheme,
): ValueOfScheme<SchemeConfig<SchemeKey, Scheme>> {
  const scheme = schemeConfig.schemes[schemeKey]
  return typeof scheme === 'function' ? scheme() : scheme
}
