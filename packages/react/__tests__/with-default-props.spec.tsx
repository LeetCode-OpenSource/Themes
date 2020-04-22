import * as React from 'react'
import { create } from 'react-test-renderer'

import { withDefaultProps } from '@themes/react'

type ButtonProps = { content: string }

const Button = ({ content }: ButtonProps) => <button>{content}</button>

const DEFAULT_CONTENT = 'DEFAULT_CONTENT'

const ButtonWithDefaultContent = withDefaultProps(Button, { content: DEFAULT_CONTENT })

describe('with-default-props', () => {
  it(`should use default props to render if not exist`, () => {
    const testRenderer = create(<ButtonWithDefaultContent />)

    expect(testRenderer.root.findByType('button').children).toEqual([DEFAULT_CONTENT])
  })

  it(`should using specific props if exist`, () => {
    const testRenderer = create(<ButtonWithDefaultContent content="new content" />)

    expect(testRenderer.root.findByType('button').children).toEqual(['new content'])
  })
})
