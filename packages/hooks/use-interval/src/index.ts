import { useEffect } from 'react'
import { useCallbackRef } from '@fire-ui/react-use-callback-ref'

/**
 * React Hook that provides a declarative `setInterval`
 * 
 * @param callback The callback to execute at interval
 * @param delay The `setInterval` delay (in ms)
 */
export function setInterval(callback: () => void, delay: number | null) {
    const fn = useCallbackRef(callback)

    useEffect(() => {
        let intervalId: number | null = null

        const tick = () => fn()

        if(delay !== null) intervalId = window.setInterval(tick, delay)

        return () => {
            if(intervalId) window.clearInterval(intervalId)
        }
    }, [ delay, fn ])
}