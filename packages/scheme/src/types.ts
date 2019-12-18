export type SchemeKeyType = string

export type SchemeType = object

export const OverrideSymbol = Symbol('override scheme')

export type SchemeConfig<Key extends SchemeKeyType, Scheme extends SchemeType> = Readonly<{
  defaultScheme: Key
  schemes: Record<Key, Scheme | (() => Scheme)>
}>

type DefaultOverrideScheme<Scheme extends SchemeType, UserScheme extends Partial<Scheme>> =
  | UserScheme
  | ((currentScheme: Scheme) => UserScheme)

export type OverrideScheme<
  Scheme extends SchemeType,
  UserScheme extends Partial<Scheme>
> = Scheme extends infer S
  ? UserScheme extends infer US
    ? US extends Partial<S>
      ? S extends SchemeType
        ? DefaultOverrideScheme<S, US>
        : DefaultOverrideScheme<Scheme, UserScheme>
      : DefaultOverrideScheme<Scheme, UserScheme>
    : DefaultOverrideScheme<Scheme, UserScheme>
  : DefaultOverrideScheme<Scheme, UserScheme>

type DefaultOverrideConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType,
  UserScheme extends Partial<Scheme>
> = {
  identify: typeof OverrideSymbol
  schemeKey: SchemeKey
  overrideScheme: OverrideScheme<Scheme, UserScheme>
}

export type OverrideConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType,
  UserScheme extends Partial<Scheme> = Partial<Scheme>
> = SchemeKey extends infer K
  ? Scheme extends infer S
    ? UserScheme extends infer US
      ? US extends Partial<S>
        ? S extends SchemeType
          ? K extends SchemeKeyType
            ? DefaultOverrideConfig<K, S, US>
            : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>
          : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>
        : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>
      : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>
    : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>
  : DefaultOverrideConfig<SchemeKey, Scheme, UserScheme>

export type ValidSchemeKey<SchemeKey extends SchemeKeyType, Scheme extends SchemeType> =
  | undefined
  | SchemeKey
  | Scheme
  | OverrideConfig<SchemeKey, Scheme, Partial<Scheme>>

// Simply use Exclude<ValidSchemeKey<SchemeKey, Scheme>, Scheme> will cause `OverrideConfig` being excluded either.
// Because `Scheme` type is object, and `OverrideConfig` also an object type.
export type ValidSchemeKeyWithoutScheme<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeType
> = undefined | SchemeKey | OverrideConfig<SchemeKey, Scheme, Partial<Scheme>>
