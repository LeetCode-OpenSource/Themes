import { SchemeConfig, SchemeKeyType, SchemeType, ValidSchemeKey } from './types'
import { isOverrideConfig, getBasicScheme } from './utils'
import { getSchemeKey } from './get-scheme-key'

export function getScheme<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: ValidSchemeKey<SchemeKey, Scheme> = schemeConfig.defaultScheme,
): Scheme {
  if (isOverrideConfig<SchemeKey, Scheme>(schemeKey)) {
    const currentSchemeKey = getSchemeKey(schemeKey, schemeConfig)
    const currentScheme = getBasicScheme(schemeConfig, currentSchemeKey)

    if (typeof schemeKey.overrideScheme === 'function') {
      return { ...currentScheme, ...schemeKey.overrideScheme(currentScheme, currentSchemeKey) }
    } else {
      return { ...currentScheme, ...schemeKey.overrideScheme }
    }
  } else if (typeof schemeKey === 'object') {
    return schemeKey
  } else {
    return getBasicScheme(schemeConfig, schemeKey)
  }
}
