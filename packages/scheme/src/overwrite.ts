import { OverwriteSymbol, OverwriteScheme, OverwriteConfig, SchemeKeyType } from './types'

export function overwrite<SchemeKey extends SchemeKeyType, Scheme>(
  schemeKey: SchemeKey,
  overwriteScheme: OverwriteScheme<Scheme>,
): OverwriteConfig<SchemeKey, Scheme> {
  return {
    identify: OverwriteSymbol,
    schemeKey,
    overwriteScheme,
  }
}
