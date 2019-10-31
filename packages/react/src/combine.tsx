import * as React from 'react'
import { getScheme, SchemeConfig, ValidSchemeKey } from '@themes/scheme'

type CombinedComponentProps<Props, Config extends CombineConfig<Props>> = Omit<
  Props,
  keyof Config
> &
  Partial<
    {
      [Key in keyof Config]: Key extends keyof Props
        ? Config[Key] extends SchemeConfig<infer SchemeKey, infer Scheme>
          ? ValidSchemeKey<SchemeKey, Scheme>
          : never
        : never
    }
  >

type CombineConfig<Props> = {
  [Key in keyof Props]?: SchemeConfig<any, Props[Key]>
}

export function combine<Props, Config extends CombineConfig<Props> = CombineConfig<Props>>(
  config: Config,
  Component: React.ComponentType<Props>,
): React.FunctionComponent<CombinedComponentProps<Props, Config>> {
  type ConfigKey = Extract<keyof Config, keyof Props>
  const configKeys = Object.keys(config) as Array<ConfigKey>

  return React.forwardRef<CombinedComponentProps<Config, Props>, any>((props, ref) => {
    function getSchemeConfig(key: ConfigKey) {
      return config[key] as SchemeConfig<any, any>
    }

    function getSchemeKey(key: ConfigKey) {
      return props[key]
    }

    const finalProps = {} as Props

    configKeys.forEach((key) => {
      finalProps[key] = getScheme(getSchemeConfig(key), getSchemeKey(key))
    })

    return <Component {...props} {...finalProps} ref={ref} />
  })
}
