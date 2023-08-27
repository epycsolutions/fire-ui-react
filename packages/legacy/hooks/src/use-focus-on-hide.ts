import {
    contains,
    focus,
    FocusableElement,
    getActiveElement,
    isTabbable
} from '@fire-ui/utils'
import { RefObject } from 'react'
import { useUpdateEffect } from './use-update-effect'

export interface UseFocusOnHideOptions {
    focusRef: RefObject<FocusableElement>
    shouldFocus?: boolean
    visible?: boolean
}

function preventReturnFocus(containerRef: RefObject<HTMLElement>) {
    const element = containerRef.current
    if(!element) return false

    const activeElement = getActiveElement(element)
    if(!activeElement) return false
    if(contains(element, activeElement)) return false
    if(isTabbable(activeElement)) return true
    
    return false
}

export function useFocusOnHide(
    containerRef: RefObject<HTMLElement>,
    options: UseFocusOnHideOptions,
) {
    const { shouldFocus: shouldFocusProp, visible, focusRef } = options
    const shouldFocus = shouldFocusProp && !visible

    useUpdateEffect(() => {
        if(!shouldFocus) return
        if(preventReturnFocus(containerRef)) return

        const element = focusRef?.current || containerRef.current
        if(element) focus(element, { nextTick: true })
    }, [shouldFocus, containerRef, focusRef])
}