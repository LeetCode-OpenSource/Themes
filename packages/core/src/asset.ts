import listify = require('listify')

export class Asset<Theme, Scheme> {
  private readonly themes = new Map<Theme, Scheme>()

  constructor(private readonly defaultScheme: Scheme) {}

  define({ theme, scheme }: { theme: Theme; scheme: Scheme }): void {
    this.themes.set(theme, scheme)
  }

  getSchemeForTheme(theme?: Theme): Scheme {
    if (theme !== undefined) {
      if (this.hasTheme(theme)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.themes.get(theme)!
      } else {
        console.warn(
          `There is no "${theme}" theme, ` +
            `only ${listify(Array.from(this.themes.entries()).map(([key]) => `"${key}"`))} at `,
          this,
        )
        return this.defaultScheme
      }
    } else {
      return this.defaultScheme
    }
  }

  hasTheme(theme: Theme): boolean {
    return this.themes.has(theme)
  }

  removeTheme(theme: Theme): boolean {
    return this.themes.delete(theme)
  }

  removeAllThemes(): void {
    this.themes.clear()
  }
}
