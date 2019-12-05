export type SchemeKeyType = string

export const OverrideSymbol = Symbol('override scheme')

export type SchemeConfig<Key extends SchemeKeyType, Scheme> = Readonly<{
  defaultScheme: Key
  schemes: Readonly<Record<Key, Scheme | (() => Scheme)>>
}>

export type OverrideScheme<SchemeKey extends SchemeKeyType, Scheme> =
  | Partial<Scheme>
  | ((currentScheme: Scheme, currentSchemeKey: SchemeKey) => Partial<Scheme>)

type DefaultOverrideConfig<SchemeKey extends SchemeKeyType, Scheme> = {
  identify: typeof OverrideSymbol
  schemeKey: SchemeKey
  overrideScheme: OverrideScheme<SchemeKey, Scheme>
}

export type OverrideConfig<SchemeKey extends SchemeKeyType, Scheme> = SchemeKey extends infer SK
  ? SK extends string
    ? Scheme extends infer S
      ? DefaultOverrideConfig<SK, S>
      : DefaultOverrideConfig<SK, Scheme>
    : DefaultOverrideConfig<SchemeKey, Scheme>
  : DefaultOverrideConfig<SchemeKey, Scheme>

export type ValidSchemeKey<SchemeKey extends SchemeKeyType, Scheme> =
  | undefined
  | SchemeKey
  | OverrideConfig<SchemeKey, Scheme>
