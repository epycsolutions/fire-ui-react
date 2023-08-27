import {
    PointerEventInfo,
    getPointerEventName,
    wrapPointerEventHandler,
    EventListenerWithPointInfo,
} from '@fire-ui/utils'
import { useCallback, useEffect, useRef } from 'react'

interface EventListeners {
    add<K extends keyof DocumentEventMap>(
        element: EventTarget,
        type: K,
        listener: (event: DocumentEventMap[K], info: PointerEventInfo) => any,
        options?: boolean | AddEventListenerOptions,
    ): void
    add(
        element: EventTarget,
        type: string,
        listener: EventListenerWithPointInfo,
        options?: boolean | AddEventListenerOptions,
    ): void
    remove<K extends keyof DocumentEventMap>(
        element: EventTarget,
        type: K,
        listener: (event: DocumentEventMap[K], info: PointerEventInfo) => any,
        options?: boolean | EventListenerOptions,
    ): void
    remove(
        element: EventTarget,
        type: string,
        listener: EventListenerWithPointInfo,
        options?: boolean | EventListenerOptions,
    ): void
}

export function useEventListenerMap(): EventListeners {
    const listeners = useRef(new Map())
    const currentListeners = listeners.current

    const add = useCallback(
        (element: any, type: any, listener: any, options: any) => {
            const pointerEventListener = wrapPointerEventHandler(
                listener,
                type === 'pointerdown',
            )

            listeners.current.set(listener, {
                __listener: pointerEventListener,
                type: getPointerEventName(type),
                element,
                options,
            })

            element.addEventListener(type, pointerEventListener, options)
        },
        [],
    )

    const remove = useCallback(
        (element: any, type: any, listener: any, options: any) => {
            const { __listener: pointerEventListener } =
                listeners.current.get(listener)

            element.removeEventListener(type, pointerEventListener, options)
            listeners.current.delete(pointerEventListener)
        },
        [],
    )

    useEffect(
        () => () => {
            currentListeners.forEach((value, key) => {
                remove(value.element, value.type, key, value.options)
            })
        },
        [remove, currentListeners],
    )

    return { add, remove }
}
