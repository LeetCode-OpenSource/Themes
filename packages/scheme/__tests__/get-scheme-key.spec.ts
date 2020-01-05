import { getSchemeKey, override, SchemeConfig } from '@themes/scheme'

describe('get-scheme-key', () => {
  type ButtonType = 'normal' | 'primary'
  type ButtonColorScheme = { textColor: string; backgroundColor: string }

  const colorScheme: SchemeConfig<ButtonType, ButtonColorScheme> = {
    defaultScheme: 'normal',
    schemes: {
      normal: { textColor: '#000', backgroundColor: '#fff' },
      primary: { textColor: '#fff', backgroundColor: '#000' },
    },
  }

  describe('with SchemeConfig', () => {
    it('should return default scheme key if `validSchemeKey` is `undefined`', () => {
      expect(getSchemeKey(undefined, colorScheme)).toEqual('normal')
    })

    it('should return specific scheme key if `validSchemeKey` is `SchemeKey`', () => {
      expect(getSchemeKey('primary', colorScheme)).toEqual('primary')
    })

    it('should return specific scheme key if `validSchemeKey` is `OverrideConfig`', () => {
      expect(getSchemeKey(override('primary', {}), colorScheme)).toEqual('primary')
    })

    it('should return undefined if `validSchemeKey` is `Scheme`', () => {
      const anotherScheme: ButtonColorScheme = { textColor: '#000', backgroundColor: '#fff' }
      expect(getSchemeKey(anotherScheme, colorScheme)).toBe(undefined)
    })
  })

  describe('without SchemeConfig', () => {
    it('should return undefined if `validSchemeKey` is `undefined`', () => {
      expect(getSchemeKey(undefined)).toEqual(undefined)
    })

    it('should return specific scheme key if `validSchemeKey` is `SchemeKey`', () => {
      expect(getSchemeKey('primary')).toEqual('primary')
    })

    it('should return specific scheme key if `validSchemeKey` is `OverrideConfig`', () => {
      expect(getSchemeKey(override('primary', {}))).toEqual('primary')
    })

    it('should return undefined if `validSchemeKey` is `Scheme`', () => {
      const anotherScheme: ButtonColorScheme = { textColor: '#000', backgroundColor: '#fff' }
      expect(getSchemeKey(anotherScheme)).toBe(undefined)
    })
  })
})
