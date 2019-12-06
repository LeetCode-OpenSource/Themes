import {
  SchemeConfig,
  SchemeKeyType,
  SchemeType,
  ValidSchemeKey,
  ValidSchemeKeyWithoutScheme,
} from './types'
import { isOverrideConfig } from './utils'

export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  validSchemeKey?: ValidSchemeKeyWithoutScheme<SchemeKey, Scheme>,
): SchemeKey
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  validSchemeKey?: Scheme,
): undefined
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  validSchemeKey?: ValidSchemeKey<SchemeKey, Scheme>,
): SchemeKey | undefined
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
  validSchemeKey?: ValidSchemeKey<SchemeKey, Scheme>,
): SchemeKey | undefined {
  if (isOverrideConfig(validSchemeKey)) {
    return validSchemeKey.schemeKey as SchemeKey
  } else if (typeof validSchemeKey === 'object') {
    return undefined
  } else {
    return validSchemeKey || schemeConfig.defaultScheme
  }
}
