import * as React from 'react'
import { getAssetScheme, AssetThemesType } from '@themes/asset'

import { ContextAsset } from './types'

export function useContextAsset<Themes extends AssetThemesType, Scheme>(
  asset: ContextAsset<Themes, Scheme>,
) {
  const theme = React.useContext(asset.Context)
  return getAssetScheme(asset, theme)
}
