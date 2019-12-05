import { SchemeConfig, SchemeKeyType, ValidSchemeKey } from './types'
import { isOverrideConfig } from './utils'

export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  validSchemeKey?: ValidSchemeKey<SchemeKey, Scheme>,
): SchemeKey {
  if (isOverrideConfig(validSchemeKey)) {
    return validSchemeKey.schemeKey as SchemeKey
  } else {
    return validSchemeKey || schemeConfig.defaultScheme
  }
}
