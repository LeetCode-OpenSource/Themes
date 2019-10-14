import { Asset, AssetScheme, AssetThemesType } from './types'

export function getAssetScheme<T extends AssetThemesType, S>(
  asset: Asset<T, S>,
  specificTheme: T = asset.defaultTheme,
): AssetScheme<Asset<T, S>> {
  const scheme = asset.schemes[specificTheme]
  return typeof scheme === 'function' ? scheme() : scheme
}
