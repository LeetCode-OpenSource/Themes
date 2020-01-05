import * as React from 'react'
import { create } from 'react-test-renderer'

import { SchemeConfig } from '@themes/scheme'
import { combine, createContextSchemeConfig, useContextSchemeConfig } from '@themes/react'

describe('context-scheme-config', () => {
  type ColorType = 'dark' | 'light'
  type ColorScheme = { primary: string; secondary: string }

  const colorScheme: SchemeConfig<ColorType, ColorScheme> = {
    defaultScheme: 'light',
    schemes: {
      light: { primary: '#000', secondary: '#fff' },
      dark: { primary: '#fff', secondary: '#000' },
    },
  }

  const contextColorScheme = createContextSchemeConfig(colorScheme)

  describe('Component usage', () => {
    const Button = () => {
      const { primary, secondary } = useContextSchemeConfig(contextColorScheme)
      return <button style={{ color: primary, backgroundColor: secondary }}>Button</button>
    }

    it('should able to get `colorScheme` by context', () => {
      const testRenderer = create(<Button />)

      expect(testRenderer.root.findByType('button').props.style).toEqual({
        backgroundColor: '#fff',
        color: '#000',
      })
    })

    it('should able to custom colorScheme by context', () => {
      const { Context } = contextColorScheme

      const testRenderer = create(
        <Context.Provider value="dark">
          <Button />
        </Context.Provider>,
      )

      expect(testRenderer.root.findByType('button').props.style).toEqual({
        backgroundColor: '#000',
        color: '#fff',
      })
    })
  })

  describe('transform', () => {
    type ButtonType = 'normal' | 'primary'
    type ButtonColorScheme = { borderColor: string }

    const buttonColorScheme = contextColorScheme.transform<ButtonType, ButtonColorScheme>({
      defaultScheme: 'normal',

      schemes: {
        normal: ({ secondary }) => ({
          borderColor: secondary + '123',
        }),

        primary: ({ primary }) => ({
          borderColor: primary + '456',
        }),
      },
    })

    const BaseBorderButton = ({ colorScheme }: { colorScheme: ButtonColorScheme }) => {
      return <button style={{ border: `1px solid ${colorScheme.borderColor}` }}>Button</button>
    }

    describe('`combine` without Provider', () => {
      it('should work properly with default key', () => {
        const BorderButton = combine({ colorScheme: buttonColorScheme }, BaseBorderButton)
        const testRenderer = create(<BorderButton />)

        expect(testRenderer.root.findByType('button').props.style).toEqual({
          border: `1px solid #fff123`,
        })
      })

      it('should work properly with specific colorScheme key', () => {
        const BorderButton = combine({ colorScheme: buttonColorScheme }, BaseBorderButton)
        const testRenderer = create(<BorderButton colorScheme="primary" />)

        expect(testRenderer.root.findByType('button').props.style).toEqual({
          border: `1px solid #000456`,
        })
      })
    })

    describe('`combine` with Provider', () => {
      const { Context } = contextColorScheme

      it('should work properly with default key', () => {
        const BorderButton = combine({ colorScheme: buttonColorScheme }, BaseBorderButton)
        const testRenderer = create(
          <Context.Provider value="dark">
            <BorderButton />
          </Context.Provider>,
        )

        expect(testRenderer.root.findByType('button').props.style).toEqual({
          border: `1px solid #000123`,
        })
      })

      it('should work properly with specific colorScheme key', () => {
        const BorderButton = combine({ colorScheme: buttonColorScheme }, BaseBorderButton)
        const testRenderer = create(
          <Context.Provider value="dark">
            <BorderButton colorScheme="primary" />
          </Context.Provider>,
        )

        expect(testRenderer.root.findByType('button').props.style).toEqual({
          border: `1px solid #fff456`,
        })
      })
    })
  })
})
