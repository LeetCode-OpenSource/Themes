import * as React from 'react'
import { getAssetScheme, Asset, AssetTheme, AssetScheme, AssetThemesType } from '@themes/asset'

type CombinedProps<Config, Props> = Omit<Props, keyof Config> &
  {
    [Key in keyof Config]: AssetTheme<Config[Key]>
  }

type CombineResult<Config, Props> = React.FunctionComponent<CombinedProps<Config, Props>>

type ConfigType = { [propName: string]: Asset<any, any> }

export function combine<
  Config extends ConfigType,
  Props extends {
    [Key in keyof Config]: AssetScheme<Config[Key]>
  }
>(config: Config, Component: React.ComponentType<Props>): CombineResult<Config, Props> {
  type ConfigKeys = Extract<keyof Config, keyof Props>
  const configKeys = Object.keys(config) as Array<ConfigKeys>

  return function CombinedComponent(props: CombinedProps<Config, Props>) {
    function getAsset(key: ConfigKeys): Asset<any, any> {
      return config[key]
    }

    function getTheme(key: ConfigKeys): AssetThemesType {
      return props[key]
    }

    const finalProps = configKeys.reduce(
      (result, key) => ({ ...result, [key]: getAssetScheme(getAsset(key), getTheme(key)) }),
      props as any,
    ) as Props

    return <Component {...finalProps} />
  }
}
