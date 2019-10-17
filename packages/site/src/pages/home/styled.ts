import styled from '@emotion/styled'

import { ColorsScheme } from '~/src/colors'

export const Container = styled.div<{}, ColorsScheme>(({ theme }) => ({
  color: theme.primary,
  backgroundColor: theme.background,
}))
