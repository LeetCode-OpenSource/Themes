import {
  SchemeConfig,
  SchemeKeyType,
  SchemeType,
  ValidSchemeKey,
  ValidSchemeKeyWithoutScheme,
} from './types'
import { isOverrideConfig } from './utils'

export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  validSchemeKey: ValidSchemeKeyWithoutScheme<SchemeKey, Scheme>,
  schemeConfig: SchemeConfig<SchemeKey, Scheme>,
): SchemeKey
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  validSchemeKey?: Scheme,
  schemeConfig?: SchemeConfig<SchemeKey, Scheme>,
): undefined
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  validSchemeKey: ValidSchemeKey<SchemeKey, Scheme>,
  schemeConfig?: SchemeConfig<SchemeKey, Scheme>,
): SchemeKey | undefined
export function getSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  validSchemeKey: ValidSchemeKey<SchemeKey, Scheme>,
  schemeConfig?: SchemeConfig<SchemeKey, Scheme>,
): SchemeKey | undefined {
  if (isOverrideConfig(validSchemeKey)) {
    return validSchemeKey.schemeKey as SchemeKey
  } else if (typeof validSchemeKey === 'object') {
    return undefined
  } else {
    return validSchemeKey || schemeConfig?.defaultScheme
  }
}
