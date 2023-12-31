import { getOwnerDocument } from './dom'
import { warn } from './function'
import { FocusableElement, isActiveElement, isInputElement } from './tabbable'

export interface ExtendedFocusOptions extends FocusOptions {
    isActive?: typeof isActiveElement
    nextTick?: boolean
    selectTextIfInput?: boolean
}

export function focus(
    element: FocusableElement | null,
    options: ExtendedFocusOptions = {},
) {
    const {
        isActive = isActiveElement,
        nextTick,
        preventScroll = true,
        selectTextIfInput = true,
    } = options

    if (!element || isActive(element)) return -1

    function triggerFocus() {
        if (!element) {
            warn({
                condition: true,
                message:
                    "[fire-ui]: cant't call focus() on `null` or `undefined` element",
            })

            return
        }

        if (supportsPreventScroll()) {
            element.focus({ preventScroll })
        } else {
            element.focus()

            if (preventScroll) {
                const scrollableElements = getScrollableElements(
                    element as HTMLElement,
                )
                restoreScrollPosition(scrollableElements)
            }
        }

        if (selectTextIfInput) {
            if (isInputElement(element)) {
                element.select()
            } else if ('setSelectionRange' in element) {
                const el = element as HTMLInputElement | HTMLTextAreaElement
                el.setSelectionRange(el.value.length, el.value.length)
            }
        }
    }

    if (nextTick) return requestAnimationFrame(triggerFocus)

    triggerFocus()
    return -1
}

let supportsPreventScrollCached: boolean | null = null

function supportsPreventScroll() {
    if (supportsPreventScrollCached == null) {
        supportsPreventScrollCached = false

        try {
            const div = document.createElement('div')
            div.focus({
                get preventScroll() {
                    supportsPreventScrollCached = true
                    return true
                },
            })
        } catch (e) {}
    }

    return supportsPreventScrollCached
}

interface ScrollableElement {
    element: HTMLElement
    scrollTop: number
    scrollLeft: number
}

function getScrollableElements(element: HTMLElement): ScrollableElement[] {
    const doc = getOwnerDocument(element)
    const win = doc.defaultView ?? window
    let parent = element.parentNode

    const scrollableElements: ScrollableElement[] = []
    const rootScrollingElement = doc.scrollingElement || doc.documentElement

    while (
        parent instanceof win.HTMLElement &&
        parent !== rootScrollingElement
    ) {
        if (
            parent.offsetHeight < parent.scrollHeight ||
            parent.offsetWidth < parent.scrollWidth
        ) {
            scrollableElements.push({
                element: parent,
                scrollTop: parent.scrollTop,
                scrollLeft: parent.scrollLeft,
            })
        }

        parent = parent.parentNode
    }

    if (rootScrollingElement instanceof win.HTMLElement) {
        scrollableElements.push({
            element: rootScrollingElement,
            scrollTop: rootScrollingElement.scrollTop,
            scrollLeft: rootScrollingElement.scrollLeft,
        })
    }

    return scrollableElements
}

function restoreScrollPosition(scrollableElements: ScrollableElement[]) {
    for (const { element, scrollTop, scrollLeft } of scrollableElements) {
        element.scrollTop = scrollTop
        element.scrollLeft = scrollLeft
    }
}
