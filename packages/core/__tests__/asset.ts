import { Asset } from '../src'

describe('Asset', () => {
  describe('define', function() {
    it('should able define theme', () => {
      const borderColor = new Asset('#FFFFFF')

      borderColor.define({ theme: 'dark', scheme: '#000000' })

      expect(borderColor.hasTheme('dark')).toBeTruthy()
      expect(borderColor.getSchemeForTheme('dark')).toBe('#000000')
    })
  })

  describe('hasTheme', function() {
    const borderColor = new Asset('#FFFFFF')

    borderColor.define({ theme: 'dark', scheme: '#000000' })

    it('should return true if theme is defined', () => {
      expect(borderColor.hasTheme('dark')).toBeTruthy()
    })

    it('should return false if theme is not defined', () => {
      expect(borderColor.hasTheme('light')).toBeFalsy()
    })
  })

  describe('removeTheme', function() {
    it('should return true if the theme existed and has been removed', () => {
      const borderColor = new Asset('#FFFFFF')

      borderColor.define({ theme: 'dark', scheme: '#000000' })

      expect(borderColor.removeTheme('dark')).toBeTruthy()
      expect(borderColor.hasTheme('dark')).toBeFalsy()
    })

    it('should return false if the theme does not exist', () => {
      const borderColor = new Asset('#FFFFFF')

      expect(borderColor.hasTheme('dark')).toBeFalsy()
      expect(borderColor.removeTheme('dark')).toBeFalsy()
    })
  })

  describe('removeAllThemes', function() {
    it('should remove all defined themes', () => {
      const borderColor = new Asset('#FFFFFF')

      borderColor.define({ theme: 'dark', scheme: '#000000' })
      borderColor.define({ theme: 'grey', scheme: '#9D9D9D' })
      borderColor.removeAllThemes()

      expect(borderColor.hasTheme('dark')).toBeFalsy()
      expect(borderColor.hasTheme('grey')).toBeFalsy()
    })
  })

  describe('getSchemeForTheme', () => {
    let consoleWarnSpy: jest.SpyInstance
    let borderColor: Asset<string, string>

    beforeEach(function() {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      borderColor = new Asset('#FFFFFF')
      borderColor.define({ theme: 'dark', scheme: '#000000' })
    })

    afterEach(function() {
      consoleWarnSpy.mockRestore()
    })

    it('should return default scheme if no specific theme', () => {
      expect(borderColor.getSchemeForTheme()).toBe('#FFFFFF')
    })

    it('should return corresponding scheme if has specific theme', () => {
      expect(borderColor.getSchemeForTheme('dark')).toBe('#000000')
    })

    it('should return default scheme if use invalid theme', () => {
      expect(borderColor.getSchemeForTheme('grey')).toBe('#FFFFFF')
    })

    it('should warning if use invalid theme', () => {
      borderColor.getSchemeForTheme('grey')
      expect(consoleWarnSpy.mock.calls.length).toBe(1)
    })
  })
})
