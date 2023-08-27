import { useEffect, useRef, useState } from 'react'

function isPrintableCharacter(event: React.KeyboardEvent) {
    const { key } = event
    return key.length === 1 || (key.length > 1 && /[^a-zA-Z0-9]/.test(key))
}

export interface UseShortcutProps {
    timeout?: number
    preventDefault?: (event: React.KeyboardEvent) => boolean
}

export function useShortcut(props: UseShortcutProps = {}) {
    const { timeout = 300, preventDefault = () => true } = props

    const [keys, setKeys] = useState<string[]>([])
    const timeoutRef = useRef<any>()

    const flush = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    const clearKeysAfterDelay = () => {
        flush()

        timeoutRef.current = setTimeout(() => {
            setKeys([])
            timeoutRef.current = null
        }, timeout)
    }

    useEffect(() => flush, [])

    type Callback = (keysSoFar: string) => void

    function onKeyDown(fn: Callback) {
        return (event: React.KeyboardEvent) => {
            if (event.key === 'Backspace') {
                const keysCopy = [...keys]
                keysCopy.pop()
                setKeys(keysCopy)

                return
            }

            if (isPrintableCharacter(event)) {
                const keysCopy = keys.concat(event.key)

                if (preventDefault(event)) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                setKeys(keysCopy)
                fn(keysCopy.join(''))

                clearKeysAfterDelay()
            }
        }
    }

    return onKeyDown
}
