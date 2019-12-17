export type SchemeKeyType = string

export type SchemeType = object

export const OverrideSymbol = Symbol('override scheme')

export type SchemeConfig<Key extends SchemeKeyType, Scheme extends SchemeType> = Readonly<{
  defaultScheme: Key
  schemes: Record<Key, Scheme | (() => Scheme)>
}>

export type OverrideScheme<Scheme extends SchemeType> =
  | Partial<Scheme>
  | ((currentScheme: Scheme) => Partial<Scheme>)

type DefaultOverrideConfig<SchemeKey extends SchemeKeyType, Scheme extends SchemeType> = {
  identify: typeof OverrideSymbol
  schemeKey: SchemeKey
  overrideScheme: OverrideScheme<Scheme>
}

export type OverrideConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
> = SchemeKey extends infer SK
  ? SK extends SchemeKeyType
    ? Scheme extends infer S
      ? S extends SchemeType
        ? DefaultOverrideConfig<SK, S>
        : DefaultOverrideConfig<SK, Scheme>
      : DefaultOverrideConfig<SK, Scheme>
    : DefaultOverrideConfig<SchemeKey, Scheme>
  : DefaultOverrideConfig<SchemeKey, Scheme>

export type ValidSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType> =
  | undefined
  | SchemeKey
  | Scheme
  | OverrideConfig<SchemeKey, Scheme>

// Simply use Exclude<ValidSchemeKey<SchemeKey, Scheme>, Scheme> will cause `OverrideConfig` being excluded either.
export type ValidSchemeKeyWithoutScheme<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
> = undefined | SchemeKey | OverrideConfig<SchemeKey, Scheme>
