import { SchemeConfig, SchemeKeyType, ValidSchemeKey } from './types'
import { isOverrideConfig, getSchemeKey, getBasicScheme } from './utils'

export { getSchemeKey }

export function getScheme<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  schemeKey: ValidSchemeKey<SchemeKey, Scheme> = schemeConfig.defaultScheme,
): Scheme {
  if (isOverrideConfig<SchemeKey, Scheme>(schemeKey)) {
    const currentSchemeKey = getSchemeKey(schemeConfig, schemeKey)
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
