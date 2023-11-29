import { extendTheme, mergeThemeOverride, ThemeOverride } from '../src'

describe('Theme Extention', () => {
    it('should be backwards compatible', () => {
        const theme = extendTheme({
            colors: {
                brand: {
                    500: '#B4D455'
                }
            }
        })

        expect(Object.keys(theme.components).length).toBeGreaterThan(1)
        expect(theme.colors.brand[500]).toBe('#B4D455')
    })

    it('should allow userland extensions', () => {
        function withBrandColorExtension(colorName: string) {
            return (theme: ThemeOverride) =>
                mergeThemeOverride(theme, {
                    colors: {
                        brand: theme.colors![colorName]
                    }
                })
        }

        const customTheme = extendTheme(withBrandColorExtension('red'))
        expect(customTheme.colors.brand).toHaveProperty('500')
    })

    it('should use a custom base theme', () => {
        const customBaseTheme = {
            borders: {},
            breakpoints: {
                base: '0em' as const
            },
            colors: {},
            components: {},
            config: {},
            direction: 'ltr' as const,
            fonts: {},
            fontSizes: {},
            fontWeights: {},
            letterSpacings: {},
            lineHeights: {},
            radii: {},
            shadows: {},
            sizes: {},
            space: {},
            styles: {},
            transition: {
                duration: {},
                easing: {},
                property: {}
            },
            zIndices: {}
        }

        const customTheme = extendTheme(
            {
                colors: {
                    brand: {
                        500: '#B4D455'
                    }
                }
            },
            customBaseTheme
        )

        expect(customTheme.colors.brand).toHaveProperty('500')
        expect(Object.keys(customTheme.components)).toHaveLength(0)
    })
})