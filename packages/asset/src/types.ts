export type AssetThemesType = keyof any

export type Asset<Themes extends AssetThemesType, Scheme> = Readonly<{
  defaultTheme: Themes
  schemes: Readonly<Record<Themes, Scheme>>
}>

export type AssetTheme<A> = A extends Asset<infer Theme, infer Scheme>
  ? Scheme extends () => any
    ? Theme
    : Theme
  : never

export type AssetScheme<A> = A extends Asset<any, infer Scheme>
  ? Scheme extends () => infer RScheme
    ? RScheme
    : Scheme
  : never
