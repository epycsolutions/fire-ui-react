import { Styles } from '@fire-ui/theme-tools'

export const styles: Styles = {
    global: {
        body: {
            fontFamily: 'body',
            color: 'fire-body-text',
            bg: 'fire-body-bg',
            transitionProperty: 'background-color',
            transitionDuration: 'normal',
            lineHeight: 'base'
        },
        '*::placeholder': {
            color: 'fire-placeholder-color'
        },
        '*, *::before, &::after': {
            borderColor: 'fire-border-color'
        }
    }
}