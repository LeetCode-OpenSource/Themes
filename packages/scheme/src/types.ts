export type SchemeKeyType = string

export type SchemeConfig<Key extends SchemeKeyType, Scheme> = Readonly<{
  defaultScheme: Key
  schemes: Readonly<Record<Key, Scheme | (() => Scheme)>>
}>

export const OverwriteSymbol = Symbol('overwrite scheme')

export type OverwriteScheme<SchemeKey extends SchemeKeyType, Scheme> =
  | Partial<Scheme>
  | ((currentScheme: Scheme, currentSchemeKey: SchemeKey) => Partial<Scheme>)

type DefaultOverwriteConfig<SchemeKey extends SchemeKeyType, Scheme> = {
  identify: typeof OverwriteSymbol
  schemeKey?: SchemeKey
  overwriteScheme: OverwriteScheme<SchemeKey, Scheme>
}

export type OverwriteConfig<SchemeKey extends SchemeKeyType, Scheme> = SchemeKey extends infer SK
  ? SK extends string
    ? Scheme extends infer S
      ? DefaultOverwriteConfig<SK, S>
      : DefaultOverwriteConfig<SK, Scheme>
    : DefaultOverwriteConfig<SchemeKey, Scheme>
  : DefaultOverwriteConfig<SchemeKey, Scheme>
