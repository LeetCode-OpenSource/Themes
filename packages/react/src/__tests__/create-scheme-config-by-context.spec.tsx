import * as React from 'react'
import { SchemeConfig } from '@themes/scheme'

import { combine, createSchemeConfigByContext } from '../'
import { create } from 'react-test-renderer'

describe('create-scheme-config-by-context', () => {
  type SizeType = 'sm' | 'lg'
  type SizeScheme = { paddingLeft: number }
  const IndentLevelContext = React.createContext(0)

  const sizeScheme: SchemeConfig<SizeType, SizeScheme> = createSchemeConfigByContext<
    number,
    SizeType,
    SizeScheme
  >(IndentLevelContext, {
    defaultScheme: 'sm',

    schemes: {
      sm: (indentLevel) => ({ paddingLeft: indentLevel * 10 }),
      lg: (indentLevel) => ({ paddingLeft: indentLevel * 15 }),
    },
  })

  const BaseParagraph = ({ sizeScheme }: { sizeScheme: SizeScheme }) => (
    <p style={{ paddingLeft: sizeScheme.paddingLeft }}>content</p>
  )

  it('should make scheme config able to response context change with default sizeScheme', () => {
    const Paragraph = combine({ sizeScheme }, BaseParagraph)
    const testRenderer = create(
      <IndentLevelContext.Provider value={1}>
        <Paragraph />
      </IndentLevelContext.Provider>,
    )

    expect(testRenderer.root.findByType('p').props.style).toEqual({
      paddingLeft: 10,
    })
  })

  it('should make scheme config able to response context change with specific sizeScheme', () => {
    const Paragraph = combine({ sizeScheme }, BaseParagraph)
    const testRenderer = create(
      <IndentLevelContext.Provider value={2}>
        <Paragraph sizeScheme="lg" />
      </IndentLevelContext.Provider>,
    )

    expect(testRenderer.root.findByType('p').props.style).toEqual({
      paddingLeft: 30,
    })
  })
})
