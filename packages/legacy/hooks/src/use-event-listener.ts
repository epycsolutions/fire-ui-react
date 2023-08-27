import { runIfFn } from '@fire-ui/utils'
import { useEffect } from 'react'
import { useCallbackRef } from './use-callback-ref'

type DocumentOrElement = Document | HTMLElement | null

export type EventListenerEnv = (() => DocumentOrElement) | DocumentOrElement

export function useEventListener<K extends keyof DocumentEventMap>(
    event: K | (string & {}),
    handler?: (event: DocumentEventMap[K]) => void,
    env?: EventListenerEnv,
    options?: boolean | AddEventListenerOptions,
) {
    const listener = useCallbackRef(handler) as EventListener

    useEffect(() => {
        const node = runIfFn(env) ?? document

        if(!handler) return

        node.addEventListener(event, listener, options)
        return () => {
            node.removeEventListener(event, listener, options)
        }
    }, [event, env, options, listener, handler])

    return () => {
        const node = runIfFn(env) ?? document
        node.removeEventListener(event, listener, options)
    }
}