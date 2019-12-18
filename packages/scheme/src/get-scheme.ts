import { SchemeConfig, SchemeKeyType, SchemeType, ValidSchemeKey } from './types'
import { isOverrideConfig, getBasicScheme } from './utils'
import { getSchemeKey } from './get-scheme-key'

export function getScheme<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey?: ValidSchemeKey<SchemeKey, Scheme>,
): Scheme
export function getScheme(
  schemeConfig: SchemeConfig<SchemeKeyType, SchemeType>,
  schemeKey: ValidSchemeKey<SchemeKeyType, SchemeType> = schemeConfig.defaultScheme,
): SchemeType {
  if (isOverrideConfig(schemeKey)) {
    const currentSchemeKey = getSchemeKey(schemeKey, schemeConfig)
    const currentScheme = getBasicScheme(schemeConfig, currentSchemeKey)

    if (typeof schemeKey.overrideScheme === 'function') {
      return { ...currentScheme, ...schemeKey.overrideScheme(currentScheme) }
    } else {
      return { ...currentScheme, ...schemeKey.overrideScheme }
    }
  } else if (typeof schemeKey === 'object') {
    return schemeKey
  } else {
    return getBasicScheme(schemeConfig, schemeKey)
  }
}
