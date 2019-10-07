import * as React from 'react'
import { Asset, AssetThemesType } from '@themes/asset'

import { ContextAsset } from './types'
import { deriveByContextAsset } from './utils/derive-by-context-asset'

function derive<T1 extends AssetThemesType, S1, T2 extends AssetThemesType, S2>(
  this: ContextAsset<T1, S1>,
  factoryAsset: Asset<T2, (context: S1) => S2>,
) {
  return deriveByContextAsset(this, factoryAsset)
}

export function createContextAsset<Themes extends AssetThemesType, Scheme>(
  asset: Asset<Themes, Scheme>,
): ContextAsset<Themes, Scheme> {
  return {
    ...asset,
    derive,
    Context: React.createContext(asset.defaultTheme),
  }
}
