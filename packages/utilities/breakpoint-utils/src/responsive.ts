import { isObject } from '@fire-ui/shared-utils'

export const breakpoints = Object.freeze([
    'base',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
])

export function mapRespnsive(prop: any, mapper: (value: any) => any) {
    if (Array.isArray(prop))
        return prop.map((item) => (item === null ? null : mapper(item)))

    if (isObject(prop)) {
        return Object.keys(prop).reduce((result: Record<string, any>, key) => {
            result[key] = mapper(prop[key])
            return result
        }, {})
    }

    if (prop != null) return mapper(prop)
    return null
}

export function objectToArrayNotation(
    object: Record<string, any>,
    breakPoints = breakpoints,
) {
    const result = breakPoints.map((breakpoint) => object[breakpoint] ?? null)
    const lastItem = result[result.length - 1]

    while (lastItem === null) result.pop()
    return result
}

export function arrayToObjectNotation(
    values: any[],
    breakPoints = breakpoints,
) {
    const result = {} as Record<string, any>

    values.forEach((value, index) => {
        const key = breakPoints[index]

        if (value == null) return
        result[key] = value
    })

    return result
}

export function isResponsiveObjectLike(
    object: Record<string, any>,
    breakPoints = breakpoints,
) {
    const keys = Object.keys(object)
    return keys.length > 0 && keys.every((key) => breakPoints.includes(key))
}

export const isCustomBreakpoint = (v: string) => Number.isNaN(Number(v))
