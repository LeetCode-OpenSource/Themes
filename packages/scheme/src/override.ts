import { OverrideSymbol, OverrideScheme, OverrideConfig, SchemeKeyType } from './types'

export function override<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey?: SchemeKey,
  overrideScheme: OverrideScheme<SchemeKey, Scheme> = {},
) {
  return {
    identify: OverrideSymbol,
    schemeKey,
    overrideScheme,
  } as OverrideConfig<SchemeKey, Scheme>
}
