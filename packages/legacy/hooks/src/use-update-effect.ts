import { useEffect, useRef } from 'react'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const renderCycleRef = useRef(false)
    const effectCyckeRef = useRef(false)

    useEffect(() => {
        const isMounted = renderCycleRef.current
        const shouldRun = isMounted && effectCyckeRef.current

        if (shouldRun) return effect()
        effectCyckeRef.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    useEffect(() => {
        renderCycleRef.current = true

        return () => {
            renderCycleRef.current = false
        }
    }, [])
}
