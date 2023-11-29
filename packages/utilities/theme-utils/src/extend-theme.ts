import {
    theme,
    baseTheme,
    FireTheme,
    isFireTheme,
    Theme
} from '@fire-ui/theme'
import mergeWith from 'lodash.mergewith'

type CloneKey<Target, Key> = Key extends keyof Target ? Target[Key] : unknown

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Represents a loose but specific type for the theme override.
 * It provides autocomplete hints for extending the theme, but leaves room
 * for adding properties.
 */
type DeepThemeExtension<BaseTheme, ThemeType> = {
    [Key in keyof BaseTheme]?: BaseTheme[Key] extends (...args: any[]) => any
        ? DeepThemeExtension<
            DeepPartial<ReturnType<BaseTheme[Key]>>,
            CloneKey<ThemeType, Key>
          >
        : BaseTheme[Key] extends Array<any>
        ? CloneKey<ThemeType, Key>
        : BaseTheme[Key] extends object
        ? DeepThemeExtension<DeepPartial<BaseTheme[Key]>, CloneKey<ThemeType, Key>>
        : CloneKey<ThemeType, Key>
}

export declare type ThemeOverride<BaseTheme = Theme> =
    DeepPartial<FireTheme> &
    DeepThemeExtension<BaseTheme, FireTheme> &
    Record<string, any>

export type ThemeExtension<Override extends ThemeOverride = ThemeOverride> = (
    themeOverride: Override
) => Override

type AnyFunction<T = any> = (...args: T[]) => any

export type BaseThemeWithExtensions<
    BaseTheme extends FireTheme,
    Extensions extends readonly [...any],
> = BaseTheme &
    (Extensions extends [infer L, ...infer R]
        ? L extends AnyFunction
          ? ReturnType<L> & BaseThemeWithExtensions<BaseTheme, R>
          : L & BaseThemeWithExtensions<BaseTheme, R>
    : Extensions)

/**
 * NOTE: This got too complex to manage!
 * We'll re-evaluate this API in the future releases.
 * 
 * Function to override to customize the FireUI theme conveniently.
 * First extension overrides the baseTheme and following extensions override the precending extensions.
 * 
 * @example:
 * import { theme as baseTheme, extendsTheme, withDefaultColorScheme } from '@fire-ui/react'
 * 
 * const customTheme = extendTheme(
 *      {
 *          colors: {
 *              brand: {
 *                  500: '#55D464'
 *              }
 *          }
 *      },
 *      withDefaultColorScheme({ colorScheme: 'red' }),
 *      baseTheme // optional
 * )
 */

function isFunction<T extends Function = Function>(value: any): value is T {
    return typeof value === 'function'
}

function pipe<R>(...fns: Array<(a: R) => R>) {
    return (v: R) => fns.reduce((a, b) => b(a), v)
}

const createExtendTheme = (theme: Record<string, any>) => {
    return function extendTheme(
        ...extensions: Array<
            | Record<string, any>
            | ((theme: Record<string, any>) => Record<string, any>)
        >
    ): Record<string, any> {
        let overrides = [...extensions]
        let activeTheme = extensions[extensions.length - 1]

        if(
            isFireTheme(activeTheme) &&
            overrides.length > 1
        ) {
            overrides = overrides.slice(0, overrides.length - 1)
        } else {
            activeTheme = theme
        }

        return pipe(
            ...overrides.map(
                (extension) => (prevTheme: any) =>
                    isFunction(extension)
                        ? (extension as any)(prevTheme)
                        : mergeThemeOverride(prevTheme, extension)
            )
        )(activeTheme)
    }
}

export const extendTheme = createExtendTheme(theme)
export const extendBaseTheme = createExtendTheme(baseTheme)

export function mergeThemeOverride(...overrides: any[]): any {
    return mergeWith({}, ...overrides, mergeThemeCustomizer)
}

function mergeThemeCustomizer(
    source: unknown,
    override: unknown,
    key: string,
    object: any
) {
    if(
        (isFunction(source) || isFunction(override)) &&
        Object.prototype.hasOwnProperty.call(object, key)
    ) {
        return (...args: unknown[]) => {
            const sourceValue = isFunction(source) ? source(...args) : source
            const overrideValue = isFunction(override) ? override(...args) : override

            return mergeWith({}, sourceValue, overrideValue, mergeThemeCustomizer)
        }
    }

    // fallback to default behaviour
    return undefined
}