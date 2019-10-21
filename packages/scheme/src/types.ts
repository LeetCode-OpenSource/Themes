export type SchemeKeyType = string

export type SchemeConfig<Key extends SchemeKeyType, Scheme> = Readonly<{
  defaultScheme: Key
  schemes: Readonly<Record<Key, Scheme | (() => Scheme)>>
}>
