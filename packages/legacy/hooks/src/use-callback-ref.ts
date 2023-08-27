import { useCallback, useRef } from 'react'
import { useSafeLayoutEffect } from './use-safe-layout-effect'

export function useCallbackRef<T extends (...args: any[]) => any>(
    fn: T | undefined,
    deps: React.DependencyList = [],
): T {
    const ref = useRef(fn)

    useSafeLayoutEffect(() => {
        ref.current = fn
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(((...args) => ref.current?.(...args)) as T, deps)
}
