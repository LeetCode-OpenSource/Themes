import * as React from 'react'
import { getScheme, SchemeConfig, ValidSchemeKey } from '@themes/scheme'

type CombinedComponentProps<Props, Config extends CombineConfig<Props>> = Omit<
  Props,
  keyof Config
> &
  {
    [Key in keyof Config]?: Key extends keyof Props
      ? Config[Key] extends SchemeConfig<infer SchemeKey, infer Scheme>
        ? ValidSchemeKey<SchemeKey, Scheme>
        : never
      : never
  }

type CombineConfig<Props> = {
  [Key in keyof Props]?: Props[Key] extends object ? SchemeConfig<any, Props[Key]> : never
}

export function combine<Props, Config extends CombineConfig<any>>(
  config: Config,
  Component: React.ComponentType<Props>,
): React.FunctionComponent<CombinedComponentProps<Props, Config>> {
  type ConfigKey = Extract<keyof Config, keyof Props>
  const configKeys = Object.keys(config) as Array<ConfigKey>

  return React.forwardRef<CombinedComponentProps<Config, Props>, any>((props, ref) => {
    const getSchemeConfig = (key: ConfigKey) => config[key] as SchemeConfig<any, any>
    const getSchemeKey = (key: ConfigKey) => props[key]

    const finalProps = {} as Props

    configKeys.forEach((key) => {
      finalProps[key] = getScheme(getSchemeConfig(key), getSchemeKey(key))
    })

    return <Component {...props} {...finalProps} ref={ref} />
  })
}
