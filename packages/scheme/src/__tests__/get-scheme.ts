import { getScheme, override, SchemeConfig } from '../'

describe('get-scheme', () => {
  type ButtonType = 'normal' | 'primary'
  type ButtonColorScheme = { textColor: string; backgroundColor: string }

  const colorScheme: SchemeConfig<ButtonType, ButtonColorScheme> = {
    defaultScheme: 'normal',
    schemes: {
      normal: { textColor: '#000', backgroundColor: '#fff' },
      primary: { textColor: '#fff', backgroundColor: '#000' },
    },
  }

  it('should return default scheme if no scheme key', () => {
    expect(getScheme(colorScheme)).toEqual(colorScheme.schemes.normal)
  })

  it('should return specify scheme if has scheme key', () => {
    expect(getScheme(colorScheme, 'primary')).toEqual(colorScheme.schemes.primary)
  })

  it('should return overrided scheme if scheme key is an overrider config with object type overrider scheme', () => {
    expect(getScheme(colorScheme, override('primary', { textColor: 'red' }))).toEqual({
      ...colorScheme.schemes.primary,
      textColor: 'red',
    })
  })

  it('should return overrided scheme if scheme key is an overrider config with function type overrider scheme', () => {
    expect(
      getScheme(
        colorScheme,
        override('normal', ({ textColor }) => ({ textColor: textColor + 'fff' })),
      ),
    ).toEqual({
      ...colorScheme.schemes.normal,
      textColor: '#000fff',
    })
  })
})
