import {
  OverrideSymbol as identify,
  OverrideScheme,
  OverrideConfig,
  SchemeKeyType,
  SchemeType,
} from './types'

export function override<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeKey: SchemeKey,
  overrideScheme: OverrideScheme<SchemeKey, Scheme>,
) {
  return {
    identify,
    schemeKey,
    overrideScheme,
  } as OverrideConfig<SchemeKey, Scheme>
}
