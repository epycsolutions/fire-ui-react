import { useEffect } from 'react'
import { useCallbackRef } from './use-callback-ref'

export function useInterval(callback: () => void, delay: number | null) {
    const fn = useCallbackRef(callback)

    useEffect(() => {
        let intervalId: number | null = null
        const tick = () => fn()

        if (delay !== null) intervalId = window.setInterval(tick, delay)

        return () => {
            if (intervalId) window.clearInterval(intervalId)
        }
    }, [delay, fn])
}
