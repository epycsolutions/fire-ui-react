import {
    contains,
    detectBrowser,
    focus,
    getOwnerDocument,
    isActiveElement,
    isRefObject
} from '@fire-ui/utils'
import { usePointerEvent } from './use-pointer-event'

export interface UseFocusOnMouseProps {
    enabled?: boolean,
    ref: React.RefObject<HTMLElement>
    elements?: Array<React.RefObject<HTMLElement> | HTMLElement | null>
}

export function useFocusOnPointerDown(props: UseFocusOnMouseProps) {
    const { ref, elements, enabled } = props

    const isSafari = detectBrowser('Safari')
    const doc = () => getOwnerDocument(ref.current)

    usePointerEvent(doc, 'pointerdown', (event) => {
        if(!isSafari || !enabled) return
        const target = event.target as HTMLElement

        const els = elements ?? [ref]
        const isValidTarget = els.some((elementOrRef) => {
            const element = isRefObject(elementOrRef) ? elementOrRef.current : elementOrRef
            return contains(element, target)
        })

        if(!isActiveElement(target) && isValidTarget) {
            event.preventDefault()
            focus(target)
        }
    })
}