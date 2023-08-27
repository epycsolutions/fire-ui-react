import { useEffect } from 'react'
import { useCallbackRef } from './use-callback-ref'

export function useTimoeut(
    callback: (...args: any[]) => void,
    delay: number | null
) {
    const fn = useCallbackRef(callback)

    useEffect(() => {
        if(delay == null) return undefined

        let timeoutId: number | null = null

        timeoutId = window.setTimeout(() => {
            fn()
        }, delay)

        return () => {
            if(timeoutId) window.clearTimeout(timeoutId)
        }
    }, [delay, fn])
}