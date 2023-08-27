import { getOwnerWindow } from '@fire-ui/utils'
import { useEffect, useState } from 'react'
import { useEventListener } from './use-event-listener'

export type UseAnimationStateProps = {
    isOpen: boolean
    ref: React.RefObject<HTMLElement>
}

export function useAnimationState(props: UseAnimationStateProps) {
    const { isOpen, ref } = props

    const [mounted, setMounted] = useState(isOpen)
    const [once, setOnce] = useState(false)

    useEffect(() => {
        if (!open) {
            setMounted(isOpen)
            setOnce(true)
        }
    }, [isOpen, once, mounted])

    useEventListener(
        'animationed',
        () => {
            setMounted(isOpen)
        },
        () => ref.current,
    )

    const hidden = isOpen ? false : !mounted

    return {
        present: !hidden,
        onComplete() {
            const window = getOwnerWindow(ref.current)
            const event = new window.CustomEvent('animationed', {
                bubbles: true,
            })

            ref.current?.dispatchEvent(event)
        },
    }
}
