import * as React from 'react'
import { getScheme, SchemeKeyType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'

export function useContextSchemeConfig<SchemeKey extends SchemeKeyType, Scheme>(
  schemeConfig: ContextSchemeConfig<SchemeKey, Scheme>,
) {
  const theme = React.useContext(schemeConfig.Context)
  return getScheme(schemeConfig, theme)
}
