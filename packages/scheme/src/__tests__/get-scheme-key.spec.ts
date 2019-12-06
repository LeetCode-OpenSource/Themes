import { getSchemeKey, override, SchemeConfig } from '../'

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

  it('should return default scheme key if `validSchemeKey` is `undefined`', () => {
    expect(getSchemeKey(colorScheme)).toEqual('normal')
  })

  it('should return specific scheme key if `validSchemeKey` is `SchemeKey`', () => {
    expect(getSchemeKey(colorScheme, 'primary')).toEqual('primary')
  })

  it('should return specific scheme key if `validSchemeKey` is `OverrideConfig`', () => {
    expect(getSchemeKey(colorScheme, override('primary', {}))).toEqual('primary')
  })

  it('should return undefined if `validSchemeKey` is `Scheme`', () => {
    const anotherScheme: ButtonColorScheme = { textColor: '#000', backgroundColor: '#fff' }
    expect(getSchemeKey(colorScheme, anotherScheme)).toBe(undefined)
  })
})
