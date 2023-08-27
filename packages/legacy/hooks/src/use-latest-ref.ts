import { useRef } from 'react'

export function useLatestRef<T>(value: T) {
    const ref = useRef<T | null>(null)
    ref.current = value

    return ref as React.MutableRefObject<T>
}