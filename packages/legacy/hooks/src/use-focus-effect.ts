import { hasFocusWithin, focus } from '@fire-ui/utils'
import { useUpdateEffect } from './use-update-effect'

export type UseFocusEffectOptions = {
    shouldFocus: boolean,
    preventScroll?: boolean
}

export function useFocusEffect<T extends HTMLElement>(
    ref: React.RefObject<T>,
    options: UseFocusEffectOptions
) {
    const { shouldFocus, preventScroll } = options

    useUpdateEffect(() => {
        const node = ref.current

        if(!node || !shouldFocus) return

        if(!hasFocusWithin(node)) {
            focus(node, { preventScroll, nextTick: true })
        }
    }, [shouldFocus, ref, preventScroll])
}