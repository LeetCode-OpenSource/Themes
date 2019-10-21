import * as React from 'react'
import { getScheme, SchemeConfig, SchemeKeyType } from '@themes/scheme'

type CombinedProps<Config, Props> = Omit<Props, keyof Config> &
  {
    [Key in keyof Config]: Config[Key] extends SchemeConfig<infer SchemeKey, any>
      ? SchemeKey
      : never
  }

type CombineResult<Config, Props> = React.FunctionComponent<CombinedProps<Config, Props>>

type ConfigType = { [propName: string]: SchemeConfig<any, any> }

export function combine<
  Config extends ConfigType,
  Props extends {
    [Key in keyof Config]: Config[Key] extends SchemeConfig<any, infer S>
      ? S extends () => infer SS
        ? SS
        : S
      : never
  }
>(config: Config, Component: React.ComponentType<Props>): CombineResult<Config, Props> {
  type ConfigKey = Extract<keyof Config, keyof Props>
  const configKeys = Object.keys(config) as Array<ConfigKey>

  return function CombinedComponent(props: CombinedProps<Config, Props>) {
    function getSchemeConfig(key: ConfigKey): SchemeConfig<any, any> {
      return config[key]
    }

    function getSchemeKey(key: ConfigKey): SchemeKeyType {
      return props[key]
    }

    const finalProps = {} as Props

    configKeys.forEach((key) => {
      finalProps[key] = getScheme(getSchemeConfig(key), getSchemeKey(key))
    })

    return <Component {...props} {...finalProps} />
  }
}
