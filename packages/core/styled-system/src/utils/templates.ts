/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
const transformTemplate = [
    'rotate(var(--fire-rotate, 0))',
    'scaleX(var(--fire-scale-x, 1))',
    'scaleY(var(--fire-scale-y, 1))',
    'skewX(var(--fire-skew-x, 0))',
    'skewY(var(--fire-skew-y, 0))',
]

export function getTransformTemplate() {
    return [
        'translateX(var(--fire-translate-x, 0))',
        'translateY(var(--fire-translate-y, 0))',
        ...transformTemplate,
    ].join(' ')
}

export function getTransformGpuTemplate() {
    return [
        'translate3d(var(--fire-translate-x, 0), var(--fire-translate-y, 0), 0)',
        ...transformTemplate,
    ].join(' ')
}

export const filterTemplate = {
    '--fire-blur': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-brightness': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-contrast': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-grayscale': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-hue-rotate': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-invert': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-saturate': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-sepia': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-drop-shadow': 'var(--fire-empty,/*!*/ /*!*/)',
    filter: [
        'var(--fire-blur)',
        'var(--fire-brightness)',
        'var(--fire-contrast)',
        'var(--fire-grayscale)',
        'var(--fire-hue-rotate)',
        'var(--fire-invert)',
        'var(--fire-saturate)',
        'var(--fire-sepia)',
        'var(--fire-drop-shadow)',
    ].join(' '),
}

export const backdropFilterTemplate = {
    backdropFilter: [
        'var(--fire-backdrop-blur)',
        'var(--fire-backdrop-brightness)',
        'var(--fire-backdrop-contrast)',
        'var(--fire-backdrop-grayscale)',
        'var(--fire-backdrop-hue-rotate)',
        'var(--fire-backdrop-invert)',
        'var(--fire-backdrop-opacity)',
        'var(--fire-backdrop-saturate)',
        'var(--fire-backdrop-sepia)',
    ].join(' '),
    '--fire-backdrop-blur': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-brightness': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-contrast': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-grayscale': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-hue-rotate': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-invert': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-opacity': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-saturate': 'var(--fire-empty,/*!*/ /*!*/)',
    '--fire-backdrop-sepia': 'var(--fire-empty,/*!*/ /*!*/)',
}

export function getRingTemplate(value: any) {
    return {
        '--fire-ring-offset-shadow': `var(--fire-ring-inset) 0 0 0 var(--fire-ring-offset-width) var(--fire-ring-offset-color)`,
        '--fire-ring-shadow': `var(--fire-ring-inset) 0 0 0 calc(var(--fire-ring-width) + var(--fire-ring-offset-width)) var(--fire-ring-color)`,
        '--fire-ring-width': value,
        boxShadow: [
            `var(--fire-ring-offset-shadow)`,
            `var(--fire-ring-shadow)`,
            `var(--fire-shadow, 0 0 #0000)`,
        ].join(', '),
    }
}

export const flexDirectionTemplate = {
    'row-reverse': {
        space: '--fire-space-x-reverse',
        divide: '--fire-divide-x-reverse',
    },
    'column-reverse': {
        space: '--fire-space-y-reverse',
        divide: '--fire-divide-y-reverse',
    },
}
