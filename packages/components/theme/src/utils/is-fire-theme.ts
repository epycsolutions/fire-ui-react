import { isObject } from '@fire-ui/shared-utils'
import type { FireTheme } from '../theme.types'

export const requireFireThemeKeys: (keyof FireTheme)[] = [
    'borders',
    'breakpoints',
    'colors',
    'components',
    'config',
    'direction',
    'fonts',
    'fontSizes',
    'fontWeights',
    'letterSpacings',
    'lineHeights',
    'radii',
    'shadows',
    'sizes',
    'space',
    'styles',
    'transition',
    'zIndices'
]

export function isFireTheme(unit: unknown): unit is FireTheme {
    if(!isObject(unit)) return false

    return requireFireThemeKeys.every((propertyName) =>
        Object.prototype.hasOwnProperty.call(unit, propertyName)
    )
}