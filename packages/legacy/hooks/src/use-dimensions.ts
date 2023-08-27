import { getBox, BoxModel } from '@fire-ui/utils'
import { useRef, useState } from 'react'
import { useSafeLayoutEffect } from './use-safe-layout-effect'

export function useDimensions(
    ref: React.RefObject<HTMLElement>,
    observe?: boolean,
) {
    const [dimensions, setDimensions] = useState<BoxModel | null>(null)
    const rafId = useRef<number>()

    useSafeLayoutEffect(() => {
        function measure() {
            const node = ref.current
            if (!node) return

            rafId.current = requestAnimationFrame(() => {
                const boxModel = getBox(node)
                setDimensions(boxModel)
            })
        }

        measure()

        if (observe) {
            window.addEventListener('resize', measure)
            window.addEventListener('scroll', measure)
        }

        return () => {
            if (observe) {
                window.removeEventListener('resize', measure)
                window.removeEventListener('scroll', measure)
            }

            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [observe])

    return dimensions
}
