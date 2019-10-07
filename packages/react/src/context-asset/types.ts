import * as React from 'react'
import { Asset, AssetThemesType } from '@themes/asset'

export type ContextAsset<Themes extends AssetThemesType, Schemes> = Readonly<
  Asset<Themes, Schemes> & {
    Context: React.Context<Themes>
    derive: <T extends AssetThemesType, S>(
      asset: Asset<T, (context: Schemes) => S>,
    ) => Asset<T, () => S>
  }
>
