import { AnalyzeBreakpointsReturn } from '@fire-ui/breakpoint-utils'
import { ThemeTypings } from '../theme.types'

export type ResponsiveArray<T> = Array<T | null>

export type ResponsiveObject<T> = Partial<
    Record<ThemeTypings['breakpoints'] | string, T>
>

export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>

export type Length = string | 0 | number

export type Union<T> = T | (string & {})

export type Token<
    CSSType,
    ThemeKey = unknown
> = ThemeKey extends keyof ThemeTypings
    ? ResponsiveValue<CSSType | ThemeTypings[ThemeKey]>
    : ResponsiveArray<CSSType>

export type CSSMap = Record<
    string,
    { value: string; var: string; varRef: string; }
>

export type Transform = (
    value: any,
    theme: CSSTheme,
    styles?: Record<string, any>
) => any

export type WithCSSVar<T> = T & {
    __cssVars: Record<string, any>,
    __cssMap: CSSMap,
    __breakpoints: AnalyzeBreakpointsReturn
}

export type CSSTheme = WithCSSVar<{
    breakpoints: Record<string, any>
    direction?: 'ltr' | 'rtl'
    [key: string]: any
}>