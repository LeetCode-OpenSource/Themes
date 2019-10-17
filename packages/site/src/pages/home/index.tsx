import * as React from 'react'

import { Container } from './styled'

import { Button } from '~/src/components'

export function Home() {
  return (
    <Container>
      <h1>home</h1>
      <Button size="sm" theme="primary">
        Primary Button (sm)
      </Button>
      <Button size="sm" theme="danger">
        Danger Button (lg)
      </Button>
    </Container>
  )
}
