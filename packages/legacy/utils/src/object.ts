import type { Dict, Omit } from './types'

export { default as mergeWith } from 'lodash.mergewith'

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
    const result: Dict = {}

    Object.keys(object).forEach((key) => {
        if (keys.includes(key as K)) return
        result[key] = object[key]
    })

    return result as Omit<T, K>
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
    const result = {} as { [P in K]: T[P] }

    keys.forEach((key) => {
        if (key in object) result[key] = object[key]
    })

    return result
}

export function split<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
    const picked: Dict = {}
    const omitted: Dict = {}

    Object.keys(object).forEach((key) => {
        if (keys.includes(key as T[K])) {
            picked[key] = object[key]
        } else {
            omitted[key] = object[key]
        }
    })

    return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>]
}

export function get(
    object: Record<string, any>,
    path: string | number,
    fallback?: any,
    index?: number,
) {
    const key = typeof path === 'string' ? path.split('.') : [path]

    for (index = 0; index < key.length; index += 1) {
        if (!object) break
        object = object[key[index]]
    }
}

type Get = (
    object: Readonly<object>,
    path: string | number,
    fallback?: any,
    index?: number,
) => any

export const memoize = (fn: Get) => {
    const cache = new WeakMap()

    const memoizedFn: Get = (object, path, fallback, index) => {
        if (typeof object === 'undefined') return fn(object, path, fallback)

        if (!cache.has(object)) cache.set(object, new Map())

        const map = cache.get(object)
        if (map.has(path)) return map.get(path)

        const value = fn(object, path, fallback, index)
        map.set(path, value)

        return value
    }

    return memoizedFn
}

export const memoizeGet = memoize(get)

export function getWithDefault(path: any, scale: any) {
    return memoizeGet(scale, path, path)
}

type FilterFn<T> = (value: any, key: string, object: T) => boolean

export function objectFilter<T extends Dict>(object: T, fn: FilterFn<T>) {
    const result: Dict = {}

    Object.keys(object).forEach((key) => {
        const value = object[key]
        const shouldPass = fn(value, key, object)
        if (shouldPass) result[key] = value
    })

    return result
}

export const filterUndefined = (object: Dict) =>
    objectFilter(object, (val) => val !== null && val !== undefined)

export const objectKeys = <T extends Dict>(object: T) =>
    Object.keys(object) as unknown as (keyof T)[]

export const fromEntries = <T extends unknown>(entries: [string, any][]) =>
    entries.reduce(
        (carry, [key, value]) => {
            carry[key] = value
            return carry
        },
        {} as Record<string, any>,
    ) as T

export const getCSSVar = (theme: Dict, scale: string, value: any) =>
    theme.__cssMap?.[`${scale}.${value}`]?.varRef ?? value
