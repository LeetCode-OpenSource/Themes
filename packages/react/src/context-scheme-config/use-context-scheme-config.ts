import * as React from 'react'
import { getScheme, SchemeKeyType, SchemeType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'

export function useContextSchemeConfig<SchemeKey extends SchemeKeyType, Scheme extends SchemeType>(
  schemeConfig: ContextSchemeConfig<SchemeKey, Scheme>,
) {
  const theme = React.useContext(schemeConfig.Context)
  return getScheme(schemeConfig, theme)
}
