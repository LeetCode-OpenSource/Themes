import { OverrideSymbol as identify, OverrideScheme, OverrideConfig, SchemeKeyType } from './types'

export function override<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey: SchemeKey,
  overrideScheme: OverrideScheme<SchemeKey, Scheme>,
) {
  return {
    identify,
    schemeKey,
    overrideScheme,
  } as OverrideConfig<SchemeKey, Scheme>
}
