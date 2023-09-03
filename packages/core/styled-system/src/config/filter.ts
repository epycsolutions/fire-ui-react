import * as CSS from 'csstype'
import { Config } from '../utils/prop-config'
import { Length, Token, t, transforms } from '../utils'

export const filter: Config = {
    filter: { transform: transforms.filter },
    blur: t.blur('--fire-blur'),
    brightness: t.propT('--fire-brightness', transforms.brightness),
    contrast: t.propT('--fire-contrast', transforms.contrast),
    hueRotate: t.degreeT('--fire-hue-rotate'),
    invert: t.propT('--fire-invert', transforms.invert),
    saturate: t.propT('--fire-saturate', transforms.saturate),
    dropShadow: t.propT('--fire-drop-shadow', transforms.dropShadow),
    backdropFilter: { transform: transforms.backdropFilter },
    backdropBlur: t.blur('--fire-backdrop-blur'),
    backdropBrightness: t.propT(
        '--fire-backdrop-brightness',
        transforms.brightness,
    ),
    backdropContrast: t.propT('--fire-backdrop-contrast', transforms.contrast),
    backdropHueRotate: t.degreeT('--fire-backdrop-hue-rotate'),
    backdropInvert: t.propT('--fire-backdrop-invert', transforms.invert),
    backdropSaturate: t.propT('--fire-backdrop-saturate', transforms.saturate),
}

export interface FilterProps {
    /**
     * The CSS `filter` property. When set to `auto`, you allow
     * fire UI to define the color based on the filter style props
     * (`blur`, `saturate`, etc.)
     */
    filter?: Token<CSS.Property.Filter | 'auto'>
    /**
     * Sets the blur filter value of an element.
     * Value is assigned to `--fire-filter` css variable
     */
    blur?: Token<{}, 'blur'>
    /**
     * Sets the brightness filter value of an element.
     * Value is assigned to `--fire-brightness` css variable
     */
    brightness?: Token<Length>
    /**
     * Sets the contrast filter value of an element.
     * Value is assigned to `--fire-contrast` css variable
     */
    contrast?: Token<Length>
    /**
     * Sets the hue-rotate filter value of an element.
     * Value is assigned to `--fire-hue-rotate` css variable
     */
    hueRotate?: Token<Length>
    /**
     * Sets the invert filter value of an element.
     * Value is assigned to `--fire-invert` css variable
     */
    invert?: Token<Length>
    /**
     * Sets the saturation filter value of an element.
     * Value is assigned to `--fire-saturate` css variable
     */
    saturate?: Token<Length>
    /**
     * Sets the drop-shadow filter value of an element.
     * Value is assigned to `--fire-drop-shadow` css variable
     */
    dropShadow?: Token<CSS.Property.BoxShadow, 'shadows'>
    /**
     * The CSS `backdrop-filter` property. When set to `auto`, you allow
     * fire UI to define the color based on the backdrop filter style props
     * (`backdropBlur`, `backdropSaturate`, etc.)
     */
    backdropFilter?: Token<CSS.Property.BackdropFilter | 'auto'>
    /**
     * Sets the backdrop-blur filter value of an element.
     * Value is assigned to `--fire-backdrop-blur` css variable
     */
    backdropBlur?: Token<{}, 'blur'>
    /**
     * Sets the backdrop-brightness filter value of an element.
     * Value is assigned to `--fire-backdrop-brightness` css variable
     */
    backdropBrightness?: Token<Length>
    /**
     * Sets the backdrop-contrast filter value of an element.
     * Value is assigned to `--fire-backdrop-contrast` css variable
     */
    backdropContrast?: Token<Length>
    /**
     * Sets the backdrop-hue-rotate filter value of an element.
     * Value is assigned to `--fire-backdrop-hue-rotate` css variable
     */
    backdropHueRotate?: Token<Length>
    /**
     * Sets the backdrop-invert filter value of an element.
     * Value is assigned to `--fire-backdrop-invert` css variable
     */
    backdropInvert?: Token<Length>
    /**
     * Sets the backdrop-saturate filter value of an element.
     * Value is assigned to `--fire-backdrop-saturate` css variable
     */
    backdropSaturate?: Token<Length>
}
