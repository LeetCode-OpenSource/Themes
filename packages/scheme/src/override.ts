import {
  OverrideSymbol as identify,
  OverrideScheme,
  OverrideConfig,
  SchemeKeyType,
  SchemeType,
} from './types'

export function override<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType,
  UserScheme extends Partial<Scheme> = Partial<Scheme>
>(schemeKey: SchemeKey, overrideScheme: OverrideScheme<Scheme, UserScheme>) {
  return {
    identify,
    schemeKey,
    overrideScheme,
  } as OverrideConfig<SchemeKey, Scheme, UserScheme>
}
