import { isFocusable, isTabbable } from './tabbable'

const focusableElementList = [
    'input:not(:disabled):not([disabled])',
    'select:not(:disabled):not([disabled])',
    'textarea:not(:disabled):not([disabled])',
    'embed',
    'iframe',
    'object',
    'a[href]',
    'area[href]',
    'button:not(:disabled):not([disabled])',
    '[tabIndex]',
    'audio[controls]',
    'video[controls]',
    '*[tabIndex]:not([aria-disabled])',
    '*[contenteditable]'
]

const focusableElementSelector = focusableElementList.join()

const isVisible = (element: HTMLElement) => element.offsetWidth > 0 && element.offsetHeight > 0

export function getAllFocusable<T extends HTMLElement>(container: T): T[] {
    const focusableElements: T[] = Array.from(
        container.querySelectorAll<T>(focusableElementSelector)
    )

    focusableElements.unshift(container)
    return focusableElements.filter((element) => isFocusable(element) && isVisible(element))
}

export function getFirstFocusable<T extends HTMLElement>(container: T) {
    const allFocusable = getAllFocusable(container)
    return allFocusable.length ? allFocusable[0] : null
}

export function getAllTabbable<T extends HTMLElement>(
    container: T, fallbackToFocusable?: boolean
): T[] {
    const allFocusable = Array.from(
        container.querySelectorAll<T>(focusableElementSelector)
    )
    const allTabbable = allFocusable.filter(isTabbable)

    if(isTabbable(container)) allTabbable.unshift(container)

    if(!allTabbable.length && fallbackToFocusable) return allFocusable

    return allTabbable
}

export function getFirstTabbableIn<T extends HTMLElement>(
    container: T, fallbackToFocusable?: boolean
): T | null {
    const [ first ] = getAllTabbable(container, fallbackToFocusable)
    return first || null
}

export function getLastTabbableIn<T extends HTMLElement>(
    container: T, fallbackToFocusable?: boolean
): T | null {
    const allTabbable = getAllTabbable(container, fallbackToFocusable)
    return allTabbable[allTabbable.length - 1] || null
}

export function getNextTabbable<T extends HTMLElement>(
    container: T, fallbackToFocusable?: boolean
): T | null {
    const allFocusable = getAllFocusable(container)

    const index = allFocusable.indexOf(document.activeElement as T)
    const slice = allFocusable.slice(index + 1)

    return (
        slice.find(isTabbable) ||
        allFocusable.find(isTabbable) ||
        (fallbackToFocusable ? slice[0] : null)
    )
}

export function getPreviousTabbable<T extends HTMLElement>(
    container: T, fallbackToFocusable?: boolean
): T | null {
    const allFocusable = getAllFocusable(container).reverse()

    const index = allFocusable.indexOf(document.activeElement as T)
    const slice = allFocusable.slice(index + 1)

    return (
        slice.find(isTabbable) ||
        allFocusable.find(isTabbable) ||
        (fallbackToFocusable ? slice[0] : null)
    )
}

export * from './tabbable'
export * from './dom'
export * from './scroll'