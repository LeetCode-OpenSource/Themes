import * as React from 'react'
import { getScheme, SchemeKeyType, SchemeValueType } from '@themes/scheme'

import { ContextSchemeConfig } from './types'

export function useContextSchemeConfig<
  SchemeKey extends SchemeKeyType,
  Scheme extends SchemeValueType
>(schemeConfig: ContextSchemeConfig<SchemeKey, Scheme>) {
  const theme = React.useContext(schemeConfig.Context)
  return getScheme(schemeConfig, theme)
}
