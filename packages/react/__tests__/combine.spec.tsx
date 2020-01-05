import * as React from 'react'
import { create } from 'react-test-renderer'

import { override, SchemeConfig } from '@themes/scheme'
import { combine } from '@themes/react'

describe('combine', () => {
  type ButtonType = 'normal' | 'primary'
  type ButtonColorScheme = { textColor: string; backgroundColor?: string }

  const colorScheme: SchemeConfig<ButtonType, ButtonColorScheme> = {
    defaultScheme: 'normal',
    schemes: {
      normal: { textColor: '#000', backgroundColor: '#fff' },
      primary: { textColor: '#fff', backgroundColor: '#000' },
    },
  }

  const BaseButton = ({ colorScheme }: { colorScheme: ButtonColorScheme }) => (
    <button style={{ color: colorScheme.textColor, backgroundColor: colorScheme.backgroundColor }}>
      Button
    </button>
  )

  it('should work properly while `colorScheme` is undefined', () => {
    const Button = combine({ colorScheme }, BaseButton)
    const testRenderer = create(<Button />)

    expect(testRenderer.root.findByType('button').props.style).toEqual({
      backgroundColor: '#fff',
      color: '#000',
    })
  })

  it('should work properly while `colorScheme` is specific `ButtonType`', () => {
    const Button = combine({ colorScheme }, BaseButton)
    const testRenderer = create(<Button colorScheme="primary" />)

    expect(testRenderer.root.findByType('button').props.style).toEqual({
      backgroundColor: '#000',
      color: '#fff',
    })
  })

  it('should work properly while `colorScheme` is object type of override scheme', () => {
    const Button = combine({ colorScheme }, BaseButton)
    const testRenderer = create(
      <Button colorScheme={override('primary', { backgroundColor: '#f00' })} />,
    )

    expect(testRenderer.root.findByType('button').props.style).toEqual({
      backgroundColor: '#f00',
      color: '#fff',
    })
  })

  it('should work properly while `colorScheme` is function type of override scheme', () => {
    const Button = combine({ colorScheme }, BaseButton)
    const testRenderer = create(
      <Button
        colorScheme={override('primary', ({ backgroundColor }) => ({
          backgroundColor: backgroundColor + 'fff',
        }))}
      />,
    )

    expect(testRenderer.root.findByType('button').props.style).toEqual({
      backgroundColor: '#000fff',
      color: '#fff',
    })
  })

  describe('combine the combined component', () => {
    const colorScheme2: SchemeConfig<'normal2' | 'primary2', ButtonColorScheme> = {
      defaultScheme: 'normal2',

      schemes: {
        normal2: { textColor: '#00f', backgroundColor: '#ff0' },
        primary2: { textColor: '#ff0', backgroundColor: '#00f' },
      },
    }

    it('should able to combine the combined component', () => {
      const ButtonOne = combine({ colorScheme }, BaseButton)
      const ButtonTwo = combine({ colorScheme: colorScheme2 }, ButtonOne)

      const testRenderer = create(<ButtonTwo />)

      expect(testRenderer.root.findByType('button').props.style).toEqual({
        backgroundColor: '#ff0',
        color: '#00f',
      })
    })
  })
})
