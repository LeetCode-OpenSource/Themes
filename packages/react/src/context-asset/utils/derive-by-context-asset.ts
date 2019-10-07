import { Asset, AssetThemesType } from '@themes/asset'

import { ContextAsset } from '../types'
import { useContextAsset } from '../use-context-asset'

export function deriveByContextAsset<
  ContextAssetThemes extends AssetThemesType,
  ContextAssetScheme,
  Themes extends AssetThemesType,
  Scheme
>(
  contextAsset: ContextAsset<ContextAssetThemes, ContextAssetScheme>,
  factoryAsset: Asset<Themes, (context: ContextAssetScheme) => Scheme>,
) {
  const themes = Object.keys(factoryAsset.schemes) as Themes[]

  return {
    defaultTheme: factoryAsset.defaultTheme,
    schemes: themes.reduce(
      (schemes, theme) => ({
        ...schemes,
        [theme]: () => {
          const scheme = useContextAsset(contextAsset) as ContextAssetScheme
          return factoryAsset.schemes[theme](scheme)
        },
      }),
      {},
    ),
  } as Asset<Themes, () => Scheme>
}
