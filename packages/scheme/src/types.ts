export type SchemeKeyType = string

export type SchemeConfig<Key extends SchemeKeyType, Scheme> = Readonly<{
  defaultScheme: Key
  schemes: Readonly<Record<Key, Scheme | (() => Scheme)>>
}>

export const OverwriteSymbol = Symbol('overwrite scheme')

export type OverwriteScheme<SchemeKey extends SchemeKeyType, Scheme> =
  | Partial<Scheme>
  | ((currentScheme: Scheme, currentSchemeKey: SchemeKey) => Partial<Scheme>)

export interface OverwriteConfig<SchemeKey extends SchemeKeyType, Scheme> {
  identify: typeof OverwriteSymbol
  schemeKey?: SchemeKey
  overwriteScheme: OverwriteScheme<SchemeKey, Scheme>
}
