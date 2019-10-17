export type SchemeKeyType = string

export type SchemeValueType = object

export type SchemeConfig<Key extends SchemeKeyType, Scheme extends SchemeValueType> = Readonly<{
  defaultScheme: Key
  schemes: Readonly<Record<Key, Scheme>>
}>

export type KeyOfScheme<A> = A extends SchemeConfig<infer Key, infer Scheme>
  ? Scheme extends object
    ? Key
    : Scheme extends () => object
    ? Key
    : never
  : never

export type ValueOfScheme<SC> = SC extends SchemeConfig<any, infer S>
  ? S extends () => infer SS
    ? SS extends object
      ? SS
      : never
    : S
  : never
