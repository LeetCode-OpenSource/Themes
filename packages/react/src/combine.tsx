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
          ? ValidSchemeKey<SchemeKey, Scheme> | Props[Key]
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
      const schemeKey = getSchemeKey(key)
      const scheme = getScheme(getSchemeConfig(key), schemeKey)

      if (scheme === undefined) {
        finalProps[key] = schemeKey as any
      } else {
        finalProps[key] = scheme
      }
    })

    return <Component {...props} {...finalProps} ref={ref} />
  })
}
