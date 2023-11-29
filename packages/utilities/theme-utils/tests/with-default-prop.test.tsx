import { extendTheme, withDefaultProps } from '../src'

describe('Theme extension: withDefaultProps', () => {
    it('should set a defaultProps', () => {
        const customTheme = extendTheme(
            withDefaultProps({
                defaultProps: {
                    colorScheme: 'brand',
                    size: 'veryLarge',
                    variant: 'my-custom-variant'
                }
            })
        )

        expect(customTheme.components.Button.defaultProps.colorScheme).toBe('brand')
        expect(customTheme.components.Button.defaultProps.size).toBe('veryLarge')
        expect(customTheme.components.Button.defaultProps.variant).toBe(
            'my-custom-variant'
        )
    })

    it('should allow overrides only mentioned components', () => {
        const customTheme = extendTheme(
            withDefaultProps({
                defaultProps: {
                    colorScheme: 'brand',
                    size: 'veryLarge',
                    variant: 'my-custom-variant'
                },
                components: ['Button', 'Badge']
            })
        )

        expect(customTheme.components.Button.defaultProps.colorScheme).toBe('brand')
        expect(customTheme.components.Button.defaultProps.size).toBe('veryLarge')
        expect(customTheme.components.Button.defaultProps.variant).toBe(
            'my-custom-variant'
        )

        expect(customTheme.components.Tabs.defaultProps.colorScheme).not.toBe(
            'brand'
        )

        expect(customTheme.components.Tabs.defaultProps.size).not.toBe('veryLarge')
        expect(customTheme.components.Tabs.defaultProps.variant).not.toBe(
            'my-custom-variant'
        )
    })
})