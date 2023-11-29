import { extendTheme, withDefaultSize } from '../src'

describe('Theme extension: withDefaultSize', () => {
    it('should set a defaultSize', () => {
        const customTheme = extendTheme(withDefaultSize({ size: 'veryLarge' }))

        expect(customTheme.components.Button.defaultProps.size).toBe('veryLarge')
    })

    it('should allow overrides only mentioned components', () => {
        const customTheme = extendTheme(
            withDefaultSize({
                size: 'veryLarge',
                components: ['Button', 'Badge']
            })
        )

        expect(customTheme.components.Button.defaultProps.size).toBe('veryLarge')
        expect(customTheme.components.Badge.defaultProps.size).toBe('veryLarge')
        
        expect(customTheme.components.Alert.defaultProps.size).not.toBe('veryLarge')
    })
})