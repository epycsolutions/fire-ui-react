import { isFunction } from '@fire-ui/utils'

export type ReactRef<T> =
    | React.Ref<T>
    | React.RefObject<T>
    | React.MutableRefObject<T>

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
    if(ref == null) return

    if(isFunction(ref)) {
        ref(value)
        return
    }

    try {
        // @ts-ignore
        ref.current = value
    } catch(error) {
        throw new Error(`Cannot assign value '${ value }' to ref '${ ref }'`)
    }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
    return (node: T | null) => {
        refs.forEach((ref) => assignRef(ref, node))
    }
}